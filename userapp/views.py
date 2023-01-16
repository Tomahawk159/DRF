from rest_framework.generics import ListAPIView, RetrieveAPIView, UpdateAPIView
from .models import User
from .serializers import UserModelSerializer
from rest_framework.viewsets import GenericViewSet


class UserModelViewSet(GenericViewSet, ListAPIView,RetrieveAPIView, UpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserModelSerializer
