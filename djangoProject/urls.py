"""djangoProject URL Configuration
The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import include, path
from django.conf import settings
from django.conf.urls.static import static
from rest_framework import routers
from bmstu_lab import views


router = routers.DefaultRouter()
router.register(r'cars', views.CarViewSet)
# router.register(r'brands', views.BrandViewSet)
router.register(r'orders', views.OrderViewSet)
router.register(r'users', views.UsersViewSet)
# router.register(r'drivers', views.DriverViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('auth/register', views.SignupView.as_view()),
    path('authenticated', views.CheckAuthenticatedView.as_view()),
    path('auth/login', views.LoginView.as_view()),
    path('auth/logout', views.LogoutView.as_view()),
    path('admin/', admin.site.urls),
    # path('some/', views.GetBrands),
    path('api/csrf_cookie', views.GetCSRFToken.as_view()),
    path('api/rent/<int:id>/', views.GetCars, name='brand_url'),
]
