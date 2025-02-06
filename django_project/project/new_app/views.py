from rest_framework.views import APIView
from rest_framework.exceptions import NotFound
from .models import UserAccountInfo

from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import UserAccountInfo, Achievement, ImageWithCoordinates
from .serializers import LeaderboardUserSerializer, UserAccountInfoSerializer,ImageWithCoordinatesSerializer,  UserProfileUpdateSerializer
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
def add_find_cats(request):
    try:
        user = request.user
        user_id = user.id
        increment_value = int(request.data.get('increment', 1))  # Если не передано, увеличиваем на 1 по умолчанию

        user_info = UserAccountInfo.objects.get(user_id=user_id)
        user_info.countFindCats += increment_value
        user_info.save()
        # 
        # Проверяем, может ли пользователь получить новые достижения
        achievements = list(Achievement.objects.all())
        for ach in achievements:
            if user_info.countFindCats >= ach.maxProgress:
                user_info.achievements.add(ach)
                user_info.save()
            else:
                print(f"{user_info.countFindCats} не достигает {ach.maxProgress}")

        return Response({
            "message": "FindCats updated successfully", 
        })
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
def add_points(request):
    try:
        user = request.user
        user_id = user.id
        # Извлекаем количество, на которое нужно увеличить количество найденных котов
        increment_value = int( request.data.get('increment', 1))  # Если не передано, увеличиваем на 1 по умолчанию

        # Получаем пользователя
        user_info = UserAccountInfo.objects.get(user_id=user_id)
        
        # Добавляем переданное количество найденных котов
        user_info.points += increment_value

        user_info.save()

        return Response({
            "message": "FindCats updated successfully",
        }, status=status.HTTP_200_OK)
    
    except UserAccountInfo.DoesNotExist:
        return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
    

@api_view(['GET'])
@permission_classes([AllowAny])  # Путь доступен всем
def get_all_achievements(request):
    achievements = Achievement.objects.all()
    achievement_data = [
        {"id": achievement.id, 
         "name": achievement.name, 
         "description": achievement.description,
        "maxProgress": achievement.maxProgress}
        for achievement in achievements
    ]
    return Response(achievement_data, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated]) 
def get_my_achievements(request):
    try:
        user_id = request.user.id
        print(user_id)
        # Получаем информацию о пользователе
        user_info = UserAccountInfo.objects.get(user_id=user_id)
        count_find_cats = user_info.countFindCats
        # Получаем все достижения, связанные с этим пользователем
        achievements = user_info.achievements.all()

        achievement_data = [
            {
            "id": achievement.id,
             "name": achievement.name,
             "description": achievement.description,
             "maxProgress": achievement.maxProgress,
             "currentProgress": count_find_cats
             
             }
            for achievement in achievements
        ]
        
        return Response(achievement_data, status=status.HTTP_200_OK)

    except UserAccountInfo.DoesNotExist:
        return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
    

@api_view(['GET'])
@permission_classes([IsAuthenticated]) 
def get_user_stats(request):
    try:
        print("111")
        user_id =  request.user.id
        
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

@api_view(["GET"])
@permission_classes([AllowAny])
def get_leaderboard(request):
    users = UserAccountInfo.objects.all().order_by('-points')
    serializer = LeaderboardUserSerializer(users, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_my_palce_in_ranking(request):
    user_id = request.user.id

    users = UserAccountInfo.objects.order_by('-points').values_list('user_id', flat=True)
    try:
        # Определяем индекс текущего пользователя (начинается с 0, поэтому +1)
        rank = list(users).index(user_id) + 1
        return Response(rank, status=status.HTTP_200_OK)
    except ValueError:
        return Response({"error": "User not found in ranking"}, status=status.HTTP_404_NOT_FOUND)