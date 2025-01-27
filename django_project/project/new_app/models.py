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

    def create_superuser(self, email, name, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        return self.create_user(email, name, password, **extra_fields)

class UserAccount(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(max_length=255, unique=True)
    name = models.CharField(max_length=255)
    is_staff = models.BooleanField(default=False)  # Добавлено поле is_staff
    is_active = models.BooleanField(default=True)  # Добавлено поле is_active
    is_superuser = models.BooleanField(default=False)  # Добавлено поле is_superuser

    objects = UserAccountManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name']

    def __str__(self):
        return self.email

class Achievement(models.Model):
    name = models.CharField(max_length=255)  # Название достижения
    description = models.TextField(blank=True, null=True)  # Описание достижения
    created_at = models.DateTimeField(auto_now_add=True)  # Дата создания

    def __str__(self):
        return self.name


class UserAccountInfo(models.Model):
    user = models.OneToOneField(
        "UserAccount",
        on_delete=models.CASCADE,
        related_name="info"
    )
    email = models.EmailField(max_length=255, unique=True)
    name = models.CharField(max_length=255)
    country = models.CharField(max_length=255, blank=True, null=True)  # Страна пользователя
    city = models.CharField(max_length=255, blank=True, null=True)  # Город пользователя
    interests = models.TextField(blank=True, null=True)  # Хранение интересов как строка с разделителями
    phone = models.CharField(max_length=15, blank=True, null=True)  # Необязательное поле для телефона
    date_of_birth = models.DateField(blank=True, null=True)  # Необязательное поле для даты рождения

    # game
    countFindCats = models.IntegerField(default=0)
    points = models.IntegerField(default=0)
    rank = models.IntegerField(default=0)

    # Связь с достижениями
    achievements = models.ManyToManyField(Achievement, related_name="users", blank=True)


    def __str__(self):
        return f"Account info for {self.user.email}"


class CountryCodeAndCountryName(models.Model):
    country_code = models.CharField(max_length=255, blank=True, null=False)
    country_name = models.CharField(max_length=255, blank=True, null=True)

    def __str__(self):
        return f"{self.country_name} ({self.country_code})"

class CityAndCountryCode(models.Model):
    country_code = models.CharField(max_length=255, blank=True, null=False)
    city = models.CharField(max_length=255, blank=True, null=True)
    country = models.ForeignKey(
        "CountryCodeAndCountryName",  # Связываем с другой моделью
        on_delete=models.CASCADE,
        related_name="cities",  # Название обратной связи
        blank=True,
        null=True
    )
    def __str__(self):
        return f"{self.country_code} ({self.city})"


class ImageWithCoordinates(models.Model):
    image = models.ImageField(upload_to='images/')  # Поле для хранения пути к изображению
    coordinates = models.JSONField()  # Хранение координат в формате JSON

    level = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)  # Автоматическое добавление дат