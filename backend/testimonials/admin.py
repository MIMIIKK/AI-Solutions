from django.contrib import admin
from .models import Testimonial, Rating

@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = ('name', 'company', 'rating', 'solution', 'is_featured', 'approved')
    list_filter = ('rating', 'is_featured', 'approved')
    search_fields = ('name', 'company', 'testimonial_text')

@admin.register(Rating)
class RatingAdmin(admin.ModelAdmin):
    list_display = ('solution', 'rating_value', 'user_name', 'created_at', 'approved')
    list_filter = ('rating_value', 'approved')
    search_fields = ('user_name', 'user_email', 'comment')