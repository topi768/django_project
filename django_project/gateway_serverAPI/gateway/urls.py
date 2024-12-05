from django.urls import path
from . import views

urlpatterns = [
    path('', views.gateway_home, name='gateway_home'),
    path('<path:path>/', views.gateway_view, name='gateway'),
]