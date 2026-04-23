from rest_framework import serializers
from .models import CustomUser, OTP
from Service.models import BikeModel, Vehicle
from django.db import transaction

class RegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    model_name = serializers.CharField(write_only=True, required=False)
    cc = serializers.IntegerField(write_only=True, required=False)
    bike_type = serializers.CharField(write_only=True, required=False)
    registration_year = serializers.IntegerField(write_only=True, required=False)
    distance_travel = serializers.IntegerField(write_only=True, required=False)
    identification_number = serializers.CharField(write_only=True, required=False, allow_null=True)
    user_id = serializers.CharField(write_only=True, required=False, allow_null=True)

    user_type = serializers.IntegerField(required=False)

    class Meta:
        model = CustomUser
        fields = ['full_name', 'email', 'mob_no', 'password', 'model_name', 'cc', 'bike_type', 'registration_year', 'distance_travel', 'identification_number', 'user_id', 'user_type']

    @transaction.atomic
    def create(self, validated_data):
        model_name = validated_data.pop('model_name', None)
        cc = validated_data.pop('cc', None)
        bike_type = validated_data.pop('bike_type', None)
        registration_year = validated_data.pop('registration_year', None)
        
        distance_travel = validated_data.pop('distance_travel', 0)
        identification_number = validated_data.pop('identification_number', None)
        user_id = validated_data.pop('user_id', None)
        user_type = validated_data.pop('user_type', 3) # default to CUSTOMER

        user_id_gen = f"{validated_data['full_name']}_{validated_data['mob_no']}" if not user_id else user_id

        user = CustomUser.objects.create_user(
            email=validated_data['email'],
            password=validated_data['password'],
            full_name=validated_data['full_name'],
            mob_no=validated_data['mob_no'],
            user_id=user_id_gen,
            user_type=user_type,
            is_staff=True if user_type == 2 else False # set is_staff appropriately
        )

        if model_name and cc and bike_type:
            bike_model, created = BikeModel.objects.get_or_create(
                name=model_name,
                cc=cc,
                bike_type=bike_type
            )
            Vehicle.objects.create(
                owner=user,
                bike_model=bike_model,
                distance_travel=distance_travel,
                identification_number=identification_number,
                registration_year=registration_year
            )

        return user

class OTPVerifySerializer(serializers.Serializer):
    email = serializers.EmailField()
    otp = serializers.CharField(max_length=6)
