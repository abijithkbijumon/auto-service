from rest_framework import serializers
from .models import BikeModel, Component, Vehicle, VehicleIssue, RepairOrder, RepairComponent, Appointment, InventoryPart

class BikeModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = BikeModel
        fields = '__all__'

class ComponentSerializer(serializers.ModelSerializer):
    bike_model_details = BikeModelSerializer(source='bike_model', read_only=True)
    
    class Meta:
        model = Component
        fields = '__all__'

class VehicleSerializer(serializers.ModelSerializer):
    bike_model_details = BikeModelSerializer(source='bike_model', read_only=True)

    class Meta:
        model = Vehicle
        fields = '__all__'
        read_only_fields = ('owner',)

class VehicleIssueSerializer(serializers.ModelSerializer):
    class Meta:
        model = VehicleIssue
        fields = '__all__'

class RepairComponentSerializer(serializers.ModelSerializer):
    component_name = serializers.CharField(source='component.name', read_only=True)
    price = serializers.SerializerMethodField()

    class Meta:
        model = RepairComponent
        fields = ['id', 'repair_order', 'component', 'component_name', 'service_type', 'quantity', 'price']
        read_only_fields = ('repair_order',)

    def get_price(self, obj):
        return obj.get_price()

class RepairOrderSerializer(serializers.ModelSerializer):
    components = RepairComponentSerializer(many=True, read_only=True)
    
    class Meta:
        model = RepairOrder
        fields = ['id', 'vehicle', 'issue', 'created_at', 'labor_charge', 'total_price', 'is_paid', 'components']

class AppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = '__all__'

class AppointmentReadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = '__all__'
        depth = 1

class InventoryPartSerializer(serializers.ModelSerializer):
    class Meta:
        model = InventoryPart
        fields = '__all__'
