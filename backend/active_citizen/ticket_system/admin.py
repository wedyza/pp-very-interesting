from django.contrib import admin

from .models import (
    Category, SubCategory, Ticket, Review, Notification,
    SupportTicket, StatusCode, Media
) 

admin.site.register(Category)
admin.site.register(SubCategory)
admin.site.register(Ticket)
admin.site.register(Review)
admin.site.register(Notification)
admin.site.register(SupportTicket)
admin.site.register(StatusCode)
admin.site.register(Media)
