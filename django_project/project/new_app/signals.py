from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import UserAccount, UserAccountInfo
from djoser.signals import user_registered
import logging
logger = logging.getLogger(__name__)

@receiver(post_save, sender=UserAccount)
def create_user_info(sender, instance, created, **kwargs):
    if created:
        UserAccountInfo.objects.create(
            user=instance,
            email=instance.email,
            name=instance.name,

        )

@receiver(user_registered)
def log_user_registration(sender, user, request, **kwargs):
    # Извлекаем данные из запроса
    data = request.data
    email = data['email']
    name = data['name']
    country = data['country']
    city = data['city']
    phone = data['phone']
    date_of_birth = data['date_of_birth']

    account_info = UserAccountInfo.objects.filter(user__email=email).first()
    if account_info:
        # Если запись найдена, обновляем её
        account_info.name = name
        account_info.country = country
        account_info.city = city
        account_info.phone = phone
        account_info.date_of_birth = date_of_birth
        account_info.save()
        print(f"Updated UserAccountInfo for email: {email}")
    else:
        # Если записи нет, создаём новую
        UserAccountInfo.objects.create(
            user=user,
            country=country,
            city=city,
            phone=phone,
            date_of_birth=date_of_birth,
        )