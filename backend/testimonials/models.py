from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator

class Testimonial(models.Model):
    name = models.CharField(max_length=255, verbose_name="Customer Name")
    company = models.CharField(max_length=255, verbose_name="Company Name")
    position = models.CharField(max_length=255, verbose_name="Job Position")
    photo = models.ImageField(upload_to='testimonials/', blank=True, null=True, verbose_name="Customer Photo")
    testimonial_text = models.TextField(verbose_name="Testimonial")
    rating = models.IntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(5)],
        verbose_name="Rating (1-5 stars)"
    )
    solution = models.ForeignKey(
        'solutions.Solution', 
        on_delete=models.SET_NULL, 
        related_name='testimonials', 
        blank=True, 
        null=True,
        verbose_name="Related Solution"
    )
    is_featured = models.BooleanField(default=False, verbose_name="Featured on Homepage")
    date_added = models.DateField(auto_now_add=True)
    approved = models.BooleanField(default=True, verbose_name="Approved for Display")

    class Meta:
        ordering = ['-date_added']
        verbose_name = "Customer Testimonial"
        verbose_name_plural = "Customer Testimonials"

    def __str__(self):
        return f"{self.name} - {self.company} ({self.rating} stars)"

class Rating(models.Model):
    solution = models.ForeignKey(
        'solutions.Solution', 
        on_delete=models.CASCADE, 
        related_name='ratings',
        verbose_name="Solution"
    )
    rating_value = models.IntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(5)],
        verbose_name="Rating Value (1-5)"
    )
    comment = models.TextField(blank=True, null=True, verbose_name="Additional Comments")
    user_name = models.CharField(max_length=255, verbose_name="User Name")
    user_email = models.EmailField(verbose_name="User Email")
    created_at = models.DateTimeField(auto_now_add=True)
    approved = models.BooleanField(default=False, verbose_name="Approved")

    class Meta:
        ordering = ['-created_at']
        verbose_name = "Solution Rating"
        verbose_name_plural = "Solution Ratings"

    def __str__(self):
        return f"{self.solution.title}: {self.rating_value} stars by {self.user_name}"