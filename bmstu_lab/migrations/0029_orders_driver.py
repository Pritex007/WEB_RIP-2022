# Generated by Django 4.1.1 on 2022-12-26 14:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bmstu_lab', '0028_alter_orders_time'),
    ]

    operations = [
        migrations.AddField(
            model_name='orders',
            name='driver',
            field=models.CharField(default='', max_length=30, verbose_name='Водитель'),
            preserve_default=False,
        ),
    ]
