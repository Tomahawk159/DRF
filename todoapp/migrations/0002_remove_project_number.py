# Generated by Django 4.1.4 on 2023-01-15 14:53

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('todoapp', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='project',
            name='number',
        ),
    ]
