from django.db import models
from django.utils.text import slugify

class Solution(models.Model):
    title = models.CharField(max_length=255)
    slug = models.SlugField(unique=True)
    short_description = models.TextField(max_length=500)
    description = models.TextField()
    image = models.ImageField(upload_to='solutions/')
    technologies = models.CharField(max_length=500)
    key_features = models.TextField()
    benefits = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_featured = models.BooleanField(default=False)
    
    def __str__(self):
        return self.title
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)
    
    class Meta:
        ordering = ['-created_at']

class SolutionFeature(models.Model):
    solution = models.ForeignKey(Solution, related_name='features', on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    description = models.TextField()
    icon = models.CharField(max_length=100, blank=True, null=True)
    
    def __str__(self):
        return f"{self.solution.title} - {self.title}"

class CaseStudy(models.Model):
    solution = models.ForeignKey(Solution, related_name='case_studies', on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    client_name = models.CharField(max_length=255)
    industry = models.CharField(max_length=255)
    challenge = models.TextField()
    solution_approach = models.TextField()
    results = models.TextField()
    image = models.ImageField(upload_to='case_studies/', blank=True, null=True)
    
    def __str__(self):
        return self.title
    
    class Meta:
        verbose_name_plural = "Case Studies"