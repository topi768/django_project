from django.contrib import admin
# Register your models here.
from django.contrib import admin
from .models import ImageWithCoordinates

@admin.register(ImageWithCoordinates)
class ImageWithCoordinatesAdmin(admin.ModelAdmin):
    list_display = ('id', 'image', 'width', 'height')