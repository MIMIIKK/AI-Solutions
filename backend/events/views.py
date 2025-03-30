from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from django.utils import timezone
from .models import Event, EventImage
from .serializers import EventSerializer, EventDetailSerializer, EventImageSerializer

class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    lookup_field = 'slug'
    
    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            return [permissions.IsAdminUser()]
        return [permissions.AllowAny()]
    
    def get_serializer_class(self):
        if self.action == 'retrieve':
            return EventDetailSerializer
        return EventSerializer
    
    @action(detail=False, methods=['get'])
    def featured(self, request):
        featured_events = Event.objects.filter(is_featured=True)
        serializer = self.get_serializer(featured_events, many=True)
        return Response(serializer.data)
        
    @action(detail=False, methods=['get'])
    def upcoming(self, request):
        current_time = timezone.now()
        upcoming_events = Event.objects.filter(end_date__gte=current_time).order_by('start_date')
        page = self.paginate_queryset(upcoming_events)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        serializer = self.get_serializer(upcoming_events, many=True)
        return Response(serializer.data)
        
    @action(detail=False, methods=['get'])
    def past(self, request):
        current_time = timezone.now()
        past_events = Event.objects.filter(end_date__lt=current_time).order_by('-start_date')
        page = self.paginate_queryset(past_events)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        serializer = self.get_serializer(past_events, many=True)
        return Response(serializer.data)

class EventImageViewSet(viewsets.ModelViewSet):
    queryset = EventImage.objects.all()
    serializer_class = EventImageSerializer
    permission_classes = [permissions.IsAdminUser]