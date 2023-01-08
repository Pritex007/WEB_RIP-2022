from django.db import models
from django.contrib.auth import models as user_models
from django.contrib.auth.models import PermissionsMixin
from django.contrib.auth.models import User

# Create your models here.

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    email = models.CharField(max_length=50)
    isManager = models.BooleanField(verbose_name='является Менеджером')
    def __str__(self):
        return f'Клиент {self.id}'
    class Meta:
        verbose_name = 'Клиент'
        verbose_name_plural = 'Клиенты'

class Orders(models.Model):
    price = models.IntegerField(verbose_name='Цена')
    # priority = models.IntegerField(verbose_name='Приоритет')
    address_take = models.CharField(max_length=150, verbose_name='Адрес получения')
    # address_delivery = models.CharField(max_length=150, verbose_name='Адрес выдачи')
    time = models.DateTimeField(verbose_name='Время выдачи')
    # driver = models.ForeignKey('Drivers', on_delete=models.PROTECT, verbose_name='Водитель id')
    car = models.ForeignKey('Cars', on_delete=models.PROTECT, verbose_name='Автомобиль id')
    date_create = models.DateTimeField(verbose_name='Время создания заказа', null=True)
    date_start = models.DateTimeField(verbose_name='Время начала выполнения заказа', null=True)
    date_end = models.DateTimeField(verbose_name='Время завершения заказа', null=True)
    driver = models.CharField(max_length=30, verbose_name='Водитель', blank="", null=True)
    userProfile = models.ForeignKey('userProfile', on_delete=models.PROTECT, verbose_name='Клиент')
    status = models.CharField(max_length=30, verbose_name='Статус')
    # def __str__(self):
    #     return f'Заказ номер {self.id}: {self.address_take}'

    class Meta:
        verbose_name = 'Заказ'
        verbose_name_plural = 'Заказы'

class Cars(models.Model):
    title = models.CharField(max_length=150, verbose_name='Название модели')
    price = models.IntegerField(verbose_name='Цена')
    capacity = models.FloatField(verbose_name='Полезный объём')
    photo = models.CharField(max_length=300, verbose_name='URL фото')
    brand = models.CharField(max_length=150, verbose_name='Марка')
    payload = models.FloatField(verbose_name='Грузоподъемность')
    description = models.CharField(max_length=200, verbose_name='Описание')

    def __str__(self):
        return self.title

    class Meta:
        ordering = ['brand']
        verbose_name = 'Автомобиль'
        verbose_name_plural = 'Автомобили'

# class Drivers(models.Model):
#     name = models.CharField(max_length=20, verbose_name='Имя')
#     surname = models.CharField(max_length=20, verbose_name='Фамилия')
#     passport_number = models.IntegerField(unique=True, verbose_name='Номер паспорта')
#
#     def __str__(self):
#         return self.title
#
#     class Meta:
#         verbose_name = 'Водитель'
#         verbose_name_plural = 'Водители'

# class Brands(models.Model):
#     title = models.CharField(unique=True, max_length=150, verbose_name='Марка')
#     country = models.CharField(max_length=150, verbose_name='Страна производителя')
#
#     def __str__(self):
#         return self.title
#
#     class Meta:
#         verbose_name = 'Марка'
#         verbose_name_plural = 'Марки'
