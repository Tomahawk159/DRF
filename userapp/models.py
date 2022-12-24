from django.db import models
from uuid import uuid4


class User(models.Model):
    id = models.UUIDField(default=uuid4, primary_key=True)
    first_name = models.CharField(max_length=64)
    last_name = models.CharField(max_length=64)
    email = models.EmailField(max_length=256, unique=True)

    def __str__(self):
        return f'Name: {self.first_name} | email: {self.email}'
