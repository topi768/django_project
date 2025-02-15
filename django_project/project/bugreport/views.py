from django.utils.timezone import now
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view, parser_classes
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from .models import BugReport
from .serializers import BugReportSerializer

MAX_REPORTS_PER_DAY = 5  # Максимальное количество заявок в день

@api_view(['POST'])
@parser_classes([MultiPartParser, FormParser, JSONParser])
def create_bug_reports(request):
    user = request.user  # Получаем пользователя
    today = now().date()  # Получаем текущую дату

    # Считаем количество заявок, отправленных сегодня
    reports_today = BugReport.objects.filter(user=user, created_at__date=today).count()

    # Проверяем лимит
    if reports_today >= MAX_REPORTS_PER_DAY:
        return Response({"error": "Вы достигли дневного лимита заявок."}, status=status.HTTP_429_TOO_MANY_REQUESTS)

    # Оборачиваем данные в список, если пришёл одиночный объект
    data = request.data if isinstance(request.data, list) else [request.data]
    
    serializer = BugReportSerializer(data=data, many=True, context={'request': request})
    if serializer.is_valid():
        serializer.save(user=user)  # Привязываем пользователя
        return Response(serializer.data, status=status.HTTP_201_CREATED)