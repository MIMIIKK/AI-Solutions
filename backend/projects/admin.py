from django.contrib import admin
from .models import Project, ProjectImage

class ProjectImageInline(admin.TabularInline):
    model = ProjectImage
    extra = 3

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'client', 'completed_date', 'is_featured')
    prepopulated_fields = {'slug': ('title',)}
    search_fields = ('title', 'client', 'description')
    list_filter = ('is_featured', 'completed_date')
    inlines = [ProjectImageInline]

@admin.register(ProjectImage)
class ProjectImageAdmin(admin.ModelAdmin):
    list_display = ('project', 'caption', 'created_at')
    list_filter = ('project', 'created_at')