from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import BikeModel, Component, Vehicle, VehicleIssue, RepairOrder, RepairComponent, Appointment, InventoryPart
from .serializers import (
    BikeModelSerializer, ComponentSerializer, VehicleSerializer, VehicleIssueSerializer, 
    RepairOrderSerializer, RepairComponentSerializer, AppointmentSerializer, InventoryPartSerializer
)
from django.db.models import Sum, Count, Q, Avg
from django.db.models.functions import TruncDay
from django.utils import timezone
from datetime import timedelta

class BikeModelViewSet(viewsets.ModelViewSet):
    queryset = BikeModel.objects.all()
    serializer_class = BikeModelSerializer
    permission_classes = [permissions.AllowAny]

class ComponentViewSet(viewsets.ModelViewSet):
    queryset = Component.objects.all()
    serializer_class = ComponentSerializer
    permission_classes = [permissions.AllowAny]

class VehicleViewSet(viewsets.ModelViewSet):
    queryset = Vehicle.objects.all()
    serializer_class = VehicleSerializer
    permission_classes = [permissions.AllowAny]

    def perform_create(self, serializer):
        # Default to the first user for simplicity if no user authenticated.
        from User.models import CustomUser
        user = self.request.user if self.request.user.is_authenticated else CustomUser.objects.first()
        serializer.save(owner=user)

class VehicleIssueViewSet(viewsets.ModelViewSet):
    queryset = VehicleIssue.objects.all()
    serializer_class = VehicleIssueSerializer
    permission_classes = [permissions.AllowAny]

class RepairOrderViewSet(viewsets.ModelViewSet):
    queryset = RepairOrder.objects.all()
    serializer_class = RepairOrderSerializer
    permission_classes = [permissions.AllowAny]

    @action(detail=True, methods=['post'])
    def add_component(self, request, pk=None):
        repair_order = self.get_object()
        serializer = RepairComponentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(repair_order=repair_order)
            repair_order.calculate_total_price()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    @action(detail=True, methods=['post'])
    def process_payment(self, request, pk=None):
        repair_order = self.get_object()
        repair_order.is_paid = True
        repair_order.save()
        return Response({'status': 'Payment successful', 'total_paid': repair_order.total_price})

    @action(detail=False, methods=['get'])
    def dashboard_stats(self, request):
        today = timezone.now()
        start_of_month = today.replace(day=1, hour=0, minute=0, second=0)
        
        # 1. Total Revenue (All paid orders)
        total_revenue = RepairOrder.objects.filter(is_paid=True).aggregate(Sum('total_price'))['total_price__sum'] or 0

        # 2. Outstanding Payments (Unpaid)
        outstanding = RepairOrder.objects.filter(is_paid=False).aggregate(Sum('total_price'))['total_price__sum'] or 0

        # 3. Average Service Value
        avg_value = RepairOrder.objects.filter(is_paid=True).aggregate(Avg('total_price'))['total_price__avg'] or 0

        # 4. Daily Revenue Distribution (Last 30 days)
        last_30_days = today - timedelta(days=30)
        daily_revenue = (
            RepairOrder.objects.filter(is_paid=True, created_at__gte=last_30_days)
            .annotate(day=TruncDay('created_at'))
            .values('day')
            .annotate(revenue=Sum('total_price'))
            .order_by('day')
        )

        # 5. Revenue by Category (Mock logic - adjust based on your 'issue' or 'service_type')
        # This assumes you have a way to categorize orders
        category_data = [
            {"name": "Regular Service", "value": 45},
            {"name": "Repairs", "value": 30},
            {"name": "Performance", "value": 25},
        ]

        return Response({
            "summary": {
                "total_revenue": total_revenue,
                "monthly_growth": 12,  # Logic for growth calculation needed
                "avg_service_value": round(avg_value, 2),
                "outstanding_payments": outstanding,
            },
            "daily_distribution": list(daily_revenue),
            "categories": category_data
        })

class RevenueViewSet(viewsets.ViewSet):
    permission_classes = [permissions.AllowAny]

    def list(self, request):
        now = timezone.now()
        
        # Current day
        today_orders = RepairOrder.objects.filter(is_paid=True, created_at__date=now.date())
        daily_revenue = today_orders.aggregate(Sum('total_price'))['total_price__sum'] or 0
        
        # Current month
        month_orders = RepairOrder.objects.filter(is_paid=True, created_at__year=now.year, created_at__month=now.month)
        monthly_revenue = month_orders.aggregate(Sum('total_price'))['total_price__sum'] or 0
        
        # Current year
        year_orders = RepairOrder.objects.filter(is_paid=True, created_at__year=now.year)
        yearly_revenue = year_orders.aggregate(Sum('total_price'))['total_price__sum'] or 0
        
        return Response({
            'daily_revenue': daily_revenue,
            'monthly_revenue': monthly_revenue,
            'yearly_revenue': yearly_revenue
        })

class AppointmentViewSet(viewsets.ModelViewSet):
    # allow any so we can book
    permission_classes = [permissions.AllowAny]
    queryset = Appointment.objects.all()
    
    def get_serializer_class(self):
        if self.action in ['list', 'retrieve']:
            from .serializers import AppointmentReadSerializer
            return AppointmentReadSerializer
        return AppointmentSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        date = self.request.query_params.get('date', None)
        if date:
            qs = qs.filter(appointment_date=date)
        owner = self.request.query_params.get('owner', None)
        if owner:
            qs = qs.filter(owner_id=owner)
        return qs

class InventoryPartViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.AllowAny]
    queryset = InventoryPart.objects.all()
    serializer_class = InventoryPartSerializer
