from django.apps import AppConfig
from django.db.models import base


class ApiConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'api'
    def ready(self):
        import api.signals

