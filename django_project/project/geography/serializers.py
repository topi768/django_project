from rest_framework import serializers
from .models import  CountryCodeAndCountryName, CityAndCountryCode

class CountryCodeAndCountryNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = CountryCodeAndCountryName
        fields = ('country_code', 'country_name')

class CityAndCountryCodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = CityAndCountryCode
        fields = ('country_code', 'city')