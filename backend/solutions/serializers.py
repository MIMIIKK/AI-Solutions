from rest_framework import serializers
from .models import Solution, SolutionFeature, CaseStudy

class SolutionFeatureSerializer(serializers.ModelSerializer):
    class Meta:
        model = SolutionFeature
        fields = ['id', 'title', 'description', 'icon']

class CaseStudySerializer(serializers.ModelSerializer):
    class Meta:
        model = CaseStudy
        fields = ['id', 'title', 'client_name', 'industry', 'challenge', 'solution_approach', 'results', 'image']

class SolutionSerializer(serializers.ModelSerializer):
    features = SolutionFeatureSerializer(many=True, read_only=True)
    case_studies = CaseStudySerializer(many=True, read_only=True)
    
    class Meta:
        model = Solution
        fields = [
            'id', 'title', 'slug', 'short_description', 'description', 
            'image', 'technologies', 'key_features', 'benefits',
            'created_at', 'is_featured', 'features', 'case_studies'
        ]