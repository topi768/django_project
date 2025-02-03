#!/usr/bin/env python
"""Django's command-line utility for administrative tasks."""
import os
import sys
import threading
import time

def run_delete_task():
    """Фоновая задача для удаления старых аккаунтов каждую минуту."""
    while True:
        os.system("python manage.py delete_old_accounts")
        time.sleep(60)

def main():
    """Run administrative tasks."""
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'project.settings')

    # Запускаем фоновый поток ТОЛЬКО при запуске сервера runserver
    if len(sys.argv) > 1 and sys.argv[1] == "runserver":
        if os.environ.get('RUN_MAIN') == 'true':  # Избегаем двойного запуска
            thread = threading.Thread(target=run_delete_task, daemon=True)
            thread.start()

    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc
    execute_from_command_line(sys.argv)

if __name__ == '__main__':
    main()
