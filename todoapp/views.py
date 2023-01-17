from rest_framework.viewsets import ModelViewSet
from .models import Project, ToDo
from .serializers import ProjectModelSerializer, ToDoModelSerializer
from rest_framework.pagination import LimitOffsetPagination
from todoapp.filters import ToDoFilter


class ProjectLimitOffsetPaginator(LimitOffsetPagination):
    default_limit = 10


class ToDoLimitOffsetPaginator(LimitOffsetPagination):
    default_limit = 20


class ProjectModelViewSet(ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectModelSerializer
    pagination_class = ProjectLimitOffsetPaginator

    def get_queryset(self):
        name = self.request.query_params.get('name')
        if name:
            return Project.objects.filter(name__contains=name)
        return super().get_queryset()

    def destroy(self, request, *args, **kwargs):
        print(request)


class ToDoModelViewSet(ModelViewSet):
    queryset = ToDo.objects.all()
    serializer_class = ToDoModelSerializer
    pagination_class = ToDoLimitOffsetPaginator
    filterset_class = ToDoFilter
