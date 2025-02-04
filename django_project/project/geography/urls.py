from django.urls import path
from . import views
urlpatterns = [
    path('api/countryList', views.get_countries, name='get_countries'),
    path('api/cities/<str:country_code>', views.get_cities, name='get_cities'),
]

