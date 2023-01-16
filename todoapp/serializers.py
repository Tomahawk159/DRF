from rest_framework.serializers import HyperlinkedModelSerializer, ModelSerializer
from .models import Project, ToDo
from rest_framework.relations import StringRelatedField


class ProjectModelSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'


class ToDoModelSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = ToDo
        fields = '__all__'

