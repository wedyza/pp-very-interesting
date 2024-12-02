from django.contrib import admin

from .models import (
    Category, SubCategory, Ticket, Comment, Notification,
    SupportTicket, StatusCode, Media
) 

admin.site.register(Category)
admin.site.register(SubCategory)
admin.site.register(Ticket)
admin.site.register(Comment)
admin.site.register(Notification)
admin.site.register(SupportTicket)
admin.site.register(StatusCode)
admin.site.register(Media)
