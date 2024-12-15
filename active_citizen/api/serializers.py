from ticket_system.models import (
    Ticket, Category, Notification, SubCategory, Review,
    StatusCode, TicketAudit, Media
)
from django.contrib.auth import get_user_model
from rest_framework import serializers
from djoser.serializers import UserSerializer
from django.shortcuts import get_object_or_404
from django.core.files.base import ContentFile
import base64


class Base64ImageField(serializers.ImageField):
    def to_internal_value(self, data):
        if isinstance(data, str) and data.startswith('data:image'):
            format, imgstr = data.split(';base64,')
            ext = format.split('/')[-1]

            data = ContentFile(base64.b64decode(imgstr), name='temp.' + ext)

        return super().to_internal_value(data)


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
    latest_review = serializers.SerializerMethodField()
    reviews_count = serializers.SerializerMethodField()

    class Meta:
        model = TicketAudit
        fields = ('title', 'body', 'longtitude', 'latitude', 'time', 'draft', 'last_review', 'reviews_count', 'user')
        read_only_fields = ("user", )

    def get_latest_review(self, obj):
        review = Review.objects.filter(ticket_id=obj.id).last()
        serializer = ReviewSerializer(review)
        return serializer.data
    
    def get_reviews_count(self, obj):
        reviews = Review.objects.filter(ticket_id=obj.id).count()
        return reviews
    

class MediaSerializer(serializers.ModelSerializer):
    source = Base64ImageField(required=False, allow_null=True)
    source_url = serializers.SerializerMethodField(
        'get_source_url',
        read_only=True
    )

    class Meta:
        model = Media
        fields = ('source', 'source_url')

    def get_source_url(self, obj):
        if obj.source:
            return obj.image.url
        return None


class TicketWithLastCommentSerializer(serializers.ModelSerializer):
    media = MediaSerializer(many=True)
    latest_review = serializers.SerializerMethodField()
    reviews_count = serializers.SerializerMethodField()

    class Meta:
        model = Ticket
        fields = ('title', 'body', 'longtitude', 'latitude', 'time', 'draft', 'latest_review', 'reviews_count', 'user', 'media')

    def get_latest_review(self, obj):
        review = Review.objects.filter(ticket_id=obj.id).last()
        serializer = ReviewSerializer(review)
        return serializer.data
    
    def get_reviews_count(self, obj):
        reviews = Review.objects.filter(ticket_id=obj.id).count()
        return reviews


class TicketCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ticket
        fields = '__all__'
        read_only_fields = ("user", )


class TicketSerializer(serializers.ModelSerializer):
    category = serializers.StringRelatedField()
    subcategory = serializers.StringRelatedField()

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

    def create(self, validated_data):
        return super().create(validated_data)

    def get_ticket_title(self, obj):
        return obj.ticket.title


class CategorySerializer(serializers.ModelSerializer):
    source = Base64ImageField(required=False, allow_null=True)
    source_url = serializers.SerializerMethodField(
        'get_source_url',
        read_only=True
    )

    class Meta:
        model = Category
        fields = ('id', 'title', 'description', 'source', 'source_url')

    def get_source_url(self, obj):
        if obj.source:
            return obj.source.url
        return None
    

class CustomUserSerializer(UserSerializer):
    avatar = Base64ImageField(required=False, allow_null=True)
    avatar_url = serializers.SerializerMethodField(
        'get_avatar_url',
        read_only=True
    )

    class Meta:
        model = get_user_model()
        fields = ('phone_number', 'id', 'first_name', 'last_name', 'given_name', 'rating', 'avatar', 'avatar_url')

    def get_avatar_url(self, obj):
        if obj.avatar:
            return obj.avatar.url
        return None


class SubCategorySerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    source = Base64ImageField(required=False, allow_null=True)
    source_url = serializers.SerializerMethodField(
        'get_source_url',
        read_only=True
    )

    class Meta:
        model = SubCategory
        fields = '__all__'

    def get_source_url(self, obj):
        if obj.source:
            return obj.source.url
        return None


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'
        read_only_fields = ('user', 'ticket')


# class SupportTicketSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = SupportTicket
#         fields = '__all__'

class SubcategoryAdminSerializer(serializers.ModelSerializer):
    created_by = CustomUserSerializer()
    category = CategorySerializer()
    source = Base64ImageField(required=False, allow_null=True)
    source_url = serializers.SerializerMethodField(
        'get_source_url',
        read_only=True
    )

    class Meta:
        model = SubCategory
        fields = '__all__'
        read_only_fields = ('created_by',)

    def get_source_url(self, obj):
        if obj.source:
            return obj.source.url
        return None


class CategoryAdminSerializer(serializers.ModelSerializer):
    created_by = CustomUserSerializer()
    source = Base64ImageField(required=False, allow_null=True)
    source_url = serializers.SerializerMethodField(
        'get_source_url',
        read_only=True
    )

    class Meta:
        model = Category
        fields = '__all__'
        read_only_fields = ('created_by',)

    def get_source_url(self, obj):
        if obj.source:
            return obj.source.url
        return None