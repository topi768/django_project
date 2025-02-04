
import re
from django.core.management.base import BaseCommand
from geography.models import CityAndCountryCode, CountryCodeAndCountryName
from transliterate import translit

import re

def is_russian_name(name: str) -> bool:
    if not name.strip():  # Проверка на пустую строку
        return False
    allowed_chars = 'йцукенгшщзхъфывапролджэячсмитьбюеЙЦУКЕНГШЩЗХЪФЫВАПРОЛДЖЭЯЧСМИТЬБЮ-'
    return all(char in allowed_chars for char in name)

class Command(BaseCommand):
    help = "Импорт городов из файла cities15000.txt в базу данных"

    def clear_database(self):
        CityAndCountryCode.objects.all().delete()
        self.stdout.write("Таблица 'cities' очищена.")


        return True
    def handle(self, *args, **kwargs):
        import os

        file_path = os.path.join(os.path.dirname(__file__), "cities15000.txt")
        file_path_ru_cities = os.path.join(os.path.dirname(__file__),'ru_cities.txt')

        if not CityAndCountryCode._meta.db_table:
            self.stdout.write("Таблица 'cities' не найдена. Убедитесь, что миграции выполнены.")
            return

        self.clear_database()

        n = 0
        try:
            with open(file_path_ru_cities, "r", encoding="utf-8") as ru_file:
                for ru_line in ru_file:
                    transliterated_word = ru_line

                    country_instance, created = CountryCodeAndCountryName.objects.get_or_create(country_code='RU',)

                    CityAndCountryCode.objects.create(
                        country_code='RU',
                        city=transliterated_word,
                        country=country_instance,
                    )
            with open(file_path, "r", encoding="utf-8") as file:
                for line in file:
                    if n >= 3000000000000000000000000000000000000:
                        break

                    parts = line.split('\t')
                    country_code = parts[-11]
                    alternate_names = parts[3].split(',')
                    name_en = parts[1]

                    if country_code == 'RU':
                        continue

                    city_name = translit(name_en, 'ru')
                    if not(is_russian_name(city_name)):
                        continue
                    if alternate_names:
                        for alter_name in alternate_names:
                            if is_russian_name(alter_name) :
                                city_name = alter_name
                                break

                    country_instance, created = CountryCodeAndCountryName.objects.get_or_create(country_code=country_code,)
                    CityAndCountryCode.objects.create(
                        country_code=country_code,
                        city=city_name,
                        country=country_instance, 
                    )
                    n += 1

            self.stdout.write(f"Импорт завершён. Обработано {n} строк.")
        except FileNotFoundError:
            self.stdout.write(f"Файл {file_path} не найден.")
        except Exception as e:
            self.stdout.write(f"Произошла ошибка: {e}")