import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RegistrationPersonalDetails from './RegistrationPersonalDetails';
import RegistrationOTP from './RegistrationOTP';
import './index.css';

function StaffRegistration() {
    const [step, setStep] = useState(1);
    const [direction, setDirection] = useState('slide-forward');
    const [personalData, setPersonalData] = useState(null);
    const navigate = useNavigate();

    const handleNextPersonal = async (data) => {
        setPersonalData(data);

        const payload = {
            full_name: data.fullName,
            email: data.email,
            mob_no: data.mobile,
            password: data.password,
            user_id: data.userId,
            user_type: 2
        };

        try {
            const response = await fetch('http://127.0.0.1:8000/users/auth/register/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                setDirection('slide-forward');
                setStep(2);
            } else {
                const err = await response.json();
                alert('Staff Registration error: ' + JSON.stringify(err));
            }
        } catch (error) {
            alert('Could not connect to the server. Please ensure the Django backend is running and env variables are correct.');
        }
    };

    const handleBackToPersonal = () => {
        setDirection('slide-backward');
        setStep(1);
    };

    const handleVerify = async (otp) => {
        try {
            const response = await fetch('http://127.0.0.1:8000/users/auth/verify-otp/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: personalData.email, otp: otp })
            });

            if (response.ok) {
                navigate('/login');
            } else {
                alert('Invalid OTP. Please double check the code.');
            }
        } catch (error) {
            alert('Could not connect to the server.');
        }
    };

    const handleResend = async () => {
        alert('Code has been resent (mock backend behavior)');
    };

    return (
        <div className="auth-container">
            <header className="auth-header">
                <div className="auth-logo">AutoService Pro Staff</div>
                <div className="header-links">
                    <a href="#" className="auth-help" onClick={(e) => { e.preventDefault(); navigate('/staff-dashboard'); }}>Staff Dashboard</a>
                    <a href="#" className="auth-login" onClick={(e) => { e.preventDefault(); navigate('/login'); }}>Log In</a>
                </div>
            </header>

            <main className="auth-main" style={{ overflow: 'hidden' }}>
                <div className="auth-card" style={{ position: 'relative', overflow: 'hidden' }}>
                    {step === 1 && <RegistrationPersonalDetails key={`step1-${direction}`} onNext={handleNextPersonal} direction={direction} />}
                    {step === 2 && (
                        <RegistrationOTP
                            key={`step2-${direction}`}
                            email={personalData?.email}
                            onVerify={handleVerify}
                            onBack={handleBackToPersonal}
                            onResend={handleResend}
                            direction={direction}
                        />
                    )}
                </div>
            </main>

            <footer className="auth-footer">
                <div>© 2024 AutoService Staff Portal. All rights reserved.</div>
            </footer>
        </div>
    );
}

export default StaffRegistration;
