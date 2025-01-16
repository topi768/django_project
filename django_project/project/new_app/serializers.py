from rest_framework import serializers
from django.contrib.auth.models import User
from djoser.serializers import UserCreateSerializer as BaseUserCreateSerializer
from django.contrib.auth import get_user_model
from .models import UserAccount,ImageWithCoordinates,  UserAccountInfo, CountryCodeAndCountryName, CityAndCountryCode




from django.contrib.auth import get_user_model
User = get_user_model()
class UserCreateSerializer(BaseUserCreateSerializer):
    # Добавляем поля из `UserAccountInfo`
    country = serializers.CharField(required=False, allow_blank=True)
    city = serializers.CharField(required=False, allow_blank=True)
    phone = serializers.CharField(required=False, allow_blank=True)
    date_of_birth = serializers.DateField(required=False, allow_null=True)
    interests = serializers.CharField(required=False, allow_blank=True)
    print(interests)
    class Meta(BaseUserCreateSerializer.Meta):
        model = UserAccount
        fields = (
            "email",
            "name",
            "password",
            "country",
            "city",
            "phone",
            "date_of_birth",
            "interests",
        )

    def create(self, validated_data):
        # Извлекаем данные для `UserAccountInfo`
        info_fields = {
            "country": validated_data.pop("country", None),
            "city": validated_data.pop("city", None),
            "phone": validated_data.pop("phone", None),
            "date_of_birth": validated_data.pop("date_of_birth", None),
            "interests": validated_data.pop("interests", None),
        }

        # Создаем пользователя
        user = UserAccount.objects.create_user(
            email=validated_data["email"],
            name=validated_data["name"],
            password=validated_data["password"],
        )

        # Создаем запись в `UserAccountInfo`
        UserAccountInfo.objects.create(user=user, **info_fields)

        return user


class UserAccountInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAccountInfo
        fields = (
            'email', 'name', 'country', 'city', 'interests',
            'phone', 'date_of_birth'
        )

class CountryCodeAndCountryNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = CountryCodeAndCountryName
        fields = ('country_code', 'country_name')

class CityAndCountryCodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = CityAndCountryCode
        fields = ('country_code', 'city')

class ImageWithCoordinatesSerializer(serializers.ModelSerializer):
    width = serializers.IntegerField()
    height = serializers.IntegerField()
    level = serializers.IntegerField()
    class Meta:
        model = ImageWithCoordinates
        fields = ['id', 'image', 'coordinates', 'created_at', 'width', 'height', 'level']