from django.urls import path
from . import views

urlpatterns = [
    path('',views.getRoutes,name='api-overview'),
    path('projects/',views.getProjects,name='projects-list'),
    path('projects/<str:pk>',views.getProject,name='specific-project'),
]
