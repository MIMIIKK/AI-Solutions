from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.reverse import reverse

@api_view(['GET'])
def api_root(request, format=None):
    """
    API root endpoint providing links to all main API endpoints
    """
    return Response({
        'solutions': reverse('solution-list', request=request, format=format),
        'testimonials': reverse('testimonial-list', request=request, format=format),
        'articles': reverse('article-list', request=request, format=format),
        'events': reverse('event-list', request=request, format=format),
        'inquiries': reverse('inquiry-list', request=request, format=format),
    })