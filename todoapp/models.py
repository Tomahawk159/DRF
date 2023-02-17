from django.db import models
from userapp.models import CustomUser, CustomBaseModel


class Project(CustomBaseModel):
    project_number = models.PositiveIntegerField(
        unique=True, editable=False, verbose_name='Project number', default=10)
    name = models.CharField(max_length=32, verbose_name='Project name')
    repo_link = models.CharField(max_length=128, verbose_name='Link on repo')
    users = models.ManyToManyField(CustomUser, verbose_name='Users')

    def save(self, *args, **kwargs):
        if self._state.adding:
            last_number = Project.objects.all().aggregate(
                largest=models.Max('project_number'))['largest']
            if last_number is not None:
                self.project_number = last_number + 1

        super().save(*args, **kwargs)

    def __str__(self):
        return f' Name: {self.name} '


class ToDo(CustomBaseModel):
    project = models.ForeignKey(
        Project, on_delete=models.CASCADE, verbose_name='Project')
    task_number = models.PositiveIntegerField(
        unique=True, editable=False, verbose_name='Task number', default=1000)
    name = models.CharField(max_length=128, verbose_name='Task name')
    creator = models.ForeignKey(
        CustomUser, on_delete=models.CASCADE, verbose_name='Creator')
    body = models.TextField(max_length=500, verbose_name='Task body')
    is_active = models.BooleanField(default=True, verbose_name='Is active')

    def save(self, *args, **kwargs):
        if self._state.adding:
            last_number = ToDo.objects.all().aggregate(
                largest=models.Max('task_number'))['largest']
            if last_number is not None:
                self.task_number = last_number + 1

        super().save(*args, **kwargs)

    def __str__(self):
        return f'Project: {self.project} | Task # {self.name}'
