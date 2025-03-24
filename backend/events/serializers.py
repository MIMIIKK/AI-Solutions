from rest_framework import serializers
from .models import Event, EventPhoto

class EventPhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = EventPhoto
        fields = ['id', 'image', 'caption', 'display_order']

class EventSerializer(serializers.ModelSerializer):
    photos = EventPhotoSerializer(many=True, read_only=True)
    
    class Meta:
        model = Event
        fields = [
            'id', 'title', 'slug', 'description', 'event_type', 
            'date', 'location', 'featured_image', 'is_featured',
            'created_at', 'photos'
        ]