from django.urls import path
from . import views


from django.urls import path, include, re_path
from rest_framework.routers import DefaultRouter
# from .views import ItemViewSet
from django.views.generic import TemplateView
# from rest_framework.authtoken.views import obtain_auth_token

router = DefaultRouter()
# router.register(r'items', ItemViewSet)

urlpatterns = [
    # path('', views.home),
    # path('hello/', views.say_hallo, name="hello"),
    # # path('', include(router.urls)),
    #
    # path('items/', views.get_all_items, name='get_all_items'),  # GET для всех объектов
    # path('items/<int:item_id>/', views.get_item_by_id, name='get_item_by_id'),  # GET для одного объекта по ID
    # path('items/create/', views.create_item, name='create_item'),
    #
    # path('items/universal',views.items_view_universal, name = 'items_view_universal'),
    # path('', views.Index.as_view()),
    # # path('token/', obtain_auth_token),
    # path('api/drf-auth/', include("rest_framework.urls"), name="api/drf-auth/"),
    #
    # # CRUD USER
    # path('user/user_list/', views.user_list, name='user_list'),
    # path('user/get_user_by_id/<int:user_id>', views.get_user_by_id, name='get_user_by_id'),
    # path('user/update_user/<int:user_id>', views.update_user, name='update_user'),
    # path('user/create_user/', views.create_user, name='create_user'),
    # path('user/partial_update_user/<int:user_id>', views.partial_update_user, name='partial_update_user'),
    # path('user/delete_user/<int:user_id>', views.delete_user, name='delete_user'),
    # #
    # path('register/', views.register),
    # path('login/', views.login_user),
    # path('profile/', views.profile),

    # path('auth/', include('djoser.urls')),
    # path('auth/', include('djoser.urls.jwt')),
    # path('auth/', include('djoser.social.urls')),

]
# urlpatterns += [re_path(r'^.*', TemplateView.as_view(template_name='index.html'))]
#
