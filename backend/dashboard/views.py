from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response

from inquiries.models import Inquiry
from solutions.models import Solution
from testimonials.models import Testimonial
from articles.models import Article
from events.models import Event

@api_view(['GET'])
@permission_classes([IsAdminUser])
def dashboard_stats(request):
    """
    Get statistics for admin dashboard
    """
    total_inquiries = Inquiry.objects.count()
    new_inquiries = Inquiry.objects.filter(status='new').count()
    
    total_solutions = Solution.objects.count()
    total_testimonials = Testimonial.objects.count()
    total_articles = Article.objects.count()
    total_events = Event.objects.count()
    
    # Get latest inquiries
    latest_inquiries = Inquiry.objects.all()[:5].values('id', 'name', 'company', 'created_at', 'status')
    
    return Response({
        'inquiries': {
            'total': total_inquiries,
            'new': new_inquiries,
            'latest': latest_inquiries
        },
        'content': {
            'solutions': total_solutions,
            'testimonials': total_testimonials,
            'articles': total_articles,
            'events': total_events
        }
    })