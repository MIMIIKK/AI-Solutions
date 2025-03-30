from rest_framework import serializers
from .models import Category, Post
from testimonials.models import Testimonial
from testimonials.serializers import TestimonialSerializer
from django.contrib.auth.models import User

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'slug']

class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name']

class PostSerializer(serializers.ModelSerializer):
    categories = CategorySerializer(many=True, read_only=True)
    author = AuthorSerializer(read_only=True)
    average_rating = serializers.SerializerMethodField()
    
    class Meta:
        model = Post
        fields = ['id', 'title', 'slug', 'author', 'categories', 'image', 
                  'summary', 'is_published', 'is_featured', 'published_at', 
                  'created_at', 'updated_at', 'average_rating']
        
    def get_average_rating(self, obj):
        testimonials = Testimonial.objects.filter(content_type__model='post', object_id=obj.id)
        if testimonials.exists():
            total = sum(t.rating for t in testimonials)
            return total / testimonials.count()
        return 0

class PostDetailSerializer(PostSerializer):
    testimonials = serializers.SerializerMethodField()
    
    class Meta(PostSerializer.Meta):
        fields = PostSerializer.Meta.fields + ['content', 'testimonials']
        
    def get_testimonials(self, obj):
        testimonials = Testimonial.objects.filter(content_type__model='post', object_id=obj.id)
        return TestimonialSerializer(testimonials, many=True).data