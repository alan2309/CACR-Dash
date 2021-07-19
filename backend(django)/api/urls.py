from django.urls import path
from . import views

urlpatterns = [
    path('users/login/', views.MyTokenObtainPairView.as_view(), name='user-login'),
    path('users/register/', views.registerUser, name='use-registration'),
    path('users/profile/',views.getUserProfile,name='user-profile'),
    path('users/',views.getUsers,name='users'),
    path('',views.getRoutes,name='api-overview'),
    path('projects/',views.getProjects,name='projects-list'),
    path('projects/<str:pk>',views.getProject,name='specific-project'),
]