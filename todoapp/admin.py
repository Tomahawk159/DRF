from django.contrib import admin
from todoapp.models import Project, ToDo


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('pk', 'name',  'created_at', 'updated_at')
    list_filter = ('deleted', 'created_at')
    ordering = ('-pk', 'deleted', 'created_at')
    list_per_page = 20
    search_fields = ('name',)
    actions = ('mark_as_delete', 'mark_as_active',)

    def mark_as_delete(self, request, queryset):
        queryset.update(deleted=True)

    mark_as_delete.short_description = 'Пометить удаленным'

    def mark_as_active(self, request, queryset):
        queryset.update(deleted=False)

    mark_as_active.short_description = 'Снять пометку на удаление'


@admin.register(ToDo)
class ToDoAdmin(admin.ModelAdmin):
    list_display = ('pk', 'project', 'creator', 'body',
                    'is_active', 'created_at', 'updated_at')
    list_filter = ('deleted', 'created_at')
    ordering = ('-pk', 'deleted', 'created_at')
    list_per_page = 20
    search_fields = ('body', 'project')
    actions = ('mark_as_delete', 'mark_as_active',)
