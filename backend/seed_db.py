import os
import django
from datetime import datetime, timedelta
import random

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")
django.setup()

from User.models import CustomUser
from Service.models import BikeModel, Vehicle, Appointment, InventoryPart, RepairOrder, VehicleIssue

def seed():
    print("Clearing old dummy data...")
    RepairOrder.objects.all().delete()
    VehicleIssue.objects.all().delete()
    Appointment.objects.all().delete()
    Vehicle.objects.all().delete()
    BikeModel.objects.all().delete()
    InventoryPart.objects.all().delete()
    
    # Delete test users
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

    print("Creating BikeModels...")
    b1 = BikeModel.objects.create(name="Model S", cc=2000, bike_type="Sedan")
    b2 = BikeModel.objects.create(name="Wrangler", cc=2500, bike_type="SUV")
    b3 = BikeModel.objects.create(name="911", cc=3000, bike_type="Coupe")
    b4 = BikeModel.objects.create(name="X5", cc=2500, bike_type="SUV")
    b_models = [b1, b2, b3, b4]

    print("Creating Inventory...")
    InventoryPart.objects.create(name="Synthetic Oil 5W-30", stock_quantity=85, price=12.50)
    InventoryPart.objects.create(name="Ceramic Brake Pads [Front]", stock_quantity=4, price=45.99)
    InventoryPart.objects.create(name="Premium Air Filter", stock_quantity=22, price=18.25)
    InventoryPart.objects.create(name="Iridium Spark Plug", stock_quantity=49, price=8.75)

    print("Creating Vehicles, Appointments & Revenue Data...")
    today = datetime.now()
    service_types = ["Annual Maintenance", "Oil & Filter Change", "Brake System Repair", "Tire Rotation", "Electrical Diagnostic"]
    
    # 1. Past 30 Days of Revenue Data
    for i in range(30):
        date_point = today - timedelta(days=i)
        
        # Create 1-3 repair orders per day for the last 30 days
        for _ in range(random.randint(1, 3)):
            user = random.choice(customers)
            v = Vehicle.objects.create(
                owner=user,
                bike_model=random.choice(b_models),
                identification_number=f"VIN-{random.randint(100000, 999999)}",
                registration_year=random.randint(2015, 2023),
            )
            
            issue = VehicleIssue.objects.create(
                vehicle=v,
                description=random.choice(service_types),
                is_resolved=True
            )
            
            ro = RepairOrder.objects.create(
                vehicle=v,
                issue=issue,
                labor_charge=random.randint(50, 150),
                total_price=random.randint(200, 800),
                is_paid=True
            )
            # Manually set created_at as it's auto_now_add
            RepairOrder.objects.filter(pk=ro.pk).update(created_at=date_point)

    # 2. Add some UNPAID (Outstanding) orders
    for _ in range(5):
        user = random.choice(customers)
        v = Vehicle.objects.create(
            owner=user,
            bike_model=random.choice(b_models),
            identification_number=f"VIN-P-{random.randint(100000, 999999)}",
            registration_year=2022,
        )
        RepairOrder.objects.create(
            vehicle=v,
            labor_charge=100,
            total_price=550.50,
            is_paid=False
        )

    # 3. Appointments for Today/Tomorrow
    for i in range(15):
        is_tomorrow = i > 10
        appt_date = (today + timedelta(days=1)).date() if is_tomorrow else today.date()
        user = random.choice(customers)
        v = Vehicle.objects.create(
            owner=user,
            bike_model=random.choice(b_models),
            identification_number=f"VIN-A-{random.randint(10000, 99999)}",
            registration_year=2021,
        )
        Appointment.objects.create(
            owner=user,
            vehicle=v,
            service_type=random.choice(service_types),
            appointment_date=appt_date,
            appointment_time=f"{random.randint(9, 16):02d}:00:00",
            status="Scheduled" if is_tomorrow else "In Progress"
        )
        
    print("SUCCESS: Database fully seeded with rich test data and 30-day revenue history!")

if __name__ == '__main__':
    seed()
