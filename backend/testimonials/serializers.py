from rest_framework import serializers
from .models import Testimonial, Rating

class TestimonialSerializer(serializers.ModelSerializer):
    solution_title = serializers.ReadOnlyField(source='solution.title')
    
    class Meta:
        model = Testimonial
        fields = [
            'id', 'name', 'company', 'position', 'photo', 'testimonial_text', 
            'rating', 'solution', 'solution_title', 'is_featured', 'date_added'
        ]

class RatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rating
        fields = ['id', 'solution', 'rating_value', 'comment', 'user_name', 'user_email', 'created_at']
        read_only_fields = ['id', 'created_at']