from django.shortcuts import render
from django.http import HttpResponse
from django.shortcuts import render

from rest_framework import viewsets
from .models import Item
from .serializers import ItemSerializer
from rest_framework.decorators import api_view


class ItemViewSet(viewsets.ModelViewSet):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer



# GET endpoint для получения всех объектов
@api_view(['GET'])
def get_all_items(request):
    items = Item.objects.all()
    serializer = ItemSerializer(items, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

# GET endpoint для получения одного объекта по ID
@api_view(['GET'])
def get_item_by_id(request, item_id):
    try:
        item = Item.objects.get(id=item_id)
        serializer = ItemSerializer(item)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Item.DoesNotExist:
        return Response({'error': 'Item not found'}, status=status.HTTP_404_NOT_FOUND)

# POST endpoint для создания нового объекта
@api_view(['POST'])
def create_item(request):
    print(request)
    serializer = ItemSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

def home(request):
    return HttpResponse("Hello, home!")


def say_hallo(request):
    return render(request, "hello.html", {'name': 'vasya'})


