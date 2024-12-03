from ticket_system.models import (
    Ticket, Category, Notification, SubCategory, Comment,
    StatusCode
)
from django.contrib.auth import get_user_model
from rest_framework import serializers
from djoser.serializers import UserSerializer
from django.urls import reverse_lazy


class StatusCodeTextSerializer(serializers.ModelSerializer):
    class Meta:
        model = StatusCode
        fields = ('title',)


class TicketNotificationSerializer(serializers.ModelSerializer):
    # url = serializers.SerializerMethodField()

    class Meta:
        model = Ticket
        fields = ('title', 'id')

    # def get_url(self, obj):
    #     return reverse_lazy('ticket-detail', kwargs={'pk': obj.pk})


class TicketSerializer(serializers.ModelSerializer):
    category = serializers.StringRelatedField()
    subcategory = serializers.StringRelatedField()

    class Meta:
        model = Ticket
        fields = '__all__'


class NotificationSerializer(serializers.ModelSerializer):
    ticket = TicketNotificationSerializer()
    status_code_changed_on = serializers.StringRelatedField()

    class Meta:
        model = Notification
        fields = ('ticket', 'is_read', 'user', 'created_at', 'status_code_changed_on')

    def get_ticket_title(self, obj):
        return obj.ticket.title


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('id', 'title', 'description')


class CustomUserSerializer(UserSerializer):
    # tickets = TicketSerializer(many=True, required=False)

    class Meta:
        model = get_user_model()
        fields = ('phone_number', 'id', 'first_name', 'last_name', 'given_name', 'rating', 'avatar')


class SubCategorySerializer(serializers.ModelSerializer):
    category = CategorySerializer()

    class Meta:
        model = SubCategory
        fields = '__all__'


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'


# class SupportTicketSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = SupportTicket
#         fields = '__all__'
