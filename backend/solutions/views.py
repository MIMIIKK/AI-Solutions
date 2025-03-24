from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Solution
from .serializers import SolutionSerializer
from testimonials.models import Testimonial
from testimonials.serializers import TestimonialSerializer

class SolutionViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Solution.objects.all()
    serializer_class = SolutionSerializer
    lookup_field = 'slug'
    
    @action(detail=False, methods=['get'])
    def featured(self, request):
        featured_solutions = Solution.objects.filter(is_featured=True)
        serializer = self.get_serializer(featured_solutions, many=True)
        return Response(serializer.data)
    
    @action(detail=True, methods=['get'])
    def testimonials(self, request, slug=None):
        solution = self.get_object()
        testimonials = Testimonial.objects.filter(solution=solution, approved=True)
        serializer = TestimonialSerializer(testimonials, many=True)
        return Response(serializer.data)