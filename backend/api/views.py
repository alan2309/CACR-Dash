from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Project
from .serializers import ProjectSerializer

@api_view(['GET'])
def getRoutes(request):
    routes={
        'overview':'/api/',
        'projects-list':'/api/projects/',
        'specific-project':'/api/projects/<id>',
    }
    return Response(routes)

@api_view(['GET'])
def getProjects(request):
    projects = Project.objects.all()
    serializer = ProjectSerializer(projects,many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getProject(request,pk):
    project = Project.objects.get(_id=pk)
    serializer = ProjectSerializer(project,many=False)
    return Response(serializer.data)    