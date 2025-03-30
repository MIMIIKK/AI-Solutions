from rest_framework import serializers
from .models import Event, EventImage
from testimonials.models import Testimonial
from testimonials.serializers import TestimonialSerializer

class EventImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = EventImage
        fields = ['id', 'image', 'caption', 'created_at']

class EventSerializer(serializers.ModelSerializer):
    average_rating = serializers.SerializerMethodField()
    
    class Meta:
        model = Event
        fields = ['id', 'title', 'slug', 'description', 'image', 'location', 
                  'start_date', 'end_date', 'registration_url', 'is_featured', 
                  'created_at', 'updated_at', 'average_rating']
        
    def get_average_rating(self, obj):
        testimonials = Testimonial.objects.filter(content_type__model='event', object_id=obj.id)
        if testimonials.exists():
            total = sum(t.rating for t in testimonials)
            return total / testimonials.count()
        return 0

class EventDetailSerializer(EventSerializer):
    images = EventImageSerializer(many=True, read_only=True)
    testimonials = serializers.SerializerMethodField()
    
    class Meta(EventSerializer.Meta):
        fields = EventSerializer.Meta.fields + ['images', 'testimonials']
        
    def get_testimonials(self, obj):
        testimonials = Testimonial.objects.filter(content_type__model='event', object_id=obj.id)
        return TestimonialSerializer(testimonials, many=True).data