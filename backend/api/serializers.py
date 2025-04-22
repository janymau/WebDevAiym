from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Customer, ModeratorProfile, Category, Product, CartItem

class RegisterSerializer(serializers.ModelSerializer):
    age = serializers.IntegerField(write_only=True)
    phoneNumber = serializers.CharField(max_length=11, write_only=True)

    class Meta:
        model = User
        fields = ['username', 'password', 'first_name', 'last_name', 'age', 'phoneNumber']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        username = validated_data.get('username')
        password = validated_data.get('password')
        first_name = validated_data.get('first_name', '')
        last_name = validated_data.get('last_name', '')
        age = validated_data.get('age')
        phone = validated_data.get('phoneNumber')  # Используй phone, а не phoneNumber

        # Создаём пользователя
        user = User.objects.create_user(
            username=username,
            password=password,
            first_name=first_name,
            last_name=last_name
        )

        # Создаём участника
        Customer.objects.create(
            user=user,
            age=age,
            phoneNumber=phone  # Используй phone как здесь
        )

        return user

class ModeratorRegisterSerializer(serializers.ModelSerializer):
    age = serializers.IntegerField(write_only=True)
    phoneNumber = serializers.CharField(max_length=11, write_only=True)

    class Meta:
        model = User
        fields = ['username', 'password', 'first_name', 'last_name', 'age', 'phoneNumber']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password'],
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', '')
        )
        
        Customer.objects.create(
            user=user,
            age=validated_data['age'],
            phoneNumber=validated_data['phoneNumber']
        )
        
        ModeratorProfile.objects.create(
            user=user,
            is_moderator=True
        )
        
        return user

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'password', 'first_name', 'last_name')
        extra_kwargs = {'password': {'write_only': True}}

class CustomerSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    
    class Meta:
        model = Customer
        fields = ('user', 'age', 'phoneNumber')

    def create(self, validated_data):
        user_data = validated_data.pop('user')
        user = User.objects.create_user(**user_data)
        customer = Customer.objects.create(user=user, **validated_data)
        return customer
class ModeratorProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = ModeratorProfile
        fields = ['id', 'is_moderator', 'user']

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class ProductSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    created_by = UserSerializer(read_only=True)

    class Meta:
        model = Product
        fields = '__all__'
        extra_kwargs = {
            'created_by': {'read_only': True}
        }

class CreateProductSerializer(serializers.ModelSerializer):
    category = serializers.PrimaryKeyRelatedField(queryset=Category.objects.all())
    created_by = serializers.HiddenField(default=serializers.CurrentUserDefault())
    
    class Meta:
        model = Product
        fields = ['title', 'description', 'price', 'image', 'category', 'is_active', 'created_by']
        
    def validate(self, data):
        if not self.context['request'].user.moderator_profile.is_moderator:
            raise serializers.ValidationError("Only moderators can create products")
        return data

class CartItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)
    user = UserSerializer(read_only=True)

    class Meta:
        model = CartItem
        fields = ['id', 'user', 'product', 'quantity']
        extra_kwargs = {
            'user': {'read_only': True}
        }

class AddToCartSerializer(serializers.ModelSerializer):
    class Meta:
        model = CartItem
        fields = ['product', 'quantity']