from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    ParticipantView, 
    ProductViewSet, 
    CartViewSet, 
    CategoryViewSet,
    RegistrationView,
)

router = DefaultRouter()
router.register(r'products', ProductViewSet)
router.register(r'categories', CategoryViewSet)
router.register(r'register', RegistrationView, basename='register')
router.register(r'cart', CartViewSet, basename='cart')

urlpatterns = [
    path('profile/', ParticipantView.as_view({
        'get': 'retrieve',
        'put': 'update',
        'patch': 'partial_update',
        'delete': 'destroy'
    }), name='profile'),
    path('profile/me/', ParticipantView.as_view({'get': 'get_my_profile'}), name='my-profile'),
    path('', include(router.urls)),
]