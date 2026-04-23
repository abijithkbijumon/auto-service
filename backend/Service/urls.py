from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    BikeModelViewSet, ComponentViewSet, VehicleViewSet, VehicleIssueViewSet, 
    RepairOrderViewSet, RevenueViewSet, AppointmentViewSet, InventoryPartViewSet
)

router = DefaultRouter()
router.register(r'bike-models', BikeModelViewSet)
router.register(r'components', ComponentViewSet)
router.register(r'vehicles', VehicleViewSet)
router.register(r'issues', VehicleIssueViewSet)
router.register(r'repair-orders', RepairOrderViewSet)
router.register(r'appointments', AppointmentViewSet)
router.register(r'inventory', InventoryPartViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('revenue/', RevenueViewSet.as_view({'get': 'list'}), name='revenue'),
]
