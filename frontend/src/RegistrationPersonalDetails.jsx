import React, { useState } from 'react';
import './index.css';

function RegistrationPersonalDetails({ onNext, direction }) {
  const [formData, setFormData] = useState({
    fullName: '',
    userId: '',
    email: '',
    mobile: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onNext) onNext(formData);
  };

  return (
    <div className={`step-content ${direction}`}>
      <div className="auth-steps">
        <span className="step-text">STEP 1 OF 3</span>
        <div className="step-bars" style={{ margin: '0 16px' }}>
          <div className="step-bar active"></div>
          <div className="step-bar" style={{ background: '#e2e8f0' }}></div>
          <div className="step-bar" style={{ background: '#e2e8f0' }}></div>
        </div>
        <span className="step-text right">REGISTRATION</span>
      </div>

      <h1 className="auth-title">Personal Details</h1>
      <p className="auth-subtitle">
        Please provide your basic information to set up your<br />
        MotoServe account and start managing your vehicle service.
      </p>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">FULL NAME</label>
          <input
            type="text"
            name="fullName"
            className="form-input"
            placeholder="e.g. Alexander Sterling"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">USER ID</label>
          <div className="form-input-container">
            <input
              type="text"
              name="userId"
              className="form-input"
              placeholder="username123"
              value={formData.userId}
              onChange={handleChange}
              required
            />
            <svg className="form-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="16" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12.01" y2="8"></line>
            </svg>
          </div>
          <span className="form-hint">This will be your unique identifier within our fleet system.</span>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">EMAIL ADDRESS</label>
            <input
              type="email"
              name="email"
              className="form-input"
              placeholder="alex@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">MOBILE NUMBER</label>
            <input
              type="tel"
              name="mobile"
              className="form-input"
              placeholder="+1 (555) 000-0000"
              value={formData.mobile}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">PASSWORD</label>
          <div className="form-input-container">
            <input
              type="password"
              name="password"
              className="form-input"
              placeholder="••••••••••••"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <svg className="form-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
          </div>
        </div>

        <button type="submit" className="btn-primary" style={{ marginTop: '32px' }}>
          Next
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </button>
      </form>
    </div>
  );
}

export default RegistrationPersonalDetails;
