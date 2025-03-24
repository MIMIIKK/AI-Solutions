from rest_framework import viewsets
from django.utils import timezone
from .models import Event
from .serializers import EventSerializer

class EventViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    lookup_field = 'slug'
    
    def get_queryset(self):
        queryset = Event.objects.all()
        event_type = self.request.query_params.get('type', None)
        
        if event_type == 'upcoming':
            queryset = queryset.filter(
                date__gte=timezone.now(),
                event_type='upcoming'
            )
        elif event_type == 'past':
            queryset = queryset.filter(
                date__lt=timezone.now(),
                event_type='past'
            )
        
        return queryset