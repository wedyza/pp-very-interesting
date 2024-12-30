from rest_framework import viewsets, mixins, permissions
from ticket_system.models import (
    Category, Notification, Ticket, SubCategory, Review,
    TicketAudit, StatusCode
)
from users.models import ModeratorSetuped
from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404
from .serializers import (
    CustomUserSerializer, TicketSerializer,
    CategorySerializer, NotificationSerializer,
    SubCategorySerializer, ReviewSerializer,
    TicketAuditSerializer, TicketCreateSerializer,
    TicketWithLastCommentSerializer,
    CategoryAdminSerializer, SubcategoryAdminSerializer,
    StatusCodeTextSerializer, ModeratorBoolSerializer,
    SubcategoryAdminCreateSerializer, ModeratorSetupedSerializer,
    CustomUserModeratorSerializer
)
from rest_framework.response import Response
from rest_framework.decorators import action
from django_filters.rest_framework import DjangoFilterBackend
from .permissions import AdminOrReadOnly, OwnerOrReadOnly, PostOrOwnerOrReadOnly, ModeratorOrAdmin
from users.models import UserManager
from django.core.exceptions import ValidationError

User = get_user_model()


class CustomUserViewSet(
    viewsets.GenericViewSet,
    mixins.ListModelMixin,
    mixins.UpdateModelMixin
):
    queryset = User.objects.all()
    permission_classes = (OwnerOrReadOnly,)
    serializer_class = CustomUserSerializer


    def get_serializer_class(self):
        if self.action == 'moderator_manage':
            return ModeratorBoolSerializer
        return super().get_serializer_class()

    @action(detail=False, url_path='me', methods=['GET', 'PATCH'], permission_classes=(permissions.IsAuthenticated,))
    def active_user(self, request, *args, **kwargs):
        if self.request.method == 'GET':
            serializer = self.serializer_class(request.user)
            return Response(serializer.data)
        if self.request.method == 'PATCH':
            serializer = self.serializer_class(request.user, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors)
        
    @action(detail=False, url_path='moderators', methods=['GET'], permission_classes=(permissions.IsAdminUser,))
    def moderators(self, request, *args, **kwargs):
        users = User.objects.filter(is_staff=True)
        serializer = CustomUserModeratorSerializer(users, many=True)
        return Response(serializer.data)


    @action(detail=True, url_path='tickets', methods=['GET'])
    def tickets(self, request, pk):
        user = User.objects.filter(id=pk).get()
        tickets = Ticket.objects.filter(user_id=user)
        serializer = TicketSerializer(tickets, many=True)
        return Response(serializer.data)
    

    @action(detail=True, url_path='moderator_manage', methods=['POST'], permission_classes=(permissions.IsAdminUser ,))
    def moderator_manage(self, request, pk):
        if not 'moderator' in request.data or request.data['moderator'] != 0 and request.data['moderator'] != 1:
            raise ValidationError("Поле moderator предоставлено не в формате True/False!")
        user = User.objects.filter(id=pk).get()
        user.is_staff = request.data['moderator']
        user.save()
        user_serializer = CustomUserSerializer(user)
        if user.is_staff:
            moderator_info_serializer = ModeratorSetuped(user=user, admin=request.user)
            moderator_info_serializer.save()
        else:
            moderator_info = ModeratorSetuped.objects.filter(user=user).first()
            moderator_info.delete()
        return Response(user_serializer.data)

    

class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = (AdminOrReadOnly,)


class NotificationViewSet(
    viewsets.GenericViewSet,
    mixins.ListModelMixin,
    mixins.UpdateModelMixin
):
    serializer_class = NotificationSerializer

    def get_queryset(self):
        return Notification.objects.filter(user_id=self.request.user.id)

class TicketViewSet(viewsets.ModelViewSet):
    queryset = Ticket.objects.all()
    serializer_class = TicketSerializer
    filter_backends = (DjangoFilterBackend, )
    filterset_fields = ('draft',)

    def get_serializer(self, *args, **kwargs):
        if self.action == 'create' or self.action == 'update' or self.action == 'partial_update':
            return TicketCreateSerializer(*args, **kwargs)
        elif self.action == 'all':
            return TicketWithLastCommentSerializer(*args, **kwargs)
        return TicketSerializer(*args, **kwargs)

    def get_queryset(self):
        if self.action == 'list':
            return Ticket.objects.filter(user_id=self.request.user.id)
        return Ticket.objects.all()

    def perform_update(self, serializer):
        if not serializer.instance.draft:
            ticket_audit = TicketAuditSerializer(data=serializer.instance.__dict__)
            if ticket_audit.is_valid():
                ticket_audit.save(ticket=serializer.instance, user_id=self.request.user.id, category=serializer.instance.category, subcategory=serializer.instance.subcategory)
        if serializer.is_valid():
            if serializer.instance.status_code.id == 2 or serializer.instance.status_code.id == 4:
                return serializer.save(status_code_id=1)
            else:
                return serializer.save()
    
    def perform_create(self, serializer):
        serializer.save(user_id=self.request.user.id)

    @action(detail=False, url_path='all', methods=['GET'])
    def all(self, request):
        tickets = self.get_serializer(Ticket.objects.filter(draft=False), many=True)
        return Response(tickets.data)
    
    # @action(detail=True, url_path='last_review', methods=['GET'])
    # def last_review(self, request, pk):
    #     reviews = Review.objects.filter(ticket_id=pk).last()
    #     serializer = ReviewSerializer(reviews)
    #     return Response(serializer.data)


class SubCategoryViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = SubCategorySerializer
    permission_classes = (AdminOrReadOnly,)

    def get_queryset(self):
        category = get_object_or_404(Category, pk=self.kwargs['category'])
        return SubCategory.objects.filter(category__id=category.id)


class ReviewViewSet(viewsets.ModelViewSet):
    serializer_class = ReviewSerializer

    def get_queryset(self):
        ticket = get_object_or_404(Ticket, pk=self.kwargs['ticket'])
        return Review.objects.filter(ticket__id=ticket.id)
    
    def perform_create(self, serializer):
        ticket = get_object_or_404(Ticket, pk=self.kwargs['ticket'])
        status_code = StatusCode.objects.filter(title=serializer.validated_data['status_code_changed_on']).first()
        ticket.status_code = status_code
        ticket.save()

        notification = Notification.objects.create(status_code_changed_on=status_code, user_id=ticket.user.id, ticket=ticket)
        notification.save()

        serializer.save(user_id=self.request.user.id, ticket=ticket)


class TicketAuditViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = TicketWithLastCommentSerializer

    def get_queryset(self):
        ticket = get_object_or_404(Ticket, pk=self.kwargs['ticket'])
        return TicketAudit.objects.filter(ticket__id=ticket.id)


class ModeratorReviewViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = ReviewSerializer

    def get_queryset(self):
        reviews = Review.objects.filter(user_id=self.request.user)
        return Response(reviews)

    @action(detail=False, url_path='all', methods=['GET'])
    def all(self, request):
        reviews = Review.objects.all()
        return Response(reviews)
    

class ModeratorCategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategoryAdminSerializer
    permission_classes = (ModeratorOrAdmin,)

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

class ModeratorSubcategoryViewSet(viewsets.ModelViewSet):
    queryset = SubCategory.objects.all()
    serializer_class = SubcategoryAdminSerializer
    permission_classes = (ModeratorOrAdmin,)

    def get_serializer(self, *args, **kwargs):
        if self.action == 'create':
            return SubcategoryAdminCreateSerializer(*args, **kwargs)
        return super().get_serializer(*args, **kwargs)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(created_by=request.user)
        return Response(serializer.data)

    # def perform_create(self, serializer):
    #     serializer.save(created_by=self.request.user)


class StatusCodeViewSet(viewsets.GenericViewSet, mixins.ListModelMixin):
    queryset = StatusCode.objects.all()
    serializer_class = StatusCodeTextSerializer