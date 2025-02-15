# bugreport/urls.py
from django.urls import path
from .views import create_bug_reports

urlpatterns = [
    path('create/', create_bug_reports, name='bugreport-create'),
]
