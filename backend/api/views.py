from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework.decorators import api_view,permission_classes
from .models import Project
from .serializers import ProjectSerializer,UserSerializer,UserSerializerWithToken
from rest_framework.permissions import IsAdminUser,IsAuthenticated

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth.hashers import make_password
from rest_framework import status

@api_view(['GET'])
def getRoutes(request):
    routes={
        'overview':'/api/',
        'projects-list':'/api/projects/',
        'specific-project':'/api/projects/<id>',
        'All users':'/api/users',
        'users-profile':'/api/users/profile/',
        'login':'/api/users/login/'
    }
    return Response(routes)

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self,attrs):
        data = super().validate(attrs)
        serializer = UserSerializerWithToken(self.user).data

        for k,v in serializer.items():
            data[k] = v
        return data

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

@api_view(['POST'])
def registerUser(request):

    try:
        data = request.data
        user = User.objects.create(
            first_name = data['name'],
            username = data['email'],
            email = data['email'],
            password = make_password(data['password'])
        )
        serializer = UserSerializerWithToken(user,many=False)
        return Response(serializer.data)
    except:
        message = {'Details':'User with this email already exists'}
        return Response(message,status=status.HTTP_400_BAD_REQUEST)    

@api_view(['GET'])
def getUserProfile(request):
    user = request.user 
    serializer = UserSerializer(user,many=False)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAdminUser])
def getUsers(request):
    users = User.objects.all()
    serializer = UserSerializer(users,many=True)
    return Response(serializer.data)

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
