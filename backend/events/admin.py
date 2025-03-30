from django.contrib import admin
from .models import Event, EventImage

class EventImageInline(admin.TabularInline):
    model = EventImage
    extra = 3

@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ('title', 'location', 'start_date', 'end_date', 'is_featured')
    prepopulated_fields = {'slug': ('title',)}
    search_fields = ('title', 'description', 'location')
    list_filter = ('is_featured', 'start_date')
    inlines = [EventImageInline]

@admin.register(EventImage)
class EventImageAdmin(admin.ModelAdmin):
    list_display = ('event', 'caption', 'created_at')
    list_filter = ('event', 'created_at')