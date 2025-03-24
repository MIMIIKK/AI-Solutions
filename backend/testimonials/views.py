from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Testimonial, Rating
from .serializers import TestimonialSerializer, RatingSerializer

class TestimonialViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Testimonial.objects.filter(approved=True)
    serializer_class = TestimonialSerializer
    
    @action(detail=False, methods=['get'])
    def featured(self, request):
        featured = Testimonial.objects.filter(is_featured=True, approved=True)
        serializer = self.get_serializer(featured, many=True)
        return Response(serializer.data)

class RatingViewSet(viewsets.ModelViewSet):
    queryset = Rating.objects.all()
    serializer_class = RatingSerializer
    http_method_names = ['post']  # Only allow POST requests
    
    def perform_create(self, serializer):
        serializer.save(approved=False)