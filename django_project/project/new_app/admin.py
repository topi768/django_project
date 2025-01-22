from django.contrib import admin
from django.utils.html import format_html
from django.forms import widgets
from django import forms
from .models import ImageWithCoordinates


class CoordinatesWidget(widgets.Textarea):
    """
    Кастомный виджет для редактирования coordinates с помощью Textarea.
    """
    template_name = 'admin/coordinates_widget.html'

    class Media:
        js = ('admin/js/coordinates_editor.js',)  # Подключаем JavaScript для улучшения работы с JSON


class ImageWithCoordinatesForm(forms.ModelForm):
    """
    Форма для модели ImageWithCoordinates с кастомным виджетом для coordinates.
    """
    # class Meta:
    #     model = ImageWithCoordinates
    #     fields = '__all__'
    #     widgets = {
    #         'coordinates': CoordinatesWidget(attrs={'rows': 10, 'cols': 60}),
    #     }


@admin.register(ImageWithCoordinates)
class ImageWithCoordinatesAdmin(admin.ModelAdmin):
    form = ImageWithCoordinatesForm  # Подключение кастомной формы
    fields = ('image', 'image_preview', 'coordinates', 'level', 'created_at')
    readonly_fields = ('image_preview', 'created_at')

    

    def image_preview(self, obj):
        if obj.image and obj.image.url:
            return format_html(
                '''
                <div id="image-container" style="position: relative; display: inline-block;">
                    <img id="image-preview" src="{}" style="max-width: 300px; max-height: 300px;" />
                </div>
                ''', obj.image.url)
        return format_html('<div id="image-container"><img id="image-preview" src="" style="display: none; max-width: 300px; max-height: 300px;" /></div>')

    image_preview.short_description = "Image Preview"

    class Media:
        js = ('admin/js/image_preview.js',)  # Скрипт для предпросмотра изображений
