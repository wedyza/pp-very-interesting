from rest_framework import permissions

class OwnerOrReadOnly(permissions.BasePermission):

    def has_permission(self, request, view):
        return (
                request.method in permissions.SAFE_METHODS
                or request.user.is_authenticated
                or request.user.is_superuser
            )

    def has_object_permission(self, request, view, obj):
        return obj == request.user
    

class AdminOrReadOnly(permissions.BasePermission):

    def has_permission(self, request, view):
        return (
            request.method in permissions.SAFE_METHODS
            or request.user.is_staff
        )

class PostOrOwnerOrReadOnly(permissions.BasePermission):

    def has_permission(self, request, view):
        return (
            request.method in permissions.SAFE_METHODS
            or request.method == 'POST'
            or request.user.is_staff
        )

class ModeratorOrAdmin(permissions.BasePermission):
    def has_permission(self, request, view):
        return (
            request.user.is_staff or
            request.user.is_superuser
        )
    

class IsAdmin(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_superuser