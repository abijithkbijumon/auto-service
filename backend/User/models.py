from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.utils import timezone
from django.conf import settings
import random

class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        if password:
            user.set_password(password)
        else:
            user.set_unusable_password()
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('user_type', 1)
        return self.create_user(email, password, **extra_fields)

class CustomUser(AbstractBaseUser, PermissionsMixin):
    SUPERUSER = 1
    STAFF = 2
    CUSTOMER = 3

    USER_TYPE_CHOICES = (
        (SUPERUSER, 'Superuser'),
        (STAFF, 'Staff'),
        (CUSTOMER, 'Customer'),
    )

    email = models.EmailField(unique=True)
    full_name = models.CharField(max_length=150)
    user_id = models.CharField(max_length=50, unique=True) # fullname_mobile
    mob_no = models.CharField(max_length=15, unique=True)
    user_type = models.PositiveSmallIntegerField(choices=USER_TYPE_CHOICES, default=CUSTOMER)
    
    is_active = models.BooleanField(default=False) # Inactive until OTP verified
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    
    address = models.CharField(max_length=255, blank=True)
    pincode = models.CharField(max_length=10, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['full_name', 'mob_no']

    def save(self, *args, **kwargs):
        if self.user_type == self.SUPERUSER:
            self.is_staff = self.is_superuser = True
        elif self.user_type == self.STAFF:
            self.is_staff = True
            self.is_superuser = False
        super().save(*args, **kwargs)

    def __str__(self):
        return self.email

class OTP(models.Model):
    email = models.EmailField()
    otp = models.CharField(max_length=6)
    created_at = models.DateTimeField(auto_now_add=True)
    is_verified = models.BooleanField(default=False)

    def is_expired(self):
        # 10 minute expiry
        return timezone.now() > self.created_at + timezone.timedelta(minutes=10)
