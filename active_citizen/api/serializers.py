from ticket_system.models import (
    Ticket, Category, Notification, SubCategory, Review,
    StatusCode, TicketAudit
)
from django.contrib.auth import get_user_model
from rest_framework import serializers
from djoser.serializers import UserSerializer
from django.shortcuts import get_object_or_404



class StatusCodeTextSerializer(serializers.ModelSerializer):
    class Meta:
        model = StatusCode
        fields = ('title',)


class TicketNotificationSerializer(serializers.ModelSerializer):
    # url = serializers.SerializerMethodField()

    class Meta:
        model = Ticket
        fields = ('title', 'id')


class TicketAuditSerializer(serializers.ModelSerializer):
    ticket = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = TicketAudit
        fields = '__all__'
        read_only_fields = ("user", )


class TicketSerializer(serializers.ModelSerializer):
    category = serializers.StringRelatedField()
    subcategory = serializers.StringRelatedField()

    def create(self, validated_data):
        if 'category' in self.initial_data:
            category = get_object_or_404(Category, pk=self.initial_data['category'])
            validated_data['category'] = category
        if 'subcategory' in self.initial_data:
            subcategory = get_object_or_404(SubCategory, pk=self.initial_data['subcategory'])
            validated_data['subcategory'] = subcategory
        ticket = Ticket.objects.create(**validated_data)
        return ticket

    class Meta:
        model = Ticket
        fields = '__all__'
        read_only_fields = ("user", )


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
    category = CategorySerializer(read_only=True)

    class Meta:
        model = SubCategory
        fields = '__all__'


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'


# class SupportTicketSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = SupportTicket
#         fields = '__all__'
