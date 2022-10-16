from django.db import models

# Create your models here.

class Orders(models.Model):
    price = models.IntegerField(verbose_name='Цена')
    priority = models.IntegerField(verbose_name='Приоритет')
    address_take = models.CharField(max_length=150, verbose_name='Адрес получения')
    address_delivery = models.CharField(max_length=150, verbose_name='Адрес выдачи')
    time = models.DateTimeField(verbose_name='Время выдачи')
    driver = models.ForeignKey('Drivers', on_delete=models.PROTECT, verbose_name='Водитель id')
    car = models.ForeignKey('Cars', on_delete=models.PROTECT, verbose_name='Автомобиль id')
    def __str__(self):
        return f'Заказ номер {self.id}: {self.address_take} -> {self.address_delivery}'

    class Meta:
        verbose_name = 'Заказ'
        verbose_name_plural = 'Заказы'

class Cars(models.Model):
    title = models.CharField(max_length=150, verbose_name='Название модели')
    price = models.IntegerField(verbose_name='Цена')
    useful_capacity = models.FloatField(verbose_name='Полезный объём')
    photo = models.ImageField(upload_to='images/', blank=True, verbose_name='Фото')
    brand = models.ForeignKey('Brands', on_delete=models.PROTECT, verbose_name='Марка')

    def __str__(self):
        return self.title

    class Meta:
        ordering = ['brand']
        verbose_name = 'Автомобиль'
        verbose_name_plural = 'Автомобили'

class Drivers(models.Model):
    name = models.CharField(max_length=20, verbose_name='Имя')
    surname = models.CharField(max_length=20, verbose_name='Фамилия')
    passport_number = models.IntegerField(unique=True, verbose_name='Номер паспорта')

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = 'Водитель'
        verbose_name_plural = 'Водители'

class Brands(models.Model):
    title = models.CharField(unique=True, max_length=150, verbose_name='Марка')
    country = models.CharField(max_length=150, verbose_name='Страна производителя')

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = 'Марка'
        verbose_name_plural = 'Марки'
