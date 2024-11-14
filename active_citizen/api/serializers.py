from ticket_system.models import Ticket, Category, Notification
from django.contrib.auth import get_user_model
from rest_framework import serializers
from djoser.serializers import UserSerializer

class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = '__all__'


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('text',)


class TicketSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ticket
        fields = '__all__'


class CustomUserSerializer(UserSerializer):
    tickets = TicketSerializer(many=True, required=False)

    class Meta:
        model = get_user_model()
        fields = ('phone_number', 'id', 'first_name', 'last_name', 'rating', 'avatar')