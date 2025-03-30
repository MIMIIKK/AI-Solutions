from rest_framework import serializers
from .models import Service
from testimonials.models import Testimonial
from testimonials.serializers import TestimonialSerializer

class ServiceSerializer(serializers.ModelSerializer):
    average_rating = serializers.SerializerMethodField()
    
    class Meta:
        model = Service
        fields = ['id', 'title', 'slug', 'description', 'image', 'features', 
                  'is_featured', 'created_at', 'updated_at', 'average_rating']
        
    def get_average_rating(self, obj):
        testimonials = Testimonial.objects.filter(content_type__model='service', object_id=obj.id)
        if testimonials.exists():
            total = sum(t.rating for t in testimonials)
            return total / testimonials.count()
        return 0
        
class ServiceDetailSerializer(ServiceSerializer):
    testimonials = serializers.SerializerMethodField()
    features_list = serializers.SerializerMethodField()
    
    class Meta(ServiceSerializer.Meta):
        fields = ServiceSerializer.Meta.fields + ['testimonials', 'features_list']
        
    def get_testimonials(self, obj):
        testimonials = Testimonial.objects.filter(content_type__model='service', object_id=obj.id)
        return TestimonialSerializer(testimonials, many=True).data
        
    def get_features_list(self, obj):
        return [feature.strip() for feature in obj.features.split('\n') if feature.strip()]