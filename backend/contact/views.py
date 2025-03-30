from rest_framework import viewsets, permissions, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import Count
from django.db.models.functions import TruncDay, TruncMonth
from .models import Contact
from .serializers import ContactSerializer, ContactDetailSerializer

class ContactViewSet(viewsets.ModelViewSet):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name', 'email', 'company', 'country', 'job_title', 'job_details']
    ordering_fields = ['created_at', 'status']
    
    def get_permissions(self):
        # Explicitly allow anyone to create contact submissions
        if self.action == 'create':
            return [permissions.AllowAny()]
        # Admin only for all other actions
        return [permissions.IsAdminUser()]
    
    def get_serializer_class(self):
        if self.action in ['retrieve', 'update', 'partial_update']:
            return ContactDetailSerializer
        return ContactSerializer