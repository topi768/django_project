from django.urls import path
from .views import UserAccountInfoView
from . import views
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin

urlpatterns = [
    path('admin/', admin.site.urls),  # URL для панели администратора

    path('user/account-info/', UserAccountInfoView.as_view(), name='user_account_info'),
    path('api/countryList', views.get_countries, name='get_countries'),
    path('api/cities/<str:country_code>', views.get_cities, name='get_cities'),
    path('api/user-account-info/<int:user_id>/', views.get_user_account_info, name='user_account_info'),
    path('api/images/', views.get_images_with_coordinates, name='get-images'),
    path('api/upload/', views.upload_image, name='upload-image'),
    path('api/update-profile/', views.user_profile_update, name='update-profile'),
    path('api/get-levels/', views.get_levels, name='get-levels'),

    path('add-findcats/<int:user_id>/', views.add_find_cats, name='add_findcats'),
    path('add-points/<int:user_id>/', views.add_points, name='add_points'),
]
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
