from rest_framework import serializers
from .models import Inquiry

class InquirySerializer(serializers.ModelSerializer):
    class Meta:
        model = Inquiry
        fields = [
            'id', 'name', 'email', 'phone', 'company', 'country', 
            'job_title', 'job_details', 'created_at'
        ]
        read_only_fields = ['id', 'created_at']

class AdminInquirySerializer(serializers.ModelSerializer):
    class Meta:
        model = Inquiry
        fields = [
            'id', 'name', 'email', 'phone', 'company', 'country', 
            'job_title', 'job_details', 'status', 'created_at', 
            'updated_at', 'admin_notes'
        ]