from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from django.core.mail import send_mail
from .models import CustomUser, OTP
from .serializers import RegistrationSerializer, OTPVerifySerializer
import random

class RegisterView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = RegistrationSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            
            # Generate 6-digit OTP (Hardcoded for testing)
            otp_code = "243600"
            OTP.objects.create(email=user.email, otp=otp_code)
            
            from django.conf import settings
            try:
                send_mail(
                    'Verify your Vehicle Service Account',
                    f'Your verification code is: {otp_code}',
                    settings.EMAIL_HOST_USER,
                    [user.email],
                    fail_silently=False,
                )
            except Exception as e:
                # Silently catch the email error during testing so the frontend can still proceed
                print(f"Failed to send email: {str(e)}")
            
            return Response({"message": "OTP sent to email. Please verify to activate account."}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class VerifyOTPView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = OTPVerifySerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            otp_entered = serializer.validated_data['otp']
            
            otp_obj = OTP.objects.filter(email=email, otp=otp_entered, is_verified=False).last()
            
            if not otp_obj or otp_obj.is_expired():
                return Response({"error": "Invalid or expired OTP"}, status=status.HTTP_400_BAD_REQUEST)
            
            # Activate User
            user = CustomUser.objects.get(email=email)
            user.is_active = True
            user.save()
            
            otp_obj.is_verified = True
            otp_obj.save()
            
            return Response({"message": "Account activated successfully!"}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

from django.contrib.auth import authenticate

class LoginView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        user = authenticate(email=email, password=password)
        if user:
            if not user.is_active:
                return Response({"error": "Account not activated. Please verify OTP."}, status=status.HTTP_403_FORBIDDEN)
            
            vehicles_data = []
            for vehicle in user.vehicles.all():
                vehicles_data.append({
                    "id": vehicle.id,
                    "model_name": vehicle.bike_model.name,
                    "cc": vehicle.bike_model.cc,
                    "bike_type": vehicle.bike_model.bike_type,
                    "identification_number": vehicle.identification_number,
                    "registration_year": vehicle.registration_year,
                    "distance_travel": vehicle.distance_travel,
                    "service_count": vehicle.service_count,
                    "last_service_date": vehicle.last_service_date,
                    "next_appointment_date": vehicle.next_appointment_date
                })

            # In a full production app, generate JWT token here.
            # Returning basic info for demonstration.
            return Response({
                "message": "Login successful",
                "user": {
                    "id": user.id,
                    "email": user.email,
                    "full_name": user.full_name,
                    "user_type": user.user_type,
                    "vehicles": vehicles_data
                }
            }, status=status.HTTP_200_OK)
        return Response({"error": "Invalid email or password"}, status=status.HTTP_401_UNAUTHORIZED)

class UserProfileView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        email = request.query_params.get('email')
        if not email:
            return Response({"error": "Email is required"}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            user = CustomUser.objects.get(email=email)
            vehicles_data = []
            for vehicle in user.vehicles.all():
                vehicles_data.append({
                    "id": vehicle.id,
                    "model_name": vehicle.bike_model.name,
                    "cc": vehicle.bike_model.cc,
                    "bike_type": vehicle.bike_model.bike_type,
                    "identification_number": vehicle.identification_number,
                    "registration_year": vehicle.registration_year,
                    "distance_travel": vehicle.distance_travel,
                    "service_count": vehicle.service_count,
                    "last_service_date": vehicle.last_service_date,
                    "next_appointment_date": vehicle.next_appointment_date
                })
            
            return Response({
                "user": {
                    "id": user.id,
                    "email": user.email,
                    "full_name": user.full_name,
                    "user_type": user.user_type,
                    "vehicles": vehicles_data
                }
            }, status=status.HTTP_200_OK)
        except CustomUser.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
