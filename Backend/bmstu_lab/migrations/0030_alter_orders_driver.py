# Generated by Django 4.1.1 on 2022-12-26 14:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bmstu_lab', '0029_orders_driver'),
    ]

    operations = [
        migrations.AlterField(
            model_name='orders',
            name='driver',
            field=models.CharField(blank='', max_length=30, null=True, verbose_name='Водитель'),
        ),
    ]
