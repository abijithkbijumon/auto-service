import React, { useState } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import RegistrationPersonalDetails from './RegistrationPersonalDetails';
import RegistrationVehicleDetails from './RegistrationVehicleDetails';
import RegistrationOTP from './RegistrationOTP';
import Login from './Login';
import './index.css';

function RegistrationFlow() {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState('slide-forward');
  const [personalData, setPersonalData] = useState(null);
  const [vehicleData, setVehicleData] = useState(null);
  const navigate = useNavigate();

  const handleNextPersonal = (data) => {
    setPersonalData(data);
    setDirection('slide-forward');
    setStep(2);
  };

  const handleNextVehicle = async (data) => {
    setVehicleData(data);

    const payload = {
      full_name: personalData.fullName,
      email: personalData.email,
      mob_no: personalData.mobile,
      password: personalData.password,
      user_id: personalData.userId,
      model_name: data.modelName,
      cc: parseInt(data.cc),
      bike_type: data.bikeType,
      registration_year: parseInt(data.registrationYear),
      identification_number: data.vin
    };

    try {
      const response = await fetch('http://127.0.0.1:8000/users/auth/register/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        setDirection('slide-forward');
        setStep(3);
      } else {
        const err = await response.json();
        alert('Registration error: ' + JSON.stringify(err));
      }
    } catch (error) {
      alert('Could not connect to the server. Please ensure the Django backend is running and env variables are correct.');
    }
  };

  const handleBackToPersonal = () => {
    setDirection('slide-backward');
    setStep(1);
  };

  const handleBackToVehicle = () => {
    setDirection('slide-backward');
    setStep(2);
  };

  const handleVerify = async (otp) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/users/auth/verify-otp/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: personalData.email, otp: otp })
      });

      if (response.ok) {
        // Upon success, change the URL to /login via react-router-dom!
        navigate('/login');
      } else {
        alert('Invalid OTP. Please double check the code.');
      }
    } catch (error) {
      alert('Could not connect to the server.');
    }
  };

  const handleResend = async () => {
    alert('Resend endpoint not yet wired to backend, please check your spam folder or register again.');
  };

  return (
    <div className="auth-container">
      <header className="auth-header">
        <div className="auth-logo">AutoService Pro</div>
        <div className="header-links">
          <a href="#" className="auth-help">Support</a>
          <a href="#" className="auth-help">Help Center</a>
          <a href="#" className="auth-login" onClick={(e) => { e.preventDefault(); navigate('/login'); }}>Log In</a>
        </div>
      </header>

      <main className="auth-main" style={{ overflow: 'hidden' }}>
        <div className="auth-card" style={{ position: 'relative', overflow: 'hidden' }}>
          {step === 1 && <RegistrationPersonalDetails key={`step1-${direction}`} onNext={handleNextPersonal} direction={direction} />}
          {step === 2 && <RegistrationVehicleDetails key={`step2-${direction}`} onNext={handleNextVehicle} onBack={handleBackToPersonal} direction={direction} />}
          {step === 3 && (
            <RegistrationOTP
              key={`step3-${direction}`}
              email={personalData?.email}
              onVerify={handleVerify}
              onBack={handleBackToVehicle}
              onResend={handleResend}
              direction={direction}
            />
          )}
        </div>
      </main>

      <footer className="auth-footer">
        <div>© 2024 AutoService Pro. All rights reserved.</div>
        <div className="footer-links">
          <span className="footer-link">Privacy Policy</span>
          <span className="footer-link">Terms of Service</span>
          <span className="footer-link">Contact Us</span>
        </div>
      </footer>
    </div>
  );
}

import Dashboard from './Dashboard';
import BookAppointment from './BookAppointment';
import AddVehicle from './AddVehicle';
import ServiceDetails from './ServiceDetails';
import PartReplacementDetails from './PartReplacementDetails';
import SelectVehicle from './SelectVehicle';
import Billing from './Billing';
import Confirmation from './Confirmation';
import ServiceHistory from './ServiceHistory';
import StaffRegistration from './StaffRegistration';
import StaffDashboard from './StaffDashboard';
import StaffAppointments from './StaffAppointments';
import StaffInventory from './StaffInventory';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/register" replace />} />
      <Route path="/register" element={<RegistrationFlow />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/add-vehicle" element={<AddVehicle />} />
      <Route path="/book-appointment" element={<BookAppointment />} />
      <Route path="/select-vehicle" element={<SelectVehicle />} />
      <Route path="/service-details" element={<ServiceDetails />} />
      <Route path="/part-replacement-details" element={<PartReplacementDetails />} />
      <Route path="/billing" element={<Billing />} />
      <Route path="/confirmation" element={<Confirmation />} />
      <Route path="/history" element={<ServiceHistory />} />

      {/* Staff Routes */}
      <Route path="/staff-register" element={<StaffRegistration />} />
      <Route path="/staff-dashboard" element={<StaffDashboard />} />
      <Route path="/staff-appointments" element={<StaffAppointments />} />
      <Route path="/staff-inventory" element={<StaffInventory />} />
    </Routes>
  );
}

export default App;
