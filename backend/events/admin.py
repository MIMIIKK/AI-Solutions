from django.contrib import admin
from .models import Event, EventPhoto

class EventPhotoInline(admin.TabularInline):
    model = EventPhoto
    extra = 3

@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ('title', 'event_type', 'date', 'location', 'is_featured')
    list_filter = ('event_type', 'is_featured')
    search_fields = ('title', 'description', 'location')
    prepopulated_fields = {'slug': ('title',)}
    inlines = [EventPhotoInline]