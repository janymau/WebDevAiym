from django.shortcuts import render
from .models import *
from .serializers import *
from rest_framework import viewsets, status
from django.shortcuts import render
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import viewsets, response, status
from rest_framework.response import Response
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.decorators import permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.decorators import action
from .models import *
from .serializers import *
from django.shortcuts import get_object_or_404
from rest_framework.permissions import BasePermission



# Create your views here.
class RegistrationView(viewsets.ModelViewSet):
    queryset = Customer.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]
    http_method_names = ['post']

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data = request.data)


        if serializer.is_valid():
            user = serializer.save()

            refresh = RefreshToken.for_user(user)
            access_token = str(refresh.access_token)


            return Response({
                'message':'User is registered successfully',
                'access':access_token,
                'refresh':str(refresh)
            }, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class ParticipantView(viewsets.ModelViewSet):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer
    permission_classes = [IsAuthenticated]
    @action(detail=False, methods=['get'], url_path='me')
    def get_my_profile(self, request):
        """
        Получение профиля текущего пользователя
        """
        try:
            # Получаем Participant для текущего User
            participant = Customer.objects.get(user=request.user)
            serializer = self.get_serializer(participant)
            return Response(serializer.data)
        except Customer.DoesNotExist:
            return Response(
                {'error': 'Participant profile not found'},
                status=status.HTTP_404_NOT_FOUND
            )
    

    
    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()

        if instance.id == request.user.id:
            return super().retrieve(request, *args, **kwargs)
        if request.method == 'GET':
            serializer = self.get_serializer(instance)
            return Response(serializer.data)

        return Response({'error': 'You can only modify your own profile.'}, status=status.HTTP_403_FORBIDDEN)


    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        if instance.id != request.user.id:
         return Response({'error': 'You can only update your own account.'}, status=status.HTTP_403_FORBIDDEN)

        data = request.data
        required_fields = ['name', 'surname', 'age', 'phoneNumber']
        for field in required_fields:
           if field not in data:
             return Response({'error': f"Missing field: {field}"}, status=status.HTTP_400_BAD_REQUEST)

        return super().update(request, *args, **kwargs)

    
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        if instance.id != request.user.id:
            return Response({'error': 'You can only delete your own account.'}, status=status.HTTP_403_FORBIDDEN)

        self.perform_destroy(instance)
        return Response({'message': 'Participant deleted'}, status=status.HTTP_204_NO_CONTENT)


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.active.all()
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_serializer_class(self):
        if self.action in ['create', 'update', 'partial_update']:
            return CreateProductSerializer
        return ProductSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        brand_name = self.request.query_params.get('brand')
        
        if brand_name:
            queryset = queryset.filter(brand__iexact=brand_name)
            
        if self.request.user.is_authenticated and hasattr(self.request.user, 'moderator_profile'):
            return Product.objects.all()
        return queryset

class CartViewSet(viewsets.ModelViewSet):
    serializer_class = CartItemSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return CartItem.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        product = get_object_or_404(Product, pk=self.request.data.get('product'))
        serializer.save(user=self.request.user, product=product)

    @action(detail=False, methods=['delete'])
    def clear(self, request):
        CartItem.objects.filter(user=request.user).delete()
        return Response({'message': 'Cart cleared'}, status=status.HTTP_204_NO_CONTENT)

    @action(detail=False, methods=['post'])
    def checkout(self, request):
        cart_items = CartItem.objects.filter(user=request.user)
        if not cart_items.exists():
            return Response(
                {'error': 'Cart is empty'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Здесь должна быть логика оплаты, но по условиям просто удаляем товары
        cart_items.delete()
        return Response(
            {'message': 'Purchase completed successfully'}, 
            status=status.HTTP_200_OK
        )

class IsModerator(BasePermission):
    """
    Проверка, что пользователь является модератором
    """
    def has_permission(self, request, view):
        return hasattr(request.user, 'moderator_profile')
class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticatedOrReadOnly | IsModerator]  # Чтение для всех, изменение для модераторов

    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            return [IsModerator()]
        return super().get_permissions()

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)
    
    @action(detail=True, methods=['get'], url_path='products')
    def category_products(self, request, pk=None):
        """Получение всех продуктов категории"""
        category = self.get_object()
        products = Product.objects.filter(category=category)
        
        # Используем пагинацию, если она настроена
        page = self.paginate_queryset(products)
        if page is not None:
            serializer = ProductSerializer(page, many=True, context={'request': request})
            return self.get_paginated_response(serializer.data)
            
        serializer = ProductSerializer(products, many=True, context={'request': request})
        return Response(serializer.data)