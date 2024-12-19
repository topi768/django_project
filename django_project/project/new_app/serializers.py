from rest_framework import serializers
from django.contrib.auth.models import User
from djoser.serializers import UserCreateSerializer
from django.contrib.auth import get_user_model
from .models import UserAccount

from djoser.serializers import UserCreateSerializer as DjoserUserCreateSerializer
from rest_framework import serializers
from .models import UserAccount


# class UserSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = User
#         fields = ['id', 'username','password', 'email', 'first_name', 'last_name', 'is_active', 'date_joined']
#         read_only_fields = ['id', 'date_joined']
#     username = serializers.CharField(required=True)
#     password = serializers.CharField(write_only=True, required=True)#password добавлен с флагом write_only=True, чтобы это поле не возвращалось в ответах API
#     email = serializers.EmailField(required=False)
#     first_name = serializers.CharField(required=False)
#     last_name = serializers.CharField(required=False)


from djoser.serializers import UserCreateSerializer
from django.contrib.auth import get_user_model
User = get_user_model()

class UserCreateSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = User
        fields = ( 'email', 'name', 'password')
    def create(self, validated_data):
        # Создание пользователя (User)
        user = User.objects.create_user(**validated_data)


from .models import UserAccountInfo


class UserAccountInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAccountInfo
        fields = (
            'email', 'name', 'country', 'city', 'interests',
            'phone', 'date_of_birth'
        )

