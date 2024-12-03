from rest_framework import viewsets, mixins
from ticket_system.models import (
    Category, Notification, Ticket, SubCategory, Comment
)
from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404
from .serializers import (
    CustomUserSerializer, TicketSerializer,
    CategorySerializer, NotificationSerializer,
    SubCategorySerializer, CommentSerializer
)
from rest_framework.response import Response
from rest_framework.decorators import action

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


class SubCategoryViewSet(viewsets.ModelViewSet):
    queryset = SubCategory.objects.all()
    serializer_class = SubCategorySerializer

    def get_queryset(self):
        category = get_object_or_404(Category, pk=self.kwargs['category'])
        return SubCategory.objects.filter(category__id=category.id)


class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

    def get_queryset(self):
        ticket = get_object_or_404(Ticket, pk=self.kwargs['ticket'])
        return Comment.objects.filter(ticket__id=ticket.id)
