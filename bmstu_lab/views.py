from datetime import date

from django.shortcuts import render

# Create your views here.

def GetCar(request, title):
    return render(request, 'car.html', {'data' : {
        'current_date': date.today(),
        'title': title
    }})

def GetCars(request):
    return render(request, 'cars.html', {'data' : {
        'current_date': date.today(),
        'orders': [
            {'title': 'Ford', 'id': 1},
            {'title': 'Tesla', 'id': 2},
            {'title': 'BMW', 'id': 3},
            {'title': 'Mercedes', 'id': 4},
        ]
    }})