import graphene
from graphene_django import DjangoObjectType
from todoapp.models import ToDo, Project
from userapp.models import CustomUser


class TaskType(DjangoObjectType):
    class Meta:
        model = ToDo
        exclude = 'updated_at',


class ProjectType(DjangoObjectType):
    class Meta:
        model = Project
        exclude = 'updated_at',


class UserType(DjangoObjectType):
    class Meta:
        model = CustomUser
        fields = 'username', 'first_name', 'last_name', 'email', 'birthday_date', 'id'


class Query(graphene.ObjectType):
    all_tasks = graphene.List(TaskType)
    all_users = graphene.List(UserType)
    all_projects = graphene.List(ProjectType)

    user_by_id = graphene.Field(UserType, id=graphene.Int(required=True))
    user_by_username = graphene.Field(
        UserType, username=graphene.String(required=False))

    task_by_id = graphene.Field(TaskType, id=graphene.Int(required=True))
    tasks_by_project_id = graphene.List(
        TaskType, id=graphene.String(required=True))

    project_by_id = graphene.Field(ProjectType, id=graphene.Int(required=True))
    projects_by_username = graphene.List(
        ProjectType, username=graphene.String(required=True))

    def resolve_all_tasks(root, info):
        return ToDo.objects.all()

    def resolve_all_users(root, info):
        return CustomUser.objects.filter(is_superuser=False)

    def resolve_all_projects(root, info):
        return Project.objects.all()

    def resolve_user_by_id(root, info, id):
        try:
            return CustomUser.objects.get(pk=id)
        except CustomUser.DoesNotExist:
            return None

    def resolve_user_by_username(root, info, username):
        try:
            return CustomUser.objects.get(username=username)
        except CustomUser.DoesNotExist:
            return None

    def resolve_task_by_id(root, info, id):
        try:
            return ToDo.objects.get(pk=id)
        except ToDo.DoesNotExist:
            return None

    def resolve_tasks_by_project_id(root, info, id):
        try:
            return ToDo.objects.filter(project__id=id)
        except ToDo.DoesNotExist:
            return None

    def resolve_project_by_id(root, info, id):
        try:
            return Project.objects.get(pk=id)
        except Project.DoesNotExist:
            return None

    def resolve_projects_by_username(root, info, username):
        try:
            return Project.objects.filter(users__username=username)
        except Project.DoesNotExist:
            return None


schema = graphene.Schema(query=Query)
