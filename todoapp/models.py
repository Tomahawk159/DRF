from django.db import models
from userapp.models import User


class Project(models.Model):
    name = models.CharField(max_length=32)
    number = models.IntegerField(editable=False, unique=True)
    users_id = models.ManyToManyField(User)

    def __str__(self):
        return f'number: {self.number} | name: {self.name} '


class ToDo(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    creator = models.ForeignKey(User, on_delete=models.CASCADE)
    number = models.IntegerField(editable=False, unique=True)
    text = models.TextField(max_length=500)
    completed = models.BooleanField(default=False)

    def __str__(self):
        return f'Project: {self.project} | Task # {self.creator}'
