from django.db import models

# Create your models here.

#
# CREATE TABLE Cars (
# id integer NOT NULL,
# price numeric not NULL,
# title CHAR(30) NOT NULL,
# mileage CHAR(255) NOT NULL,
# engine_type_id integer NOT NULL,
# gearbox_id integer NOT NULL,
# drive_id integer NOT NULL,
# brand_id integer NOT NULL,
# FOREIGN KEY (engine_type_id) REFERENCES Engine_types(id),
# FOREIGN KEY (transmission_id) REFERENCES Transmissions(id),
# FOREIGN KEY (drive_id) REFERENCES Drives(id),
# FOREIGN KEY (brand_id) REFERENCES Brands(id),
# PRIMARY KEY (id)
# );

class Cars(models.Model):
    title = models.CharField(max_length=150, verbose_name='Название модели')
    price = models.IntegerField(verbose_name='Цена')
    mileage = models.IntegerField(verbose_name='Пробег')
    photo = models.ImageField(upload_to='photo/', blank=True, verbose_name='Фото')
    engine_type = models.ForeignKey('Engine_types', on_delete=models.PROTECT, verbose_name='Тип двигателя')
    gearbox = models.ForeignKey('Gearboxes', on_delete=models.PROTECT, verbose_name='Корбка передач')
    drive = models.ForeignKey('Drives', on_delete=models.PROTECT, verbose_name='Привод')
    brand = models.ForeignKey('Brands', on_delete=models.PROTECT, verbose_name='Марка')

    def __str__(self):
        return self.title

    class Meta:
        ordering = ['brand']
        verbose_name = 'Автомобиль'
        verbose_name_plural = 'Автомобили'

#
# CREATE TABLE Transmissions (
# id integer NOT NULL,
# title CHAR(30) NOT NULL,
# PRIMARY KEY (id)
# );

class Gearboxes(models.Model):
    title = models.CharField(max_length=150, verbose_name='Коробка передач')

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = 'Коробка передач'
        verbose_name_plural = 'Коробки передач'

#
# CREATE TABLE Drives (
# id integer NOT NULL,
# title CHAR(30) NOT NULL,
# PRIMARY KEY (id)
# );

class Drives(models.Model):
    title = models.CharField(max_length=150, verbose_name='Привод')

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = 'Привод'
        verbose_name_plural = 'Приводы'
#
# CREATE TABLE Engine_types (
# id integer NOT NULL,
# title CHAR(30) NOT NULL,
# PRIMARY KEY (id)
# );

class Engine_types(models.Model):
    title = models.CharField(max_length=150, verbose_name='Тип двигателя')

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = 'Тип двигателя'
        verbose_name_plural = 'Типы двигателей'

# CREATE TABLE Brands (
# id integer NOT NULL,
# title CHAR(30) NOT NULL,
# country CHAR(30) NOT NULL,
# PRIMARY KEY (id)
# );

class Brands(models.Model):
    title = models.CharField(max_length=150, verbose_name='Марка')
    country = models.CharField(max_length=150, verbose_name='Страна производителя')

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = 'Марка'
        verbose_name_plural = 'Марки'
