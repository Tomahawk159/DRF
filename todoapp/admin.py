from django.contrib import admin
from todoapp.models import Project, ToDo


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('pk', 'name', 'number')
    list_filter = ('deleted', 'created_at')
    ordering = ('-pk', 'deleted', 'created_at')
    list_per_page = 20
    search_fields = ('name', 'number')
    actions = ('mark_as_delete', 'mark_as_active',)

    def mark_as_delete(self, request, queryset):
        queryset.update(deleted=True)

    mark_as_delete.short_description = 'Пометить удаленным'

    def mark_as_active(self, request, queryset):
        queryset.update(deleted=False)

    mark_as_active.short_description = 'Снять пометку на удаление'


@admin.register(ToDo)
class ToDoAdmin(admin.ModelAdmin):
    list_display = ('pk', 'project', 'creator', 'number', 'body', 'is_active')
    list_filter = ('deleted', 'created_at')
    ordering = ('-pk', 'deleted', 'created_at')
    list_per_page = 20
    search_fields = ('number', 'body')
    actions = ('mark_as_delete', 'mark_as_active',)
