# Generated by Django 4.1.1 on 2022-11-20 18:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bmstu_lab', '0008_alter_cars_photo'),
    ]

    operations = [
        migrations.AlterField(
            model_name='cars',
            name='photo',
            field=models.CharField(max_length=300, verbose_name='URL фото'),
        ),
    ]
