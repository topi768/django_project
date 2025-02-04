from django.core.management.base import BaseCommand, CommandError
from django.core.management import call_command

class Command(BaseCommand):
    help = "Импортирует сначала страны, затем города"

    def handle(self, *args, **kwargs):
        try:
            self.stdout.write(self.style.SUCCESS("Запускаем импорт стран..."))
            call_command("country")  # Запускаем первую команду
            
            self.stdout.write(self.style.SUCCESS("Страны импортированы. Запускаем импорт городов..."))
            call_command("import_cities")  # Запускаем вторую команду

            self.stdout.write(self.style.SUCCESS("Импорт городов завершен."))

        except CommandError as e:
            self.stderr.write(self.style.ERROR(f"Ошибка: {e}"))
