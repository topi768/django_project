from django.core.management.base import BaseCommand
from django.utils import timezone
# from .models import UserAccount
from datetime import timedelta

from new_app.models import UserAccount

class Command(BaseCommand):
    help = 'Удаляет пользователей, которые были мягко удалены более 1 минуты назад'

    def handle(self, *args, **kwargs):
        threshold_time = timezone.now() - timedelta(minutes=2)
        deleted_users = UserAccount.objects.filter(deleted_at__lte=threshold_time)

        count = deleted_users.count()
        deleted_users.delete()

        self.stdout.write(self.style.SUCCESS(f"Удалено старых пользователей: {count}"))
