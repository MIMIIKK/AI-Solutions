from rest_framework import viewsets, permissions
from .models import Inquiry
from .serializers import InquirySerializer, AdminInquirySerializer

class InquiryViewSet(viewsets.ModelViewSet):
    queryset = Inquiry.objects.all()
    
    def get_serializer_class(self):
        if self.request.user.is_staff:
            return AdminInquirySerializer
        return InquirySerializer
    
    def get_permissions(self):
        if self.action in ['create']:
            return [permissions.AllowAny()]
        return [permissions.IsAdminUser()]