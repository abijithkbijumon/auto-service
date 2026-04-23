import os
import django
from datetime import datetime, timedelta
import random

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")
django.setup()

from User.models import CustomUser
from Service.models import BikeModel, Vehicle, Appointment, InventoryPart

def seed():
    print("Clearing old dummy data (CustomUsers, Appointments, Vehicles, BikeModels, Parts)...")
    Appointment.objects.all().delete()
    Vehicle.objects.all().delete()
    BikeModel.objects.all().delete()
    InventoryPart.objects.all().delete()
    # Delete test users, leaving any previous manually created superusers untouched
    CustomUser.objects.filter(is_superuser=False).delete()

    print("Creating Staff User...")
    staff = CustomUser.objects.create_user(
        email="staff@autoservice.com",
        password="password123",
        full_name="John Staff",
        mob_no="5554443333",
        user_id="john_staff_01",
        user_type=2,
        is_active=True
    )
    staff.is_staff = True
    staff.save()
    
    print("Creating Customers...")
    customers = []
    for i in range(1, 6):
        c = CustomUser.objects.create_user(
            email=f"customer{i}@autoservice.com",
            password="password123",
            full_name=f"Test Customer {i}",
            mob_no=f"999888770{i}",
            user_id=f"customer_{i}",
            user_type=3,
            is_active=True
        )
        customers.append(c)

    print("Creating BikeModels & InventoryParts...")
    b1 = BikeModel.objects.create(name="Model S", cc=2000, bike_type="Sedan")
    b2 = BikeModel.objects.create(name="Wrangler", cc=2500, bike_type="SUV")
    b3 = BikeModel.objects.create(name="911", cc=3000, bike_type="Coupe")
    b4 = BikeModel.objects.create(name="X5", cc=2500, bike_type="SUV")
    b_models = [b1, b2, b3, b4]

    InventoryPart.objects.create(name="Synthetic Oil 5W-30", stock_quantity=85, price=12.50)
    InventoryPart.objects.create(name="Ceramic Brake Pads [Front]", stock_quantity=4, price=45.99)
    InventoryPart.objects.create(name="Premium Air Filter", stock_quantity=22, price=18.25)
    InventoryPart.objects.create(name="Iridium Spark Plug", stock_quantity=49, price=8.75)
    InventoryPart.objects.create(name="Transmission Fluid", stock_quantity=3, price=28.50)
    InventoryPart.objects.create(name="Battery 12V", stock_quantity=12, price=120.00)

    print("Creating Vehicles & Appointments...")
    today = datetime.now().date()
    statuses_today = ["Scheduled", "In Progress", "Ready for Pickup", "Issue Detected"]
    service_types = ["Annual Maintenance", "Oil & Filter Change", "Brake System Repair", "Tire Rotation", "Full Electrical Diagnostic", "Transmission Check"]
    
    # Generate 14 random appointments for TODAY
    for i in range(14):
        user = random.choice(customers)
        v = Vehicle.objects.create(
            owner=user,
            bike_model=random.choice(b_models),
            identification_number=f"VIN-{random.randint(10000, 99999)}",
            registration_year=random.randint(2015, 2023),
            distance_travel=random.randint(15000, 80000),
            service_count=random.randint(1, 10)
        )
        
        Appointment.objects.create(
            owner=user,
            vehicle=v,
            service_type=random.choice(service_types),
            appointment_date=today,
            appointment_time=f"{random.randint(9, 16):02d}:{(random.choice([0, 15, 30, 45])):02d}:00",
            status=random.choice(statuses_today)
        )

    # Generate 8 random appointments for TOMORROW
    for i in range(8):
        user = random.choice(customers)
        v = Vehicle.objects.create(
            owner=user,
            bike_model=random.choice(b_models),
            identification_number=f"VIN-{random.randint(10000, 99999)}",
            registration_year=random.randint(2015, 2023),
            distance_travel=random.randint(15000, 80000),
            service_count=random.randint(1, 10)
        )
        
        Appointment.objects.create(
            owner=user,
            vehicle=v,
            service_type=random.choice(service_types),
            appointment_date=today + timedelta(days=1),
            appointment_time=f"{random.randint(9, 16):02d}:{(random.choice([0, 15, 30, 45])):02d}:00",
            status="Scheduled"
        )
        
    print("SUCCESS: Database fully seeded with rich test data!")

if __name__ == '__main__':
    seed()
