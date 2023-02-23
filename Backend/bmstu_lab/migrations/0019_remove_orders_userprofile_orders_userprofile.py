# Generated by Django 4.1.1 on 2022-12-20 06:36

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('bmstu_lab', '0018_userprofile_remove_orders_user_delete_users_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='orders',
            name='UserProfile',
        ),
        migrations.AddField(
            model_name='orders',
            name='userProfile',
            field=models.ForeignKey(default=12345, on_delete=django.db.models.deletion.PROTECT, to='bmstu_lab.userprofile', verbose_name='Клиент'),
            preserve_default=False,
        ),
    ]