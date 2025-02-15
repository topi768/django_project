from django.contrib import admin
from .models import BugReport


@admin.register(BugReport)
class BugReportAdmin(admin.ModelAdmin):
    list_display = ('description', 'created_at')  # Добавляем created_at
    search_fields = ('description',)  # created_at можно убрать отсюда, если поиск не работает
    list_filter = ('created_at',)  # Фильтр по дате