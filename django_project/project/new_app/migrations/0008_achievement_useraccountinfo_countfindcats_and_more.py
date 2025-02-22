# Generated by Django 5.1.3 on 2025-01-27 04:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('new_app', '0007_remove_imagewithcoordinates_height_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='Achievement',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('description', models.TextField(blank=True, null=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.AddField(
            model_name='useraccountinfo',
            name='countFindCats',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='useraccountinfo',
            name='points',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='useraccountinfo',
            name='rank',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='useraccountinfo',
            name='achievements',
            field=models.ManyToManyField(blank=True, related_name='users', to='new_app.achievement'),
        ),
    ]
