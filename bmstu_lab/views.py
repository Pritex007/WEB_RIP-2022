from datetime import date

from django.shortcuts import render

# Create your views here.

def GetCar(request, title):
    return render(request, 'car.html', {'data' : {
        'current_date': date.today(),
        'title': title,
        'imagePath': TakeCarImagePath(title),
        'description': TakeCarDescription(title)
    }})

def GetCars(request):
    return render(request, 'cars.html', {'data' : {
        'current_date': date.today(),
        'orders': [
            {'title': 'Ford', 'id': 1, 'eng_type': 'преимущественно ДВС'},
            {'title': 'Tesla', 'id': 2, 'eng_type': 'Электрический'},
            {'title': 'BMW', 'id': 3, 'eng_type': 'преимущественно ДВС'},
            {'title': 'Mercedes', 'id': 4, 'eng_type': 'преимущественно ДВС'},
        ]
    }})

def TakeCarImagePath(title):
    dictionary =  {
        'Ford': 'photo/Ford.jpg',
        'Tesla': 'photo/Tesla.jpg',
        'BMW': 'photo/BMW.jpg',
        'Mercedes': 'photo/Mercedes.jpg',
    }
    return dictionary[title]

def TakeCarDescription(title):
    dictionary =  {
        'Ford': {
            'eng_type': 'преимущественно ДВС',
            'country': 'США'
            },
        'Tesla': {
            'eng_type': 'Электрический',
            'country': 'США'
            },
        'BMW': {
            'eng_type': 'преимущественно ДВС',
            'country': 'Германия'
            },
        'Mercedes': {
            'eng_type': 'преимущественно ДВС',
            'country': 'Германия'
        },
    }
    return dictionary[title]
