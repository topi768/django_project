from rest_framework.views import APIView
from rest_framework.exceptions import NotFound
from .models import UserAccountInfo

from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import UserAccountInfo, Achievement, ImageWithCoordinates, CountryCodeAndCountryName, CityAndCountryCode
from .serializers import UserAccountInfoSerializer,ImageWithCoordinatesSerializer,  UserProfileUpdateSerializer, CountryCodeAndCountryNameSerializer, CityAndCountryCodeSerializer
from rest_framework.decorators import api_view
from rest_framework.permissions import AllowAny,IsAuthenticated
from rest_framework.decorators import permission_classes
from .models import ImageWithCoordinates
from .serializers import ImageWithCoordinatesSerializer

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
    try:
        cities = CityAndCountryCode.objects.filter(country_code=country_code)
        serializer = CityAndCountryCodeSerializer(cities, many=True)
        return Response(serializer.data)
    except CityAndCountryCode.DoesNotExist:
        raise NotFound(detail="Country not found")
@api_view(['GET'])
@permission_classes([AllowAny])
def get_user_account_info(request, user_id):
    try:
        user_account_info = UserAccountInfo.objects.get(user_id=user_id)

    except:
        return Response({"detail": "User account info not found."}, status=status.HTTP_404_NOT_FOUND)
    serializer = UserAccountInfoSerializer(user_account_info)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([AllowAny])
def get_images_with_coordinates(request):
    """Возвращает список всех изображений и координат."""
    if request.method == 'GET':
        images = ImageWithCoordinates.objects.all()  # Получаем все записи
        serializer = ImageWithCoordinatesSerializer(images, many=True)  # Сериализуем данные
        return Response(serializer.data)

@api_view(['POST'])
@permission_classes([AllowAny])
def upload_image(request):
    """Обработка загрузки изображения и координат."""
    serializer = ImageWithCoordinatesSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["PATCH"])
def user_profile_update(request):
    user = request.user

    if not user.is_authenticated:
        return Response({"detail": "User not authenticated"}, status=401)

    # Получаем имя пользователя из запроса, если оно передано
    new_username = request.data.get("name")
    # Если имя передано, обновляем в таблице `User`
    if new_username:
        user.name = new_username
        user.save()

    # Обновляем информацию в `UserAccountInfo`
    try:
        user_info = user.info  # Используем related_name="info"
    except UserAccountInfo.DoesNotExist:
        return Response({"detail": "User info not found"}, status=404)

    serializer = UserProfileUpdateSerializer(user_info, data=request.data, partial=True)
    
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=200)

    return Response(serializer.errors, status=400)

@api_view(['GET'])
@permission_classes([AllowAny])
def get_levels(request):
    serializer = ImageWithCoordinatesSerializer(ImageWithCoordinates.objects.all(), many=True)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([AllowAny])
def add_find_cats(request, user_id):
    try:
        # Извлекаем количество, на которое нужно увеличить количество найденных котов
        increment_value = request.data.get('increment', 1)  # Если не передано, увеличиваем на 1 по умолчанию

        # Получаем пользователя
        user_info = UserAccountInfo.objects.get(user_id=user_id)
        
        # Добавляем переданное количество найденных котов
        user_info.countFindCats += increment_value
        user_info.save()

        # Добавляем достижения, если условия выполнены
        user_info.add_achievement()

        return Response({
            "message": "FindCats updated successfully",
            "countFindCats": user_info.countFindCats,
            "achievements": [achievement.name for achievement in user_info.achievements.all()]  # Возвращаем список достижений
        }, status=status.HTTP_200_OK)
    
    except UserAccountInfo.DoesNotExist:
        return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)


RANKS = [
    {"name": "Сержант Кискисенко", "min_points": 0},
    {"name": "Исследователь", "min_points": 100},
    {"name": "Охотник", "min_points": 200},
    {"name": "Мастер Котов", "min_points": 300},
    {"name": "Легенда Котов", "min_points": 500},
    {"name": "Кото-Бог", "min_points": 700},
    {"name": "Великий Кото-Властелин", "min_points": 1000},
]

@api_view(['POST'])
@permission_classes([AllowAny])
def add_points(request, user_id):
    try:
        # Извлекаем количество, на которое нужно увеличить количество найденных котов
        increment_value = request.data.get('increment', 1)  # Если не передано, увеличиваем на 1 по умолчанию

        # Получаем пользователя
        user_info = UserAccountInfo.objects.get(user_id=user_id)
        
        # Добавляем переданное количество найденных котов
        user_info.points += increment_value
        user_info.save()

        return Response({
            "message": "FindCats updated successfully",
            "countFindCats": user_info.countFindCats
        }, status=status.HTTP_200_OK)
    
    except UserAccountInfo.DoesNotExist:
        return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
    

@api_view(['GET'])
@permission_classes([AllowAny])  # Путь доступен всем
def get_all_achievements(request):
    achievements = Achievement.objects.all()
    achievement_data = [
        {"id": achievement.id, "name": achievement.name, "description": achievement.description, "currentProgress": achievement.currentProgress, "maxProgress": achievement.maxProgress}
        for achievement in achievements
    ]
    return Response(achievement_data, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([AllowAny])  # Этот путь доступен только для авторизованных пользователей
def get_user_achievements(request, user_id):
    try:
        # Получаем информацию о пользователе
        user_info = UserAccountInfo.objects.get(user_id=user_id)
        # Получаем все достижения, связанные с этим пользователем
        achievements = user_info.achievements.all()

        achievement_data = [
            {"id": achievement.id, "name": achievement.name, "description": achievement.description}
            for achievement in achievements
        ]
        
        return Response(achievement_data, status=status.HTTP_200_OK)

    except UserAccountInfo.DoesNotExist:
        return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
    

@api_view(['GET'])
@permission_classes([AllowAny])
def get_user_stats(request, user_id):
    try:
        # Получаем информацию о пользователе
        user_info = UserAccountInfo.objects.get(user_id=user_id)
        
        # Возвращаем статистику пользователя
        return Response({
            "message": "User stats retrieved successfully",
            "countFindCats": user_info.countFindCats,
            "points": user_info.points,
            "kisKis": user_info.kisKis
        }, status=status.HTTP_200_OK)
    
    except UserAccountInfo.DoesNotExist:
        return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
    
@api_view(['GET'])
def getUser_idByEmail(request, email):
    try:
        user = UserAccountInfo.objects.get(email=email)
        return Response({"user_id": user.user_id}, status=status.HTTP_200_OK)
    except UserAccountInfo.DoesNotExist:
        return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
    

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def delete_account_soft(request):
    user = request.user
    user.soft_delete() 
    return Response({"detail": "Account marked for deletion. You can restore it within 30 days."}, status=200)