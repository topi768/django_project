# Generated by Django 5.1.3 on 2025-02-04 08:27

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('new_app', '0011_useraccount_deleted_at'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='cityandcountrycode',
            name='country',
        ),
        migrations.DeleteModel(
            name='Room',
        ),
        migrations.DeleteModel(
            name='CityAndCountryCode',
        ),
        migrations.DeleteModel(
            name='CountryCodeAndCountryName',
        ),
    ]
