import re
from django.core.management.base import BaseCommand
from new_app.models import CountryCodeAndCountryName


def convert_country_code_to_number(country_code):
    # Преобразуем каждый символ в его числовой код
    result = ''.join(str(ord(char) - ord('A') + 1).zfill(2) for char in country_code)
    return int(result)
class Command(BaseCommand):
    help = "Импорт городов из файла  в базу данных"

    def clear_database(self):
        CountryCodeAndCountryName.objects.all().delete()
        self.stdout.write("Таблица 'cities' очищена.")


    def handle(self, *args, **kwargs):
        import os

        file_path = os.path.join(os.path.dirname(__file__), "country.txt")

        if not CountryCodeAndCountryName._meta.db_table:
            self.stdout.write("Таблица не найдена. Убедитесь, что миграции выполнены.")
            return

        self.clear_database()

        n = 0
        try:
            with open(file_path, "r", encoding="utf-8") as file:
                for line in file:
                    if n >= 3000000:
                        break

                    parts = line.split(' ')
                    code = parts[0]
                    name = parts[1].replace('\n', "")

                    CountryCodeAndCountryName.objects.create(
                        country_code=code,
                        country_name=name,
                        # country_code_number = convert_country_code_to_number(code),
                    )
                    # print(code, name)
                    n += 1



            self.stdout.write(f"Импорт завершён. Обработано {n} строк.")
        except FileNotFoundError:
            self.stdout.write(f"Файл {file_path} не найден.")
        except Exception as e:
            self.stdout.write(f"Произошла ошибка: {e}")