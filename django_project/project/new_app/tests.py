from rest_framework import status
from rest_framework.test import APITestCase
from colorama import Fore, Back, Style, init

# Инициализируем colorama
init(autoreset=True)

class UserRegistrationTestCase(APITestCase):

    def test_successful_registration(self):
        """Тест успешной регистрации нового пользователя"""
        print(Fore.CYAN + "Тест успешной регистрации нового пользователя")  # Заголовок теста в голубом цвете

        data = {
            "email": "topi768@inbox.ru",
            "name": "John Doe",
            "password": "SecureP@ss123",
            "re_password": "SecureP@ss123",
            "country": "USA",
            "city": "New York",
            "phone": "1234567890",
            "date_of_birth": "1990-01-01"
        }
        response = self.client.post('/auth/users/', data, format='json')

        # Печать результата с цветом
        if response.status_code == status.HTTP_201_CREATED:
            print(Fore.GREEN + "Регистрация прошла успешно!")
        else:
            print(Fore.RED + f"Ошибка регистрации: {response.status_code}")

        # Проверка, что статус ответа 201 (создано)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
