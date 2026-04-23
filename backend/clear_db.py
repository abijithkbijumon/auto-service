import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from User.models import CustomUser, OTP
from Service.models import Vehicle

Vehicle.objects.all().delete()
CustomUser.objects.exclude(is_superuser=True).delete()
OTP.objects.all().delete()
print("Cleared old users and vehicles!")
