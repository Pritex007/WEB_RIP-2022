from datetime import date
from .models import Brands
from .models import Cars
from .models import Orders
from .models import Drivers
from rest_framework import viewsets
from .serializers import CarSerializer
from .serializers import BrandSerializer
from .serializers import DriverSerializer
from .serializers import OrderSerializer

from django.shortcuts import render

# Create your views here.

def GetCars(request, id):
    brand = Brands.objects.filter(id=id).first()
    return render(request, 'cars.html',
                  {'data': {
                      'cars': [car for car in Cars.objects.filter(brand=id)],
                      'brand': brand
                  }
                  })

def GetBrands(request):
    return render(request, 'brands.html', {'data' : {
        'current_date': date.today(),
        'brands': Brands.objects.all()
    }})

class CarViewSet(viewsets.ModelViewSet):
    # queryset всех пользователей для фильтрации по дате последнего изменения
    queryset = Cars.objects.all()
    serializer_class = CarSerializer  # Сериализатор для модели

class BrandViewSet(viewsets.ModelViewSet):
    # queryset всех пользователей для фильтрации по дате последнего изменения
    queryset = Brands.objects.all()
    serializer_class = BrandSerializer  # Сериализатор для модели

class DriverViewSet(viewsets.ModelViewSet):
    # queryset всех пользователей для фильтрации по дате последнего изменения
    queryset = Drivers.objects.all()
    serializer_class = DriverSerializer  # Сериализатор для модели

class OrderViewSet(viewsets.ModelViewSet):
    # queryset всех пользователей для фильтрации по дате последнего изменения
    queryset = Orders.objects.all()
    serializer_class = OrderSerializer  # Сериализатор для модели
