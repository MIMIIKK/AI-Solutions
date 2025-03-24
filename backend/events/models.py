from django.db import models
from django.utils.text import slugify

class Event(models.Model):
    EVENT_TYPES = (
        ('upcoming', 'Upcoming Event'),
        ('past', 'Past Event'),
    )
    
    title = models.CharField(max_length=255)
    slug = models.SlugField(unique=True)
    description = models.TextField()
    event_type = models.CharField(max_length=10, choices=EVENT_TYPES)
    date = models.DateTimeField()
    location = models.CharField(max_length=255)
    featured_image = models.ImageField(upload_to='events/')
    is_featured = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.title
    
    class Meta:
        ordering = ['-date']
        
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

class EventPhoto(models.Model):
    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name='photos')
    image = models.ImageField(upload_to='events/')
    caption = models.CharField(max_length=255, blank=True, null=True)
    display_order = models.PositiveIntegerField(default=0)
    
    def __str__(self):
        return f"Photo for {self.event.title}"
    
    class Meta:
        ordering = ['display_order']