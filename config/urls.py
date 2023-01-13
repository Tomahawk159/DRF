from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from userapp.views import UserModelViewSet
from todoapp.views import ProjectModelViewSet, ToDoModelViewSet


router = routers.DefaultRouter()
router.register('users', UserModelViewSet)
router.register('project', ProjectModelViewSet)
router.register('todo', ToDoModelViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('api/', include(router.urls)),
]
