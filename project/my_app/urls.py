from django.urls import path
from . import views


from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ItemViewSet

router = DefaultRouter()
router.register(r'/items', ItemViewSet)

urlpatterns = [
    path('', views.home),
    path('hello/', views.say_hallo),
    path('', include(router.urls)),

    path('items/', views.get_all_items, name='get_all_items'),  # GET для всех объектов
    path('items/<int:item_id>/', views.get_item_by_id, name='get_item_by_id'),  # GET для одного объекта по ID
    path('items/create/', views.create_item, name='create_item'),

    path('items/universal',views.items_view_universal, name = 'items_view_universal')
]