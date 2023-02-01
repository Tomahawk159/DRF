
from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIRequestFactory, APIClient, APITestCase
from userapp.models import CustomUser
from userapp.views import CustomUserModelViewSet
from mixer.backend.django import mixer


class TestCustomUserAPI(TestCase):

    def test_get_list(self):
        factory = APIRequestFactory()
        request = factory.get('/users/')
        view = CustomUserModelViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_post_user_guest(self):
        client = APIClient()
        response = client.post('/users/', )
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_post_user_admin(self):
        client = APIClient()
        CustomUser.objects.create_superuser(
            'admin', 'admin@django.local', 'admin')
        client.login(username='admin', password='admin')

        response = client.post('/users/', )
        self.assertEqual(response.status_code,
                         status.HTTP_405_METHOD_NOT_ALLOWED)
        client.logout()

    def test_patch_user_guest(self):
        client = APIClient()
        blended_user = mixer.blend('userapp.CustomUser')

        response = client.patch(f'/users/{blended_user.id}/')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_patch_user_admin(self):
        client = APIClient()
        CustomUser.objects.create_superuser(
            'admin', 'admin@django.local', 'admin')
        client.login(username='admin', password='admin')

        blended_user = mixer.blend('userapp.CustomUser')

        response = client.patch(f'/users/{blended_user.id}/', {
            'username': f'{blended_user.username}',
            'password': f'{blended_user.password}',
            'email': f'{blended_user.email}',
            'first_name': f'new first name',
        })

        updated_user = CustomUser.objects.get(id=blended_user.id)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(blended_user.username, updated_user.username)
        self.assertNotEqual(blended_user.first_name, updated_user.first_name)

    def test_delete_user_guest(self):
        client = APIClient()
        blended_user = mixer.blend('userapp.CustomUser')

        response = client.delete(f'/users/{blended_user.id}/')

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_delete_user_admin(self):
        client = APIClient()
        CustomUser.objects.create_superuser(
            'admin', 'admin@django.local', 'admin')
        client.login(username='admin', password='admin')

        blended_user = mixer.blend('userapp.CustomUser')
        response = client.delete(f'/users/{blended_user.id}/')

        self.assertEqual(response.status_code,
                         status.HTTP_405_METHOD_NOT_ALLOWED)
