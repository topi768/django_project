from django.contrib import admin
from django.utils.html import format_html
from django import forms
from django.forms import widgets

from geography.models import CountryCodeAndCountryName
from .models import ImageWithCoordinates, Achievement, UserAccount, UserAccountInfo

# Кастомная форма для пользователя, если хотите изменить или добавить поля
class UserAccountForm(forms.ModelForm):
    class Meta:
        model = UserAccount
        fields = ['email', 'name', 'is_staff', 'is_active', 'is_superuser']
        widgets = {
            'email': forms.EmailInput(attrs={'class': 'vTextField'}),
            'name': forms.TextInput(attrs={'class': 'vTextField'}),
        }

class UserAccountInfoForm(forms.ModelForm):
    country = forms.ModelChoiceField(
        queryset=CountryCodeAndCountryName.objects.all(),  
        empty_label="Выберите страну",  
        widget=forms.Select(attrs={'class': 'vTextField'}),
    )

    class Meta:
        model = UserAccountInfo
        fields = '__all__'

    def save(self, commit=True):
        """Сохраняем только код страны, а не объект"""
        instance = super().save(commit=False)
        instance.country = self.cleaned_data['country'].country_code  # ⚡ Берем код страны
        if commit:
            instance.save()
        return instance

# Инлайн-модель для UserAccountInfo
class UserAccountInfoInline(admin.StackedInline):  # Можно заменить на admin.TabularInline для компактного вида
    model = UserAccountInfo
    extra = 0  # Убираем лишние пустые формы
    can_delete = False  # Запрещаем удаление (можно убрать, если разрешено)
    filter_horizontal = ('achievements',)  # Показывает только полученные достижения
    form = UserAccountInfoForm

    
@admin.register(UserAccount)
class UserAccountAdmin(admin.ModelAdmin):
    form = UserAccountForm
    list_display = ('email', 'name', 'is_staff', 'is_active', 'is_superuser', 'current_country_code')
    search_fields = ('email', 'name')
    list_filter = ('is_staff', 'is_active', 'is_superuser')

    inlines = [UserAccountInfoInline]  # Добавляем inline-модель

    def get_queryset(self, request):
        queryset = super().get_queryset(request)
        return queryset

    # Можно добавить методы для редактирования или удаления
    def delete_model(self, request, obj):
        obj.delete()
    def current_country_code(self, obj):
        """Получает код страны и название страны из UserAccountInfo"""
        if hasattr(obj, 'info') and obj.info.country:
            country = CountryCodeAndCountryName.objects.filter(country_code=obj.info.country).first()
            if country:
                return f"{obj.info.country} - {country.country_name}"
        return "Не указано"

    current_country_code.short_description = "Код страны"  # Заголовок колонки



# AchievementAdmin для модели Achievement
@admin.register(Achievement)
class AchievementAdmin(admin.ModelAdmin):
    list_display = ('name', 'description', 'created_at', 'maxProgress')  # Поля, которые будут отображаться в списке
    search_fields = ('name',)  # Поле для поиска
    list_filter = ('created_at',)  # Фильтрация по дате создания

# Кастомный виджет для редактирования coordinates
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
    class Meta:
        model = ImageWithCoordinates
        fields = '__all__'
        widgets = {
            'coordinates': CoordinatesWidget(attrs={'rows': 10, 'cols': 60}),
        }

@admin.register(ImageWithCoordinates)
class ImageWithCoordinatesAdmin(admin.ModelAdmin):
    form = ImageWithCoordinatesForm  # Подключение кастомной формы
    fields = ('image', 'image_preview', 'coordinates', 'level', 'created_at')
    readonly_fields = ('image_preview', 'created_at')

    def formfield_for_dbfield(self, db_field, **kwargs):
        if db_field.name == "coordinates":
            kwargs["help_text"] = (
                'Введите данные в формате: [<br>'
                '{"x": 10, "y": 10, "width": 20, "height" :40},<br>'
                '{"x": 20, "y": 80, "width": 20, "height" :20}<br>]'
            )
        return super().formfield_for_dbfield(db_field, **kwargs)

    def image_preview(self, obj):
        if obj.image and obj.image.url:
            return format_html(
                '''
                <div id="image-container" style="position: relative; display: inline-block;">
                    <img id="image-preview" src="{}" style="max-width: 600px; max-height: 600px;" />
                </div>
                ''', obj.image.url)
        return format_html('<div id="image-container"><img id="image-preview" src="" style="display: none; max-width: 800px; max-height: 800px;" /></div>')

    image_preview.short_description = "Image Preview"

    class Media:
        js = ('admin/js/image_preview.js',)  # Скрипт для предпросмотра изображений
