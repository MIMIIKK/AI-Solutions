from rest_framework import serializers
from .models import Contact

class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = ['id', 'name', 'email', 'phone', 'company', 'country', 
                  'job_title', 'job_details', 'created_at']
        
class ContactDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = ['id', 'name', 'email', 'phone', 'company', 'country', 
                  'job_title', 'job_details', 'status', 'notes', 
                  'created_at', 'updated_at']