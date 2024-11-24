from django.shortcuts import render
from django.http import HttpResponse
from django.shortcuts import render, redirect

from rest_framework import viewsets
from .models import Item
from .serializers import ItemSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import SessionAuthentication

class ItemViewSet(viewsets.ModelViewSet):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer

class Index(APIView):
    permission_classes = (IsAuthenticated,)
    authentication_classes = (SessionAuthentication,)

    def get(self, request):
        content = {'message': 'Hello, World!'}
        return Response(content)


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
    serializer = ItemSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST', 'GET'])
def items_view_universal(request):
    if request.method =='GET':
        items = Item.objects.all()
        serializer = ItemSerializer(items, many=True)
        return   Response(serializer.data, status=status.HTTP_200_OK)
    if request.method == 'POST':
        serializer = ItemSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return redirect('/items')
            # return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

def home(request):
    return HttpResponse("Hello, home!")


def say_hallo(request):
    return render(request, "hello.html", {'name': 'vasya'})

#
# import requests
#
# url = 'http://127.0.0.1:8000/token/'
#
# r = requests.get(url, headers={
#   'Authorization': 'Token 76b8487f98a50da9f0e800e38b286ec6460feba8'
#   }
# )