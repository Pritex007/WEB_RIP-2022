from datetime import date
from .models import Brands
from .models import Cars
from .models import Drives
from .models import Gearboxes
from .models import Engine_types

from django.shortcuts import render

# Create your views here.

def GetCars(request, id):
    brand = Brands.objects.filter(id=id).first()
    return render(request, 'cars.html',
                  {'data': {
                      'cars': [{
                          'car_info': f'{brand} {car.title}',
                          'gearbox': Gearboxes.objects.filter(id=car.gearbox_id).first(),
                          'engine_type': Engine_types.objects.filter(id=car.engine_type_id).first(),
                          'drive': Drives.objects.filter(id=car.drive_id).first(),
                          'photo': car.photo
                      }
                          for car in Cars.objects.filter(brand=id)],
                      'brand': brand
                  }
                  })

def GetBrands(request):
    return render(request, 'brands.html', {'data' : {
        'current_date': date.today(),
        'brands': Brands.objects.all()
    }})

def TakeCarImagePath(title):
    dictionary =  {
        'Ford': 'photo/Ford.jpg',
        'Tesla': 'photo/Tesla.jpg',
        'BMW': 'photo/BMW.jpg',
        'Mercedes': 'photo/Mercedes.jpg',
    }
    return dictionary[title]

# def TakeCarDescription(title):
#     dictionary =  {
#         'Ford': {
#             'eng_type': 'преимущественно ДВС',
#             'country': 'США'
#             },
#         'Tesla': {
#             'eng_type': 'Электрический',
#             'country': 'США'
#             },
#         'BMW': {
#             'eng_type': 'преимущественно ДВС',
#             'country': 'Германия'
#             },
#         'Mercedes': {
#             'eng_type': 'преимущественно ДВС',
#             'country': 'Германия'
#         },
#     }
#     return dictionary[title]
