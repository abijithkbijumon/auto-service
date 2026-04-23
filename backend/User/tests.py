from django.test import TestCase
from .models import CustomUser, OTP
from django.utils import timezone
from datetime import timedelta

class UserModelTest(TestCase):
    def test_create_user(self):
        user = CustomUser.objects.create_user(
            email='test@example.com',
            password='testpassword',
            full_name='Test User',
            mob_no='1234567890',
            user_id='Test_User_1234567890'
        )
        self.assertEqual(user.email, 'test@example.com')
        self.assertTrue(user.check_password('testpassword'))
        self.assertEqual(user.user_type, CustomUser.CUSTOMER)
        self.assertFalse(user.is_staff)
        self.assertFalse(user.is_superuser)

    def test_create_superuser(self):
        admin_user = CustomUser.objects.create_superuser(
            email='admin@example.com',
            password='adminpassword',
            full_name='Admin User',
            mob_no='0987654321',
            user_id='Admin_User_0987654321'
        )
        self.assertEqual(admin_user.email, 'admin@example.com')
        self.assertTrue(admin_user.check_password('adminpassword'))
        self.assertTrue(admin_user.is_staff)
        self.assertTrue(admin_user.is_superuser)

class OTPModelTest(TestCase):
    def test_otp_expiration(self):
        otp = OTP.objects.create(email='test@example.com', otp='123456')
        self.assertFalse(otp.is_expired())
        
        # Manually set created_at back by 11 minutes
        otp.created_at = timezone.now() - timedelta(minutes=11)
        otp.save()
        
        self.assertTrue(otp.is_expired())
