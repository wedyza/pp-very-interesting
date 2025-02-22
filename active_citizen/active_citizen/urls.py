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
    'status_codes/',
    StatusCodeViewSet
)


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include(router.urls)),
    path('auth/', include('djoser.urls')),  
    path('auth/', include('djoser.urls.jwt')),
]

schema_view = get_schema_view(
   openapi.Info(
      title="active_citizen API",
      default_version='v1',
      description="Документация для приложения active_citizen",
      # terms_of_service="URL страницы с пользовательским соглашением",
      contact=openapi.Contact(email="wedyza@mail.ru"),
      license=openapi.License(name="BSD License"),
   ),
   public=True,
   permission_classes=(permissions.AllowAny,),
)

urlpatterns += [
   url(r'^swagger(?P<format>\.json|\.yaml)$',
       schema_view.without_ui(cache_timeout=0), name='schema-json'),
   url(r'^swagger/$', schema_view.with_ui('swagger', cache_timeout=0),
       name='schema-swagger-ui'),
   url(r'^redoc/$', schema_view.with_ui('redoc', cache_timeout=0),
       name='schema-redoc'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)