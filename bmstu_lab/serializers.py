from .models import Cars
from rest_framework import serializers


class CarSerializer(serializers.ModelSerializer):
    class Meta:
        # Модель, которую мы сериализуем
        model = Cars
        # Поля, которые мы сериализуем
        fields = ["pk", "title", "price", "useful_capacity", "photo", "brand"]