from datetime import date
# from .models import Brands
from .models import Cars
from .models import Orders
from .models import UserProfile
# from .models import Drivers
from rest_framework import viewsets
from .serializers import CarSerializer
# from .serializers import BrandSerializer
from .serializers import UserSerializer
# from .serializers import DriverSerializer
from .serializers import OrderSerializer
from django_filters.rest_framework import DjangoFilterBackend
from django_filters import rest_framework as filters, DateFilter, DateTimeFilter

from django.shortcuts import render

from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import permissions
from django.contrib import auth
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_protect
from django.utils.decorators import method_decorator

class TrackPermissionCheck(permissions.IsAuthenticated):
    def has_permission(self, request, view):
        print("cool")
        if request.method == 'GET':
            return True
        else:
            user = request.user
            try:
                isAuthenticated = user.is_authenticated
                user_profile = UserProfile.objects.get(user=user)

                print("answer", isAuthenticated and user_profile.isManager)
                return isAuthenticated and user_profile.isManager
            except:
                return False


class CheckAuthenticatedView(APIView):
    def get(self, request, format=None):
        user = self.request.user

        try:
            isAuthenticated = user.is_authenticated
            user_profile = UserProfile.objects.get(user=user)

            if isAuthenticated:
                return Response({ 'isAuthenticated': 'success',
                                  'userProfileId': user_profile.id,
                                  'isManager': user_profile.isManager})
            else:
                return Response({ 'isAuthenticated': 'error' })
        except:
            return Response({ 'error': 'Something went wrong when checking authentication status' })


@method_decorator(csrf_protect, name='dispatch')
class LoginView(APIView):
    permission_classes = (permissions.AllowAny, )

    def post(self, request, format=None):
        data = self.request.data

        username = data['username']
        password = data['password']

        try:
            user = auth.authenticate(username=username, password=password)
            user_profile = UserProfile.objects.get(user=user)

            if user is not None:
                auth.login(request, user)
                return Response({ 'success': 'User authenticated', 'userProfileId': user_profile.id, 'isManager': user_profile.isManager})
            else:
                return Response({ 'error': 'Error Authenticating' })
        except:
            return Response({ 'error': 'Something went wrong when logging in' })

class LogoutView(APIView):
    def post(self, request, format=None):
        try:
            auth.logout(request)
            return Response({ 'success': 'Loggout Out' })
        except:
            return Response({ 'error': 'Something went wrong when logging out' })

@method_decorator(csrf_protect, name='dispatch')
class SignupView(APIView):
    permission_classes = (permissions.AllowAny, )
    def post(self, request, format=None):
        data = self.request.data

        username = data['username']
        password = data['password']
        re_password = data['re_password']

        try:
            if password == re_password:
                if User.objects.filter(username=username).exists():
                    return Response({ 'error': 'Username already exists' })
                else:
                    if len(password) < 4:
                        return Response({ 'error': 'Password must be at least 4 characters' })
                    else:
                        user = User.objects.create_user(username=username, password=password)
                        user = User.objects.get(id=user.id)
                        user.save()

                        user_profile = UserProfile.objects.create(user=user, isManager=False)
                        user_profile.save()

                        return Response({'success': 'User created successfully'})
            else:
                return Response({ 'error': 'Passwords do not match' })
        except:
                return Response({ 'error': 'Something went wrong when registering account' })


# class ExampleView(APIView):
#     authentication_classes = [SessionAuthentication, BasicAuthentication]
#     permission_classes = [IsAuthenticated]
#
#     def get(self, request, format=None):
#         content = {
#             'user': str(request.user),  # `django.contrib.auth.User` instance.
#             'auth': str(request.auth),  # None
#         }
#         return Response(content)

# def auth_view(request):
#     username = request.POST["login"] # допустим передали username и password
#     password = request.POST["password"]
#     user = authenticate(request, username=username, password=password)
#     if user is not None:
#         login(request, user)
#         return HttpResponse("{'status': 'ok'}")
#     else:
#         return HttpResponse("{'status': 'error', 'error': 'login failed'}")

# Create your views here.

@method_decorator(ensure_csrf_cookie, name='dispatch')
class GetCSRFToken(APIView):
    permission_classes = (permissions.AllowAny, )

    def get(self, request, format=None):
        return Response({ 'success': 'CSRF cookie set' })


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

class CarFilter(filters.FilterSet):
    price = filters.RangeFilter()
    class Meta:
        model = Cars
        fields = ['price']

class OrderFilter(filters.FilterSet):
    time = filters.IsoDateTimeFromToRangeFilter()
    status = filters.CharFilter()
    class Meta:
        model = Orders
        fields = ['time', 'status']

class CarViewSet(viewsets.ModelViewSet):
    permissions_classes = (TrackPermissionCheck,)
    # queryset всех пользователей для фильтрации по дате последнего изменения
    queryset = Cars.objects.all()
    serializer_class = CarSerializer  # Сериализатор для модели
    filter_backends = (DjangoFilterBackend,)
    filterset_class = CarFilter

# class BrandViewSet(viewsets.ModelViewSet):
#     # queryset всех пользователей для фильтрации по дате последнего изменения
#     queryset = Brands.objects.all()
#     serializer_class = BrandSerializer  # Сериализатор для модели

# class DriverViewSet(viewsets.ModelViewSet):
#     # queryset всех пользователей для фильтрации по дате последнего изменения
#     queryset = Drivers.objects.all()
#     serializer_class = DriverSerializer  # Сериализатор для модели

class OrderViewSet(viewsets.ModelViewSet):
    permission_classes = (permissions.IsAuthenticated, )
    serializer_class = OrderSerializer
    queryset = Orders.objects.all()
    filter_backends = (DjangoFilterBackend,)
    filterset_class = OrderFilter
    def get_queryset(self):
        userProfile=UserProfile.objects.get(user=self.request.user)
        if not userProfile.isManager:
            res = Orders.objects.all().filter(userProfile=userProfile)
            print("RESULT", res)
            return res
        else:
            print("ISMANAGER")
            return Orders.objects.all()

class UsersViewSet(viewsets.ModelViewSet):
    permission_classes = (permissions.IsAdminUser,)
    # queryset всех пользователей для фильтрации по дате последнего изменения
    queryset = UserProfile.objects.all()
    serializer_class = UserSerializer  # Сериализатор для модели