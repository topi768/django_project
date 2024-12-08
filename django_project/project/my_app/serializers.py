from rest_framework import serializers
from .models import Item
from django.contrib.auth.models import User
from django.contrib.auth import get_user_model
from djoser.serializers import UserCreateSerializer
from django.contrib.auth import get_user_model

class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = ['id', 'name', 'description', 'created_at']


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


User = get_user_model()
class UserCreateSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = User
        fields = ('id', 'email','name', 'password')