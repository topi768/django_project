# Generated by Django 5.1.3 on 2024-12-19 08:17

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('new_app', '0007_cityandcountrycode_country_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='cityandcountrycode',
            name='country_code_number',
        ),
    ]