from rest_framework import status
from rest_framework.test import APITestCase
from userapp.models import CustomUser
from todoapp.models import Project, ToDo
from mixer.backend.django import mixer


class TestProjectAPI(APITestCase):

    def test_get_list(self):
        response = self.client.get('/projects/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_item_detail(self):
        project = mixer.blend('todoapp.Project')
        response = self.client.get(f'/projects/{project.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_post_guest(self):
        response = self.client.post('/projects/')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_post_admin(self):
        user = mixer.blend('userapp.CustomUser')
        project = mixer.blend('todoapp.Project')
        project_count = Project.objects.count()

        CustomUser.objects.create_superuser('admin', 'admin@local', 'admin')
        self.client.login(username='admin', password='admin')
        response = self.client.post('/projects/',
                                    {'name': f'{project.name}', 'repoLink': f'{project.repo_link}',
                                     'users': [user.id]})

        updated_project_count = Project.objects.count()

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertNotEqual(project_count, updated_project_count)

        self.client.logout()

    def test_patch_project_guest(self):
        blended_project = mixer.blend('todoapp.Project')

        response = self.client.patch(f'/projects/{blended_project.id}/')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_patch_project_admin(self):
        blended_project = mixer.blend('todoapp.Project')

        CustomUser.objects.create_superuser('admin', 'admin@local', 'admin')
        self.client.login(username='admin', password='admin')
        response = self.client.patch(f'/projects/{blended_project.id}/', {'name': 'new_name',
                                                                          'repoLink': f'sometest@link.com',
                                                                          'users': []})
        updated_project_obj = Project.objects.get(id=blended_project.id)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertNotEqual(blended_project.name, updated_project_obj.name)
        self.assertNotEqual(blended_project.repo_link,
                            updated_project_obj.repo_link)

    def test_delete_project_guest(self):
        blended_project = mixer.blend('todoapp.Project')
        response = self.client.delete(f'/projects/{blended_project.id}/')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_delete_project_admin(self):
        blended_project = mixer.blend('todoapp.Project')
        active_projects_count = Project.objects.filter(deleted=False).count()
        projects_count = Project.objects.count()

        CustomUser.objects.create_superuser('admin', 'admin@local', 'admin')
        self.client.login(username='admin', password='admin')
        response = self.client.delete(f'/projects/{blended_project.id}/')

        updated_active_projects_count = Project.objects.filter(
            deleted=False).count()
        updated_projects_count = Project.objects.count()

        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(projects_count, updated_projects_count)
        self.assertNotEqual(active_projects_count,
                            updated_active_projects_count)


class TestToDoAPI(APITestCase):
    @staticmethod
    def _blend_task():
        creator = mixer.blend('userapp.CustomUser')
        project = mixer.blend('todoapp.Project')
        task = mixer.blend('todoapp.ToDo', creator=creator, project=project)
        return task

    def test_get_list(self):
        response = self.client.get('/TODO/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_item_detail(self):
        task = self._blend_task()
        response = self.client.get(f'/TODO/{task.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_post_todo_guest(self):
        response = self.client.post('/TODO/')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_post_todo_admin(self):
        task = self._blend_task()
        tasks_count = ToDo.objects.count()
        CustomUser.objects.create_superuser('admin', 'admin@local', 'admin')
        self.client.login(username='admin', password='admin')
        response = self.client.post('/TODO/', {
            'project': f'{task.project.id}',
            'creator': f'{task.creator.id}',
            'body': f'{task.body}'
        })
        updated_tasks_count = ToDo.objects.count()
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertNotEqual(tasks_count, updated_tasks_count)

    def test_patch_todo_guest(self):
        blended_task = self._blend_task()

        response = self.client.patch(f'/TODO/{blended_task.id}/', {
            'project': f'{blended_task.project.id}',
            'creator': f'{blended_task.creator.id}',
            'body': 'some text'
        })

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_patch_todo_admin(self):
        blended_task = self._blend_task()

        CustomUser.objects.create_superuser('admin', 'admin@local', 'admin')
        self.client.login(username='admin', password='admin')
        response = self.client.patch(f'/TODO/{blended_task.id}/', {
            'project': f'{blended_task.project.id}',
            'creator': f'{blended_task.creator.id}',
            'body': 'some text'
        })

        updated_task_obj = ToDo.objects.get(id=blended_task.id)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertNotEqual(updated_task_obj.body, blended_task.body)

    def test_delete_todo_guest(self):
        blended_task = self._blend_task()

        response = self.client.delete(f'/TODO/{blended_task.id}/')

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_delete_todo_admin(self):
        blended_task = self._blend_task()
        active_tasks_count = ToDo.objects.filter(deleted=False).count()
        tasks_count = ToDo.objects.count()

        CustomUser.objects.create_superuser('admin', 'admin@local', 'admin')
        self.client.login(username='admin', password='admin')
        response = self.client.delete(f'/TODO/{blended_task.id}/')

        updated_active_tasks_count = ToDo.objects.filter(deleted=False).count()
        updated_tasks_count = ToDo.objects.count()

        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(tasks_count, updated_tasks_count)
        self.assertNotEqual(active_tasks_count, updated_active_tasks_count)
