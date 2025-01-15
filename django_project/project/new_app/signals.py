from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import UserAccount, UserAccountInfo

@receiver(post_save, sender=UserAccount)
def create_user_info(sender, instance, created, **kwargs):
    if created:
        UserAccountInfo.objects.create(
            user=instance,
            email=instance.email,
            name=instance.name,

        )
