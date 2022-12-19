from .models import Cars
from .models import Brands
# from .models import Drivers
from .models import Orders
from .models import UserProfile
from rest_framework import serializers


class CarSerializer(serializers.ModelSerializer):
    class Meta:
        # Модель, которую мы сериализуем
        model = Cars
        # Поля, которые мы сериализуем
        fields = ["pk", "title", "price", "capacity", "photo", "brand", "payload", "description"]

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        # Модель, которую мы сериализуем
        model = Orders
        # Поля, которые мы сериализуем
        fields = ["pk", "price", "address_take", "time", "car", "user"]

class BrandSerializer(serializers.ModelSerializer):
    class Meta:
        # Модель, которую мы сериализуем
        model = Brands
        # Поля, которые мы сериализуем
        fields = ["pk", "title", "country"]

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        # Модель, которую мы сериализуем
        model = UserProfile
        # Поля, которые мы сериализуем
        fields = ["pk", "username"]

# class DriverSerializer(serializers.ModelSerializer):
#     class Meta:
#         # Модель, которую мы сериализуем
#         model = Cars
#         # Поля, которые мы сериализуем
#         fields = ["pk", "name", "surname", "passport_number"]