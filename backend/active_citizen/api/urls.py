"""active_citizen URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from django.conf.urls import url
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from api.views import (
    CategoryViewSet, TicketViewSet, ReviewViewSet,
    CustomUserViewSet, NotificationViewSet, SubCategoryViewSet,
    TicketAuditViewSet, ModeratorReviewViewSet,
    ModeratorCategoryViewSet, ModeratorSubcategoryViewSet,
    StatusCodeViewSet
)
from django.conf import settings
from django.conf.urls.static import static

router = routers.DefaultRouter()

router.register('categories', CategoryViewSet)
router.register('users', CustomUserViewSet)
router.register('tickets', TicketViewSet)
router.register('notifications', NotificationViewSet, basename='notifications')
router.register(
    r'categories/(?P<category>\d+)/subcategories',
    SubCategoryViewSet,
    basename='subcategories'
)
router.register(
    r'tickets/(?P<ticket>\d+)/reviews',
    ReviewViewSet,
    basename='reviews'
)
router.register(
    r'tickets/(?P<ticket>\d+)/audit',
    TicketAuditViewSet,
    basename='ticket-audit'
)
router.register(
    'reviews',
    ModeratorReviewViewSet,
    basename='moderator-reviews'
)
router.register(
    'admin_section/categories',
    ModeratorCategoryViewSet
)
router.register(
    'admin_section/subcategories',
    ModeratorSubcategoryViewSet
)
router.register(
    'status_codes',
    StatusCodeViewSet
)


urlpatterns = [
    path('', include(router.urls)),
    path('auth/', include('djoser.urls')),  
    path('auth/', include('djoser.urls.jwt')),
]