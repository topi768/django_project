from rest_framework.views import APIView
from rest_framework.exceptions import NotFound
from .models import UserAccountInfo

from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import UserAccountInfo, UserAccount, CountryCodeAndCountryName, CityAndCountryCode
from .serializers import UserAccountInfoSerializer, CountryCodeAndCountryNameSerializer, CityAndCountryCodeSerializer
from rest_framework.decorators import api_view
from rest_framework.permissions import AllowAny
from rest_framework.decorators import permission_classes

class UserAccountInfoView(APIView):
    def put(self, request, *args, **kwargs):
        # Получаем email из параметров запроса
        email = request.data.get('email')
        if not email:
            return Response({"error": "email is required"}, status=status.HTTP_400_BAD_REQUEST)


        # Создаем или обновляем данные пользователя
        serializer = UserAccountInfoSerializer( data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([AllowAny])
def get_countries(request):
    countries = CountryCodeAndCountryName.objects.all()
    serializer = CountryCodeAndCountryNameSerializer(countries, many=True)
    return Response(serializer.data)
@api_view(['GET'])
@permission_classes([AllowAny])
def get_cities(request, country_code):
    print(country_code)
    try:
        cities = CityAndCountryCode.objects.filter(country_code=country_code)
        serializer = CityAndCountryCodeSerializer(cities, many=True)
        return Response(serializer.data)
    except CityAndCountryCode.DoesNotExist:
        raise NotFound(detail="Country not found")