import React, { useState, useRef } from 'react';
import './index.css';

function RegistrationOTP({ email, onVerify, onBack, onResend, direction }) {
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const inputRefs = useRef([]);

    const handleChange = (index, value) => {
        if (isNaN(value)) return;
        const newOtp = [...otp];
        newOtp[index] = value.substring(value.length - 1);
        setOtp(newOtp);

        if (value && index < 5) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const otpValue = otp.join('');
        if (otpValue.length === 6 && onVerify) {
            onVerify(otpValue);
        }
    };

    return (
        <div className={`step-content ${direction}`}>
            <div className="auth-steps" style={{ marginBottom: '24px' }}>
                <span className="step-text">STEP 3 OF 3</span>
                <div className="step-bars" style={{ margin: '0 16px' }}>
                    <div className="step-bar" style={{ background: '#0d9488' }}></div>
                    <div className="step-bar" style={{ background: '#0d9488' }}></div>
                    <div className="step-bar" style={{ background: '#0d9488' }}></div>
                </div>
                <span className="step-text right" style={{ color: '#0d9488' }}>FINAL STEP</span>
            </div>

            <h1 className="auth-title" style={{ textAlign: 'center', marginBottom: '8px' }}>Verify Your Email</h1>
            <p className="auth-subtitle" style={{ textAlign: 'center', margin: '0 0 32px 0' }}>
                We've sent a 6-digit verification code to<br />
                <strong>{email || 'alex@example.com'}</strong>
            </p>

            <form onSubmit={handleSubmit}>
                <div className="otp-inputs">
                    {otp.map((digit, i) => (
                        <input
                            key={i}
                            ref={(el) => (inputRefs.current[i] = el)}
                            type="text"
                            className="otp-input"
                            value={digit}
                            onChange={(e) => handleChange(i, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(i, e)}
                        />
                    ))}
                </div>

                <button type="submit" className="btn-primary" style={{ backgroundColor: '#F97316', marginTop: '32px' }}>
                    Verify
                </button>

                <div className="resend-text">
                    Didn't receive the code? <button type="button" className="btn-link" onClick={onResend}>Resend OTP</button>
                </div>

                <div className="divider" style={{ margin: '32px 0 24px 0' }}></div>

                <div className="secure-verification">
                    <div className="sv-icon-wrapper">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                            <path d="M12 8v4"></path>
                            <circle cx="12" cy="16" r="1"></circle>
                        </svg>
                    </div>
                    <div className="sv-content">
                        <span className="sv-title">SECURE VERIFICATION</span>
                        <span className="sv-text">
                            This verification ensures the security of your vehicle data<br />
                            and service history according to our privacy protocols.
                        </span>
                    </div>
                </div>
            </form>

            <div className="back-link-wrapper" style={{ display: 'flex', justifyContent: 'center', marginTop: '32px' }}>
                <button type="button" className="btn-back-ghost" onClick={onBack}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '6px' }}>
                        <line x1="19" y1="12" x2="5" y2="12"></line>
                        <polyline points="12 19 5 12 12 5"></polyline>
                    </svg>
                    BACK TO VEHICLE ENTRY
                </button>
            </div>
        </div>
    );
}

export default RegistrationOTP;
