from enum import unique

from django.contrib.auth.base_user import AbstractBaseUser
from django.db import models
from django.contrib.auth.models import AbstractUser, PermissionsMixin, BaseUserManager

# from project.new_app.views import user_list


# Create your models here.
class Room(models.Model):
    code = models.CharField(max_length=8, default="", unique=True)
    host = models.CharField(max_length=50, unique=True)
    guest_can_pause = models.BooleanField(null=False, default=False)
    votes_to_skip = models.IntegerField(null=False, default=1)
    created_at = models.DateTimeField(auto_now_add=True)





    def __str__(self):
        return self.name


from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.conf import settings


class UserAccountManager(BaseUserManager):
    def create_user(self, email, name, password=None, **extra_fields):
        if not email:
            raise ValueError('Users must have an email address')

        email = self.normalize_email(email)
        user = self.model(email=email, name=name, **extra_fields)

        user.set_password(password)
        user.save(using=self._db)
        return user



class UserAccount(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(max_length=255, unique=True)
    name = models.CharField(max_length=255)

    objects = UserAccountManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name']

    def __str__(self):
        return self.email

from rest_framework import serializers

class UserAccountInfo(models.Model):
    email = models.EmailField(max_length=255, unique=True)
    name = models.CharField(max_length=255)
    country = models.CharField(max_length=255, blank=True, null=True)  # Страна пользователя
    city = models.CharField(max_length=255, blank=True, null=True)  # Город пользователя
    interests = models.TextField(blank=True, null=True)  # Хранение интересов как строка с разделителями
    phone = models.CharField(max_length=15, blank=True, null=True)  # Необязательное поле для телефона
    date_of_birth = models.DateField(blank=True, null=True)  # Необязательное поле для даты рождения

    def __str__(self):
        return f"Account info for {self.user.email}"


class CountryCodeAndCountryName(models.Model):
    country_code = models.CharField(max_length=255, blank=True, null=False)
    country_name = models.CharField(max_length=255, blank=True, null=True)
    # country_code_number = models.BigIntegerField(blank=True, null=True, unique=True)


    # def save(self, *args, **kwargs):
    #     # Преобразуем символы country_code в их числовые эквиваленты
    #     if self.country_code:
    #         self.country_code_number = self.convert_country_code_to_number(self.country_code)
    #     super().save(*args, **kwargs)

    def convert_country_code_to_number(self, country_code):
        # Преобразуем каждый символ в его числовой код
        result = ''.join(str(ord(char) - ord('A') + 1).zfill(2) for char in country_code)
        return int(result)


class CityAndCountryCode(models.Model):
    country_code = models.CharField(max_length=255, blank=True, null=False)
    city = models.CharField(max_length=255, blank=True, null=True)
    # country_code_number = models.BigIntegerField(blank=True, null=True)
    country = models.ForeignKey(
        "CountryCodeAndCountryName",  # Связываем с другой моделью
        on_delete=models.CASCADE,
        related_name="cities",  # Название обратной связи
        blank=True,
        null=True
    )

    # def save(self, *args, **kwargs):
    #     if self.country_code:
    #         self.country_code_number = self.convert_country_code_to_number(self.country_code)
    #     super().save(*args, **kwargs)

    def convert_country_code_to_number(self, country_code):
        result = ''.join(str(ord(char) - ord('A') + 1).zfill(2) for char in country_code)
        return int(result)


    # def save(self, *args, **kwargs):
    #     # Преобразуем символы country_code в их числовые эквиваленты
    #     if self.country_code:
    #         self.country_code_number = self.convert_country_code_to_number(self.country_code)
    #     # Связываем с соответствующей записью CountryCodeAndCountryName
    #     self.country = CountryCodeAndCountryName.objects.filter(
    #         country_code_number=self.country_code_number
    #     ).first()
    #     super().save(*args, **kwargs)

    def convert_country_code_to_number(self, country_code):
        # Преобразуем каждый символ в его числовой код
        result = ''.join(str(ord(char) - ord('A') + 1).zfill(2) for char in country_code)
        return int(result)