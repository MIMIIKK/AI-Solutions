from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets, permissions, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from django.utils import timezone
from .models import Category, Post
from .serializers import CategorySerializer, PostSerializer, PostDetailSerializer

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    lookup_field = 'slug'
    
    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            return [permissions.IsAdminUser()]
        return [permissions.AllowAny()]

class PostViewSet(viewsets.ModelViewSet):
    serializer_class = PostSerializer
    lookup_field = 'slug'
    filter_backends = [filters.SearchFilter]
    search_fields = ['title', 'summary', 'content', 'categories__name']
    
    def get_queryset(self):
        queryset = Post.objects.all()
        if not self.request.user.is_staff:
            queryset = queryset.filter(is_published=True)
            
        category = self.request.query_params.get('category')
        if category:
            queryset = queryset.filter(categories__slug=category)
                
        return queryset
    
    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            return [permissions.IsAdminUser()]
        return [permissions.AllowAny()]
    
    def get_serializer_class(self):
        if self.action == 'retrieve':
            return PostDetailSerializer
        return PostSerializer
    
    def perform_create(self, serializer):
        if serializer.validated_data.get('is_published', False):
            serializer.save(author=self.request.user, published_at=timezone.now())
        else:
            serializer.save(author=self.request.user)
            
    def perform_update(self, serializer):
        instance = self.get_object()
        if not instance.is_published and serializer.validated_data.get('is_published', False):
            serializer.save(published_at=timezone.now())
        else:
            serializer.save()
    
    @action(detail=False, methods=['get'])
    def featured(self, request):
        featured_posts = Post.objects.filter(is_featured=True, is_published=True)
        serializer = self.get_serializer(featured_posts, many=True)
        return Response(serializer.data)