from django.db import models
from django.db import models
from django.contrib.auth import get_user_model
from django.contrib.auth.models import User

# Create your models here.
class Customer(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='participant')
    age = models.SmallIntegerField()
    phoneNumber = models.CharField(max_length=11, unique=True)

    def __str__(self):
        return f"Name: {self.user.first_name} , Phone number: {self.phoneNumber}."
    
class ModeratorProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='moderator_profile')
    is_moderator = models.BooleanField(default=True)
    
    def __str__(self):
        return f"Moderator: {self.user.username}"

class ActiveProductManager(models.Manager):
    def get_queryset(self):
        return super().get_queryset().filter(is_active=True)
    
class Category(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name
    
    
class Product(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    image = models.URLField(blank=True)  
    category = models.ForeignKey(Category, related_name='products', on_delete=models.CASCADE)
    brand = models.CharField(max_length=100, null=True, blank=True)
    created_by = models.ForeignKey(get_user_model(), on_delete=models.CASCADE, limit_choices_to={'moderator_profile__is_moderator': True})
    is_active = models.BooleanField(default=True)
    objects = models.Manager()
    active = ActiveProductManager()

    def __str__(self):
        return self.title

class CartItem(models.Model):
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)

    def __str__(self):
        return f"{self.product.title} ({self.quantity})"