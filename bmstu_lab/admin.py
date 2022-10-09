from django.contrib import admin
from .models import Cars
from .models import Brands
from .models import Drives
from .models import Gearboxes
from .models import Engine_types

# Register your models here.

class CarsAdmin(admin.ModelAdmin):
    list_display = ('title', 'brand', 'price', 'mileage', 'photo', 'engine_type', 'gearbox', 'drive')

admin.site.register(Cars, CarsAdmin)    
admin.site.register(Brands)
admin.site.register(Drives)
admin.site.register(Gearboxes)
admin.site.register(Engine_types)

