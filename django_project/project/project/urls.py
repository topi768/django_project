
from django.urls import path, include, re_path
from django.views.generic import TemplateView
urlpatterns = [
    # path('admin/', admin.site.urls),
    # path('', include('my_app.urls')),
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
    path('auth/', include('djoser.social.urls')),
    path('', include('new_app.urls')),
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
    path('auth/', include('djoser.social.urls')),

    re_path(r'^auth/', include('djoser.urls')),
    re_path(r'^auth/', include('djoser.urls.jwt')),
    # path('auth/', include(djoser_urls)),
    path('', include('geography.urls')),
]
# urlpatterns += [re_path(r'^.*', TemplateView.as_view(template_name='index.html'))]