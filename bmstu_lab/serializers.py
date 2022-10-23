from .models import Cars
from .models import Brands
from .models import Drivers
from .models import Orders
from rest_framework import serializers


class CarSerializer(serializers.ModelSerializer):
    class Meta:
        # Модель, которую мы сериализуем
        model = Cars
        # Поля, которые мы сериализуем
        fields = ["pk", "title", "price", "useful_capacity", "photo", "brand"]

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        # Модель, которую мы сериализуем
        model = Orders
        # Поля, которые мы сериализуем
        fields = ["pk", "price", "priority", "address_take", "address_delivery", "time", "driver", "car"]

class BrandSerializer(serializers.ModelSerializer):
    class Meta:
        # Модель, которую мы сериализуем
        model = Brands
        # Поля, которые мы сериализуем
        fields = ["pk", "title", "country"]

class DriverSerializer(serializers.ModelSerializer):
    class Meta:
        # Модель, которую мы сериализуем
        model = Cars
        # Поля, которые мы сериализуем
        fields = ["pk", "name", "surname", "passport_number"]