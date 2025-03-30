from rest_framework import serializers
from django.contrib.contenttypes.models import ContentType
from .models import Testimonial

class TestimonialSerializer(serializers.ModelSerializer):
    content_type_name = serializers.SerializerMethodField()
    
    class Meta:
        model = Testimonial
        fields = ['id', 'name', 'position', 'company', 'photo', 'comment', 
                  'rating', 'content_type', 'object_id', 'content_type_name',
                  'created_at', 'is_approved']
        extra_kwargs = {
            'content_type': {'write_only': True},
            'email': {'write_only': True},
            'is_approved': {'read_only': True}
        }
        
    def get_content_type_name(self, obj):
        if obj.content_type:
            return obj.content_type.model
        return None

class TestimonialCreateSerializer(serializers.ModelSerializer):
    content_type_name = serializers.CharField(write_only=True)
    
    class Meta:
        model = Testimonial
        fields = ['id', 'name', 'position', 'company', 'email', 'photo', 'comment', 
                  'rating', 'content_type_name', 'object_id']
    
    def validate(self, data):
        content_type_name = data.pop('content_type_name', None)
        if content_type_name and data.get('object_id'):
            try:
                content_type = ContentType.objects.get(model=content_type_name)
                data['content_type'] = content_type
            except ContentType.DoesNotExist:
                raise serializers.ValidationError("Invalid content type")
        return data