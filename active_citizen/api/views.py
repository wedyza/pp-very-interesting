from rest_framework import viewsets, mixins, permissions
from ticket_system.models import (
    Category, Notification, Ticket, SubCategory, Comment,
    TicketAudit
)
from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404
from .serializers import (
    CustomUserSerializer, TicketSerializer,
    CategorySerializer, NotificationSerializer,
    SubCategorySerializer, CommentSerializer,
    TicketAuditSerializer
)
from rest_framework.response import Response
from rest_framework.decorators import action
from django_filters.rest_framework import DjangoFilterBackend
from .permissions import AdminOrReadOnly

User = get_user_model()


class CustomUserViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = User.objects.all()
    serializer_class = CustomUserSerializer

    @action(detail=False, url_path='me', methods=['GET'])
    def active_user(self, request):
        user = User.objects.filter(id=request.user.id).get()
        serializer = self.serializer_class(user)
        return Response(serializer.data)


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = (AdminOrReadOnly,)


class NotificationViewSet(
    viewsets.GenericViewSet,
    mixins.ListModelMixin,
    mixins.UpdateModelMixin
):
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer


class TicketViewSet(viewsets.ModelViewSet):
    queryset = Ticket.objects.all()
    serializer_class = TicketSerializer
    filter_backends = (DjangoFilterBackend, )
    filterset_fields = ('draft',)

    def get_queryset(self):
        return Ticket.objects.filter(user__id=self. request.user.id)
    
    def perform_update(self, serializer):
        print(serializer.instance.title)
        print(serializer.validated_data)
        return super().perform_update(serializer)
    
    def perform_create(self, serializer):
        # print(serializer.data)
        serializer.save(user=self.request.user)

    @action(detail=False, url_path='all', methods=['GET'])
    def all(self, request):
        tickets = self.serializer_class(Ticket.objects.filter(draft=False), many=True)
        return Response(tickets.data)

    # @action(detail=True, url_path='save', methods=['POST'])
    # def save_audit(self, request):
    #     ticket = Ticket.objects.filter(id=self.kwargs['ticket']).get()
    #     serializer = TicketAuditSerializer(data=request.data, ticket=ticket)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data)
    #     return Response(serializer.errors)


class SubCategoryViewSet(viewsets.ModelViewSet):
    queryset = SubCategory.objects.all()
    serializer_class = SubCategorySerializer
    permission_classes = (AdminOrReadOnly,)

    def get_queryset(self):
        category = get_object_or_404(Category, pk=self.kwargs['category'])
        return SubCategory.objects.filter(category__id=category.id)
    
    def perform_create(self, serializer):
        category = get_object_or_404(Category, pk=self.kwargs['category'])
        print(category)
        serializer.save(category=category)


class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

    def get_queryset(self):
        ticket = get_object_or_404(Ticket, pk=self.kwargs['ticket'])
        return Comment.objects.filter(ticket__id=ticket.id)


class TicketAuditViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = TicketAuditSerializer

    def get_queryset(self):
        ticket = get_object_or_404(Ticket, pk=self.kwargs['ticket'])
        return TicketAudit.objects.filter(ticket__id=ticket.id)
