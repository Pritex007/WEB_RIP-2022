from django.contrib import admin
from .models import Cars
from .models import Brands
from .models import Orders
from .models import Drivers

# Register your models here.

class CarsAdmin(admin.ModelAdmin):
    list_display = ('title', 'brand', 'price', 'useful_capacity', 'photo')

admin.site.register(Cars, CarsAdmin)    
admin.site.register(Brands)
admin.site.register(Orders)
admin.site.register(Drivers)

