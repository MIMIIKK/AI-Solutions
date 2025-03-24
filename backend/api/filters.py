from django_filters import rest_framework as filters
from solutions.models import Solution
from events.models import Event
from articles.models import Article

class SolutionFilter(filters.FilterSet):
    """
    Filter for Solution objects based on various fields
    """
    is_featured = filters.BooleanFilter()
    
    class Meta:
        model = Solution
        fields = ['is_featured']

class EventFilter(filters.FilterSet):
    """
    Filter for Event objects based on various fields
    """
    event_type = filters.CharFilter(field_name='event_type')
    date_from = filters.DateFilter(field_name='date', lookup_expr='gte')
    date_to = filters.DateFilter(field_name='date', lookup_expr='lte')
    
    class Meta:
        model = Event
        fields = ['event_type', 'is_featured']

class ArticleFilter(filters.FilterSet):
    """
    Filter for Article objects based on various fields
    """
    category = filters.CharFilter(field_name='category__slug')
    
    class Meta:
        model = Article
        fields = ['category', 'is_featured', 'is_published']