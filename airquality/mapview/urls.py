from django.urls import path, include
from .views import  ModelViewset
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('airquality', ModelViewset, basename='airquality')

urlpatterns = [
    path('api/', include(router.urls)),
    path('api/<int:pk>', include(router.urls))
]
