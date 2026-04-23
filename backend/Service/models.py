from django.db import models
from User.models import CustomUser

class BikeModel(models.Model):
    bike_type = models.CharField(max_length=100) # e.g., Scooter, Sports, Cruiser, Commuter
    name = models.CharField(max_length=100) # model name
    cc = models.IntegerField()
    
    def __str__(self):
        return f"{self.name} ({self.cc}cc) - {self.bike_type}"

class Component(models.Model):
    bike_model = models.ForeignKey(BikeModel, on_delete=models.CASCADE, related_name='components')
    name = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    purchase_price = models.DecimalField(max_digits=10, decimal_places=2, default=0.0) 
    repair_price = models.DecimalField(max_digits=10, decimal_places=2, default=0.0) 
    stock = models.IntegerField(default=0)
    
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} for {self.bike_model.name}"

class Vehicle(models.Model):
    owner = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='vehicles')
    bike_model = models.ForeignKey(BikeModel, on_delete=models.PROTECT)
    identification_number = models.CharField(max_length=100, unique=True, null=True, blank=True) # License plate
    distance_travel = models.IntegerField(default=0) # km
    registration_year = models.IntegerField(null=True, blank=True)
    
    service_count = models.IntegerField(default=0)
    last_service_date = models.DateField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True)

    @property
    def next_appointment_date(self):
        from datetime import timedelta
        from django.utils import timezone
        
        if self.service_count == 0:
            base_date = self.created_at.date() if self.created_at else timezone.now().date()
            return base_date + timedelta(days=50)
        else:
            if self.last_service_date:
                return self.last_service_date + timedelta(days=182) # approx 6 months
            else:
                base_date = self.created_at.date() if self.created_at else timezone.now().date()
                return base_date + timedelta(days=182)
    
    def __str__(self):
        return f"{self.bike_model.name} ({self.identification_number or 'No ID'})"

class VehicleIssue(models.Model):
    vehicle = models.ForeignKey(Vehicle, on_delete=models.CASCADE, related_name='issues')
    description = models.TextField()
    is_resolved = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"Issue for {self.vehicle}: {self.description[:20]}"

class RepairOrder(models.Model):
    vehicle = models.ForeignKey(Vehicle, on_delete=models.CASCADE, related_name='repair_orders')
    issue = models.ForeignKey(VehicleIssue, on_delete=models.SET_NULL, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    labor_charge = models.DecimalField(max_digits=10, decimal_places=2, default=0.0)
    total_price = models.DecimalField(max_digits=10, decimal_places=2, default=0.0)
    is_paid = models.BooleanField(default=False)

    def calculate_total_price(self):
        components_total = sum([item.get_price() for item in self.components.all()])
        self.total_price = components_total + self.labor_charge
        self.save()

    def __str__(self):
        return f"Order #{self.id} - {self.vehicle}"

class RepairComponent(models.Model):
    NEW = 'new'
    REPAIR = 'repair'
    SERVICE_TYPE_CHOICES = [
        (NEW, 'New Component'),
        (REPAIR, 'Repair Service'),
    ]

    repair_order = models.ForeignKey(RepairOrder, on_delete=models.CASCADE, related_name='components')
    component = models.ForeignKey(Component, on_delete=models.CASCADE)
    service_type = models.CharField(max_length=10, choices=SERVICE_TYPE_CHOICES)
    quantity = models.PositiveIntegerField(default=1)

    def get_price(self):
        if self.service_type == self.NEW:
            return self.component.purchase_price * self.quantity
        else:
            return self.component.repair_price * self.quantity

class Appointment(models.Model):
    owner = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='appointments', null=True, blank=True)
    vehicle = models.ForeignKey(Vehicle, on_delete=models.CASCADE, related_name='appointments', null=True, blank=True)
    service_type = models.CharField(max_length=100)
    appointment_date = models.DateField()
    appointment_time = models.TimeField()
    status = models.CharField(max_length=50, default='Pending')

    def __str__(self):
        return f"{self.service_type} on {self.appointment_date} at {self.appointment_time}"

class InventoryPart(models.Model):
    name = models.CharField(max_length=150, unique=True)
    stock_quantity = models.IntegerField(default=0)
    price = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)

    def __str__(self):
        return f"{self.name} - Stock: {self.stock_quantity}"
