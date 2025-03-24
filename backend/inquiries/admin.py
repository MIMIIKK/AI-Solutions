from django.contrib import admin
from .models import Inquiry

@admin.register(Inquiry)
class InquiryAdmin(admin.ModelAdmin):
    list_display = ('name', 'company', 'email', 'status', 'created_at')
    list_filter = ('status', 'country')
    search_fields = ('name', 'email', 'company', 'job_details')
    readonly_fields = ('created_at', 'updated_at')