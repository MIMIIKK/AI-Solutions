from django.contrib import admin
from .models import Contact

@admin.register(Contact)
class ContactAdmin(admin.ModelAdmin):
    list_display = ('name', 'company', 'country', 'status', 'created_at')
    list_filter = ('status', 'country', 'created_at')
    search_fields = ('name', 'email', 'company', 'job_details')
    readonly_fields = ('created_at', 'updated_at')
    fieldsets = (
        (None, {
            'fields': ('name', 'email', 'phone', 'company', 'country', 'job_title', 'job_details')
        }),
        ('Status Information', {
            'fields': ('status', 'notes')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )