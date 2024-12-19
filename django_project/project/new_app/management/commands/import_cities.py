
import re
from django.core.management.base import BaseCommand
from new_app.models import CityAndCountryCode, CountryCodeAndCountryName

def convert_country_code_to_number(country_code):
    # Преобразуем каждый символ в его числовой код
    result = ''.join(str(ord(char) - ord('A') + 1).zfill(2) for char in country_code)
    return int(result)
class Command(BaseCommand):
    help = "Импорт городов из файла cities15000.txt в базу данных"

    def clear_database(self):
        CityAndCountryCode.objects.all().delete()
        self.stdout.write("Таблица 'cities' очищена.")

    def find_valid_names(self, text):
        pattern = r'\b[А-ЯЁ][а-яё]*(-[А-ЯЁ][а-яё]*)*\b'
        return re.findall(pattern, text)

    def handle(self, *args, **kwargs):
        import os

        file_path = os.path.join(os.path.dirname(__file__), "cities15000.txt")

        if not CityAndCountryCode._meta.db_table:
            self.stdout.write("Таблица 'cities' не найдена. Убедитесь, что миграции выполнены.")
            return

        self.clear_database()

        n = 0
        try:
            with open(file_path, "r", encoding="utf-8") as file:
                for line in file:
                    if n >= 30000000000000000000000:
                        break

                    parts = line.split('\t')
                    country_code = parts[-11]
                    alternatenames = parts[3]

                    for name in alternatenames.split(','):
                        if self.find_valid_names(name):
                            russian_name = name

                            country_instance, created = CountryCodeAndCountryName.objects.get_or_create(
                                country_code=country_code,

                            )

                            # Создаем объект CityAndCountryCode
                            CityAndCountryCode.objects.create(
                                country_code=country_code,
                                city=russian_name,
                                country=country_instance,  # Ссылка на ForeignKey
                            )
                            n += 1

            self.stdout.write(f"Импорт завершён. Обработано {n} строк.")
        except FileNotFoundError:
            self.stdout.write(f"Файл {file_path} не найден.")
        except Exception as e:
            self.stdout.write(f"Произошла ошибка: {e}")