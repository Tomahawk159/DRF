from django_filters.rest_framework import FilterSet
from todoapp.models import ToDo


class ToDoFilter(FilterSet):

    class Meta:
        model = ToDo
        fields = ['project', ]
        