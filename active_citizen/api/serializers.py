from ticket_system.models import (
    Ticket, Category, Notification, SubCategory, Review,
    StatusCode, TicketAudit, Media
)
from users.models import ModeratorSetuped
from django.contrib.auth import get_user_model
from rest_framework import serializers
from djoser.serializers import UserSerializer
from django.shortcuts import get_object_or_404
from django.core.files.base import ContentFile
import base64

class ModeratorBoolSerializer(serializers.Serializer):
    moderator = serializers.BooleanField()


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


class CustomUserSerializer(UserSerializer):
    avatar = Base64ImageField(required=False, allow_null=True)
    avatar_url = serializers.SerializerMethodField(
        'get_avatar_url',
        read_only=True
    )
    user_group = serializers.SerializerMethodField(
        'get_user_group',
        read_only=True
    )
    

    class Meta:
        model = get_user_model()
        fields = ('phone_number', 'id', 'first_name', 'last_name', 'given_name', 'rating', 'avatar', 'avatar_url', 'user_group')


    def get_avatar_url(self, obj):
        if obj.avatar:
            return obj.avatar.url
        return None

    def get_user_group(self, obj):
        if obj.is_superuser:
            return 2
        elif obj.is_staff:
            return 1
        return 0



class ModeratorSetupedSerializer(serializers.ModelSerializer):
    admin = CustomUserSerializer()
    class Meta:
        model = ModeratorSetuped
        fields = ('admin', 'created_at')
        read_only_fields = ('admin',)
        


class CustomUserModeratorSerializer(CustomUserSerializer):
    moderator_info = serializers.SerializerMethodField(
        'get_moderator_info',
        read_only=True
    )

    class Meta:
        model = get_user_model()
        fields = ('phone_number', 'id', 'first_name', 'last_name', 'given_name', 'rating', 'avatar', 'avatar_url', 'user_group', 'moderator_info')

    def get_moderator_info(self, obj):
        moderator_info = ModeratorSetuped.objects.filter(user=obj)
        if moderator_info.count() == 0:
            return None
        serializer = ModeratorSetupedSerializer(moderator_info.last())
        return serializer.data

class TicketNotificationSerializer(serializers.ModelSerializer):
    # url = serializers.SerializerMethodField()

    class Meta:
        model = Ticket
        fields = ('title', 'id')

class MediaSerializer(serializers.ModelSerializer):
    source = Base64ImageField(required=False, allow_null=True)
    source_url = serializers.SerializerMethodField(
        'get_source_url',
        read_only=True
    )

    class Meta:
        model = Media
        fields = ('source', 'source_url', 'id')

    def get_source_url(self, obj):
        if obj.source:
            return obj.source.url
        return None

    
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


class SubCategorySerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    source = Base64ImageField(required=False, allow_null=True)
    source_url = serializers.SerializerMethodField(
        'get_source_url',
        read_only=True
    )

    class Meta:
        model = SubCategory
        fields = ('id', 'title', 'description', 'source', 'source_url', 'category')

    def get_source_url(self, obj):
        if obj.source:
            return obj.source.url
        return None


class TicketAuditSerializer(serializers.ModelSerializer):
    ticket = serializers.PrimaryKeyRelatedField(read_only=True)
    latest_review = serializers.SerializerMethodField()
    reviews_count = serializers.SerializerMethodField()
    media = MediaSerializer(many=True, required=False)
    status_code = StatusCodeTextSerializer(required=False)
    category = CategorySerializer(required=False)
    subcategory = SubCategorySerializer(required=False)


    class Meta:
        model = TicketAudit
        fields = ('title', 'body', 'longtitude', 'latitude', 'time', 'draft', 'latest_review', 'reviews_count', 'user', 'ticket', 'media', 'status_code', 'id', 'created_at', 'category', 'subcategory')
        read_only_fields = ("user", )

    def get_latest_review(self, obj):
        review = Review.objects.filter(created_at__lt=obj.created_at, ticket=obj.ticket).order_by('created_at').last()
        serializer = ReviewSerializer(review)
        return serializer.data
    
    def get_reviews_count(self, obj):
        reviews = Review.objects.filter(created_at__lt=obj.created_at, ticket=obj.ticket).count()
        return reviews
    


class TicketWithLastCommentSerializer(serializers.ModelSerializer):
    media = MediaSerializer(many=True)
    latest_review = serializers.SerializerMethodField()
    reviews_count = serializers.SerializerMethodField()
    user = CustomUserSerializer()
    status_code = StatusCodeTextSerializer()
    category = serializers.StringRelatedField()
    subcategory = serializers.StringRelatedField()


    class Meta:
        model = Ticket
        fields = ('title', 'body', 'longtitude', 'latitude', 'time', 'draft', 'latest_review', 'reviews_count', 'user', 'media', 'status_code', 'created_at', 'id', 'category', 'subcategory')

    def get_latest_review(self, obj):
        reviews = Review.objects.filter(ticket_id=obj.id).order_by('created_at')
        if reviews.count() == 0:
            return None
        review = reviews.last()
        serializer = ReviewSerializer(review)
        return serializer.data
    
    def get_reviews_count(self, obj):
        reviews = Review.objects.filter(ticket_id=obj.id).count()
        return reviews


class TicketCreateSerializer(serializers.ModelSerializer):
    media = MediaSerializer(required=False, many=True)

    class Meta:
        model = Ticket
        fields = ('title', 'body', 'longtitude', 'latitude', 'time', 'draft', 'user', 'media', 'status_code', 'created_at', 'id', 'category', 'subcategory')
        read_only_fields = ("user",)

    def update(self, instance, validated_data):
        if 'media' in self.initial_data:
            medias = self.initial_data.pop('media')
            for media in medias:
                new_media = Media.objects.create(ticket=instance)
                new_media.source.save(media.name, media)
        return super().update(instance, validated_data)

    def create(self, validated_data):
        ticket = Ticket.objects.create(**validated_data)
        if 'media' not in self.initial_data:
            return ticket
        ticket.save()
        medias = self.initial_data.pop('media')
        for media in medias:
            new_media = Media.objects.create(ticket=ticket)
            new_media.source.save(media.name, media)
        return ticket


class SubCategoryPairWithCategorySerializer(serializers.ModelSerializer):
    source = Base64ImageField(required=False, allow_null=True)
    source_url = serializers.SerializerMethodField(
        'get_source_url',
        read_only=True
    )

    class Meta:
        model = SubCategory
        fields = ('id', 'title', 'description', 'source', 'source_url', 'category')

    def get_source_url(self, obj):
        if obj.source:
            return obj.source.url
        return None


class TicketSerializer(serializers.ModelSerializer):
    category = CategorySerializer()
    subcategory = SubCategoryPairWithCategorySerializer()
    status_code = serializers.StringRelatedField()
    latest_review = serializers.SerializerMethodField()
    media = MediaSerializer(many=True)

    class Meta:
        model = Ticket
        fields = ('title', 'body', 'longtitude', 'latitude', 'time', 'draft', 'latest_review', 'user', 'media', 'status_code', 'created_at', 'id', 'category', 'subcategory')
        read_only_fields = ("user", )
    
    def get_latest_review(self, obj):
        review = Review.objects.filter(ticket_id=obj.id).order_by('created_at').last()
        serializer = ReviewSerializer(review)
        return serializer.data


class NotificationSerializer(serializers.ModelSerializer):
    ticket = TicketNotificationSerializer()
    status_code_changed_on = serializers.StringRelatedField()

    class Meta:
        model = Notification
        fields = ('ticket', 'is_read', 'user', 'created_at', 'status_code_changed_on')

    def get_ticket_title(self, obj):
        return obj.ticket.title


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'
        read_only_fields = ('user', 'ticket')


# class SupportTicketSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = SupportTicket
#         fields = '__all__'

class SubcategoryAdminCreateSerializer(serializers.ModelSerializer):
    source = Base64ImageField(required=False, allow_null=True)
    source_url = serializers.SerializerMethodField(
        'get_source_url',
        read_only=True
    )
    created_by = CustomUserSerializer(read_only=True)

    class Meta:
        model = SubCategory
        fields = '__all__'
        read_only_fields = ('created_by',)

    def get_source_url(self, obj):
        if obj.source:
            return obj.source.url
        return None
    

class CategoryAdminSerializer(serializers.ModelSerializer):
    source = Base64ImageField(required=False, allow_null=True)
    source_url = serializers.SerializerMethodField(
        'get_source_url',
        read_only=True
    )
    created_by = CustomUserSerializer(read_only=True)

    class Meta:
        model = Category
        fields = '__all__'
        read_only_fields = ('created_by',)

    def get_source_url(self, obj):
        if obj.source:
            return obj.source.url
        return None


class SubcategoryAdminSerializer(SubcategoryAdminCreateSerializer):
    category = CategoryAdminSerializer()


class SomeMediaToDeleteSerializer(serializers.Serializer):
    medias = serializers.ListField('Список медиа')