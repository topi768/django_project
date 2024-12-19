from django.urls import path
from .views import UserAccountInfoView

urlpatterns = [
    # Другие маршруты
    path('user/account-info/', UserAccountInfoView.as_view(), name='user_account_info'),  # Добавьте этот маршрут
]