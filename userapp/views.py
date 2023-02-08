from rest_framework.pagination import LimitOffsetPagination
from rest_framework.viewsets import GenericViewSet
from rest_framework.mixins import ListModelMixin, RetrieveModelMixin, UpdateModelMixin
from userapp.models import CustomUser
from userapp.serializers import CustomUserModelSerializer
from userapp.serializers import CustomUserModelSerializerV01, CustomUserModelSerializerV02


class CustomUserLimitOffsetPaginator(LimitOffsetPagination):
    default_limit = 10


class CustomUserModelViewSet(GenericViewSet, ListModelMixin, RetrieveModelMixin, UpdateModelMixin):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserModelSerializerV01
    pagination_class = CustomUserLimitOffsetPaginator

    def get_queryset(self):
        return CustomUser.objects.filter(is_active=True)

    def get_serializer_class(self):
        if self.request.version == '0.2':
            return CustomUserModelSerializerV02

        return CustomUserModelSerializerV01
