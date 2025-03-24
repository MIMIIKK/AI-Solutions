from django.contrib import admin
from .models import Solution, SolutionFeature, CaseStudy

class SolutionFeatureInline(admin.TabularInline):
    model = SolutionFeature
    extra = 1

class CaseStudyInline(admin.TabularInline):
    model = CaseStudy
    extra = 1

@admin.register(Solution)
class SolutionAdmin(admin.ModelAdmin):
    list_display = ('title', 'is_featured', 'created_at')
    list_filter = ('is_featured',)
    search_fields = ('title', 'description')
    prepopulated_fields = {'slug': ('title',)}
    inlines = [SolutionFeatureInline, CaseStudyInline]