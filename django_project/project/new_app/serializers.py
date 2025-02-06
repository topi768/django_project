from rest_framework import serializers
from django.contrib.auth.models import User
from djoser.serializers import UserCreateSerializer as BaseUserCreateSerializer
from django.contrib.auth import get_user_model
from .models import UserAccount,Achievement, ImageWithCoordinates,  UserAccountInfo
from rest_framework.views import APIView




from django.contrib.auth import get_user_model
User = get_user_model()
class UserCreateSerializer(BaseUserCreateSerializer):
    # Добавляем поля из `UserAccountInfo`
    country = serializers.CharField(required=False, allow_blank=True)
    city = serializers.CharField(required=False, allow_blank=True)
    phone = serializers.CharField(required=False, allow_blank=True)
    date_of_birth = serializers.DateField(required=False, allow_null=True)
    interests = serializers.CharField(required=False, allow_blank=True)
    class Meta(BaseUserCreateSerializer.Meta):
        model = UserAccount
        fields = (
            "id",
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
        info_fields = {
            "country": validated_data.pop("country", None),
            "city": validated_data.pop("city", None),
            "phone": validated_data.pop("phone", None),
            "date_of_birth": validated_data.pop("date_of_birth", None),
            "interests": validated_data.pop("interests", None),
        }

        user = UserAccount.objects.create_user(
            email=validated_data["email"],
            name=validated_data["name"],
            password=validated_data["password"],
        )

        UserAccountInfo.objects.create(user=user, **info_fields)

        return user


class AchievementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Achievement
        fields = ('id', 'name', 'description')

class UserAccountInfoSerializer(serializers.ModelSerializer):
    achievements = AchievementSerializer(many=True)  # Включаем достижения

    class Meta:
        model = UserAccountInfo
        fields = (
            'email', 'name', 'country', 'city', 'interests',
            'phone', 'date_of_birth', 'achievements', 'points', 'rank'
        )



class ImageWithCoordinatesSerializer(serializers.ModelSerializer):

    level = serializers.IntegerField()
    class Meta:
        model = ImageWithCoordinates
        fields = ['id', 'image', 'coordinates', 'created_at', 'level']



from rest_framework import serializers
from .models import UserAccountInfo


class UserProfileUpdateSerializer(serializers.Serializer):
    name = serializers.CharField(required=False, allow_blank=True)
    country = serializers.CharField(required=False, allow_blank=True)  # Используем поле 'country'
    city = serializers.CharField(required=False, allow_blank=True)
    date_of_birth = serializers.DateField(required=False, allow_null=True)
    phone = serializers.CharField(required=False, allow_blank=True)

    def update(self, user_info, validated_data):
        user_info.name = validated_data.get('name', user_info.name)
        user_info.country = validated_data.get('country', user_info.country)  # Обновляем поле 'country'
        user_info.city = validated_data.get('city', user_info.city)
        user_info.date_of_birth = validated_data.get('date_of_birth', user_info.date_of_birth)
        user_info.phone = validated_data.get('phone', user_info.phone)
        user_info.save()
        return user_info


class LeaderboardUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAccountInfo
        fields = ['name', 'points', 'rank', 'id']