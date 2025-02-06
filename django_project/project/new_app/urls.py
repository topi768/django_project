from django.urls import path
from .views import UserAccountInfoView
from . import views
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin

urlpatterns = [
    path('admin/', admin.site.urls),  # URL для панели администратора

    path('user/account-info/', UserAccountInfoView.as_view(), name='user_account_info'),
    path('api/user-account-info/<int:user_id>/', views.get_user_account_info, name='user_account_info'),
    path('api/images/', views.get_images_with_coordinates, name='get-images'),
    path('api/upload/', views.upload_image, name='upload-image'),
    path('api/update-profile/', views.user_profile_update, name='update-profile'),
    path('api/get-levels/', views.get_levels, name='get-levels'),

    path('add-findcats/', views.add_find_cats, name='add_findcats'),
    path('add-points/', views.add_points, name='add_points'),

    path('achievements/', views.get_all_achievements, name='get_all_achievements'),
    path('api/my-achievements/', views.get_my_achievements, name='get_my_achievements'),

    path("get-user-stats/", views.get_user_stats, name="get_user_stats"),
    path("api/get-user-id-by-email/<str:email>/", views.getUser_idByEmail, name="get_user_id_by_email"),
    path("api/delete-user-soft/", views.delete_account_soft, name="delete_user_soft"),

    path('api/get_leaderboard/', views.get_leaderboard, name='get_leaderboard'),
    path('api/get-my-place-in-ranking', views.get_my_palce_in_ranking, name="get_my_palce_in_ranking" )
]
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
