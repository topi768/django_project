# Generated by Django 5.1.3 on 2025-01-21 15:21

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('new_app', '0006_useraccount_is_active_useraccount_is_staff_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='imagewithcoordinates',
            name='height',
        ),
        migrations.RemoveField(
            model_name='imagewithcoordinates',
            name='width',
        ),
    ]
