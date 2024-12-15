from rest_framework import viewsets, mixins, permissions
from ticket_system.models import (
    Category, Notification, Ticket, SubCategory, Review,
    TicketAudit, StatusCode
)
from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404
from .serializers import (
    CustomUserSerializer, TicketSerializer,
    CategorySerializer, NotificationSerializer,
    SubCategorySerializer, ReviewSerializer,
    TicketAuditSerializer, TicketCreateSerializer,
    TicketWithLastCommentSerializer,
    CategoryAdminSerializer, SubcategoryAdminSerializer,
    StatusCodeTextSerializer
)
from rest_framework.response import Response
from rest_framework.decorators import action
from django_filters.rest_framework import DjangoFilterBackend
from .permissions import AdminOrReadOnly, OwnerOrReadOnly, PostOrOwnerOrReadOnly
from users.models import UserManager

User = get_user_model()


class CustomUserViewSet(
    viewsets.GenericViewSet,
    mixins.ListModelMixin,
    mixins.UpdateModelMixin
):
    queryset = User.objects.all()
    serializer_class = CustomUserSerializer
    permission_classes = (OwnerOrReadOnly,)

    @action(detail=False, url_path='me', methods=['GET'])
    def active_user(self, request):
        user = User.objects.filter(id=request.user.id).get()
        serializer = self.serializer_class(user)
        return Response(serializer.data)
    
    @action(detail=True, url_path='tickets', methods=['GET'])
    def tickets(self, request, pk):
        user = User.objects.filter(id=pk).get()
        tickets = Ticket.objects.filter(user=user)
        serializer = TicketSerializer(tickets, many=True)
        return Response(serializer.data)
    

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
        return Notification.objects.filter(user=self.request.user)

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
        return super().get_serializer(*args, **kwargs)

    def get_queryset(self):
        return Ticket.objects.filter(user__id=self. request.user.id)

    def perform_update(self, serializer):
        if not serializer.instance.draft:
            ticket_audit = TicketAuditSerializer(data=serializer.instance.__dict__)
            if ticket_audit.is_valid():
                ticket_audit.save(ticket=serializer.instance, user=self.request.user)
        return super().perform_update(serializer)
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    @action(detail=False, url_path='all', methods=['GET'])
    def all(self, request):
        tickets = self.serializer_class(Ticket.objects.filter(draft=False), many=True)
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

        notification = Notification.objects.create(status_code_changed_on=status_code, user=self.request.user, ticket=ticket)
        notification.save()

        serializer.save(user=self.request.user, ticket=ticket)


class TicketAuditViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = TicketWithLastCommentSerializer

    def get_queryset(self):
        ticket = get_object_or_404(Ticket, pk=self.kwargs['ticket'])
        return TicketAudit.objects.filter(ticket__id=ticket.id)


class ModeratorReviewViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = ReviewSerializer

    def get_queryset(self):
        reviews = Review.objects.filter(user=self.request.user)
        return Response(reviews)

    @action(detail=False, url_path='all', methods=['GET'])
    def all(self, request):
        reviews = Review.objects.all()
        return Response(reviews)
    

class ModeratorCategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategoryAdminSerializer
    permission_classes = (permissions.IsAdminUser,)

class ModeratorSubcategoryViewSet(viewsets.ModelViewSet):
    queryset = SubCategory.objects.all()
    serializer_class = SubcategoryAdminSerializer
    permission_classes = (permissions.IsAdminUser,)


class StatusCodeViewSet(viewsets.GenericViewSet, mixins.ListModelMixin):
    queryset = StatusCode.objects.all()
    serializer_class = StatusCodeTextSerializer