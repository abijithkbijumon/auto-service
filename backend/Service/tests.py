from django.test import TestCase
from .models import BikeModel, Component, Vehicle, RepairOrder, RepairComponent, VehicleIssue
from User.models import CustomUser
from django.utils import timezone
from datetime import date, timedelta
from decimal import Decimal

class ServiceModelTest(TestCase):
    def setUp(self):
        self.user = CustomUser.objects.create_user(
            email='testuser@example.com',
            full_name='Test User',
            mob_no='1234567890',
            user_id='Test_User'
        )
        self.bike = BikeModel.objects.create(
            bike_type='Sports',
            name='Test Bike',
            cc=250
        )
        self.vehicle = Vehicle.objects.create(
            owner=self.user,
            bike_model=self.bike,
            identification_number='TEST-123'
        )

    def test_vehicle_next_appointment_new(self):
        # New vehicle (service_count = 0)
        expected_date = self.vehicle.created_at.date() + timedelta(days=50)
        self.assertEqual(self.vehicle.next_appointment_date, expected_date)

    def test_vehicle_next_appointment_after_service(self):
        # Vehicle after service
        self.vehicle.service_count = 1
        self.vehicle.last_service_date = date.today()
        self.vehicle.save()
        
        expected_date = date.today() + timedelta(days=182)
        self.assertEqual(self.vehicle.next_appointment_date, expected_date)

    def test_repair_order_calculation(self):
        comp = Component.objects.create(
            bike_model=self.bike,
            name='Engine Oil',
            purchase_price=Decimal('500.00'),
            repair_price=Decimal('100.00'),
            stock=10
        )
        
        issue = VehicleIssue.objects.create(
            vehicle=self.vehicle,
            description='Oil change'
        )
        
        order = RepairOrder.objects.create(
            vehicle=self.vehicle,
            issue=issue,
            labor_charge=Decimal('200.00')
        )
        
        RepairComponent.objects.create(
            repair_order=order,
            component=comp,
            service_type=RepairComponent.NEW,
            quantity=1
        )
        
        order.calculate_total_price()
        # 500 (new comp) + 200 (labor) = 700
        self.assertEqual(order.total_price, Decimal('700.00'))
