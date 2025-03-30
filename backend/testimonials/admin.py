from django.contrib import admin
from .models import Testimonial

@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = ('name', 'company', 'rating', 'is_approved', 'content_type', 'created_at')
    list_filter = ('is_approved', 'rating', 'content_type')
    search_fields = ('name', 'email', 'company', 'comment')
    actions = ['approve_testimonials']
    
    def approve_testimonials(self, request, queryset):
        updated = queryset.update(is_approved=True)
        self.message_user(request, f"{updated} testimonials were approved.")
    approve_testimonials.short_description = "Approve selected testimonials"