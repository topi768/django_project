from django.urls import path
from .views import UserAccountInfoView
from . import views
urlpatterns = [
    path('user/account-info/', UserAccountInfoView.as_view(), name='user_account_info'),
    path('api/countryList', views.get_countries, name='get_countries'),
    path('api/cities/<str:country_code>', views.get_cities, name='get_cities'),

]