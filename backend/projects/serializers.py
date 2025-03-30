from rest_framework import serializers
from .models import Project, ProjectImage
from testimonials.models import Testimonial
from testimonials.serializers import TestimonialSerializer

class ProjectImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectImage
        fields = ['id', 'image', 'caption', 'created_at']

class ProjectSerializer(serializers.ModelSerializer):
    average_rating = serializers.SerializerMethodField()
    
    class Meta:
        model = Project
        fields = ['id', 'title', 'slug', 'client', 'description', 'image', 
                  'completed_date', 'is_featured', 'created_at', 'updated_at', 'average_rating']
        
    def get_average_rating(self, obj):
        testimonials = Testimonial.objects.filter(content_type__model='project', object_id=obj.id)
        if testimonials.exists():
            total = sum(t.rating for t in testimonials)
            return total / testimonials.count()
        return 0

class ProjectDetailSerializer(ProjectSerializer):
    images = ProjectImageSerializer(many=True, read_only=True)
    testimonials = serializers.SerializerMethodField()
    
    class Meta(ProjectSerializer.Meta):
        fields = ProjectSerializer.Meta.fields + ['challenge', 'solution', 'results', 'images', 'testimonials']
        
    def get_testimonials(self, obj):
        testimonials = Testimonial.objects.filter(content_type__model='project', object_id=obj.id)
        return TestimonialSerializer(testimonials, many=True).data