# from __future__ import absolute_import, unicode_literals
# import os
# from celery import Celery

# # Устанавливаем настройки Django
# os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'project.settings')

# app = Celery('project')

# # Используем строку настройки для указания брокера сообщений (например, Redis)
# app.config_from_object('django.conf:settings', namespace='CELERY')

# # Автоматически обнаруживаем задачи в приложениях Django
# app.autodiscover_tasks()
