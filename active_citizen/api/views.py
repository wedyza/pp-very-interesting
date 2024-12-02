from rest_framework import viewsets
from ticket_system.models import (
    Category, Notification, Ticket, SubCategory, Comment
)
from django.contrib.auth import get_user_model
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


class NotificationViewSet(viewsets.ModelViewSet):
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer


class TicketViewSet(viewsets.ModelViewSet):
    queryset = Ticket.objects.all()
    serializer_class = TicketSerializer


class SubCategoryViewSet(viewsets.ModelViewSet):
    queryset = SubCategory.objects.all()
    serializer_class = SubCategorySerializer


class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
