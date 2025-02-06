from rest_framework.exceptions import NotFound

from rest_framework.response import Response
from .models import CountryCodeAndCountryName, CityAndCountryCode
from .serializers import CountryCodeAndCountryNameSerializer, CityAndCountryCodeSerializer
from rest_framework.decorators import api_view
from rest_framework.permissions import AllowAny
from rest_framework.decorators import permission_classes

@api_view(['GET'])
@permission_classes([AllowAny])
def get_countries(request):
    countries = CountryCodeAndCountryName.objects.all()
    serializer = CountryCodeAndCountryNameSerializer(countries, many=True)
    return Response(serializer.data)
@api_view(['GET'])
@permission_classes([AllowAny])
def get_cities(request, country_code):
    try:
        cities = CityAndCountryCode.objects.filter(country_code=country_code)
        serializer = CityAndCountryCodeSerializer(cities, many=True)
        return Response(serializer.data)
    except CityAndCountryCode.DoesNotExist:
        raise NotFound(detail="Country not found")