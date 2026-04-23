import React, { useState } from 'react';
import './index.css';

function RegistrationVehicleDetails({ onNext, onBack, direction }) {
    const [formData, setFormData] = useState({
        modelName: '',
        cc: '',
        bikeType: '',
        registrationYear: '',
        vin: ''
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
                <span className="step-text">STEP 2 OF 3</span>
                <div className="step-bars" style={{ margin: '0 16px' }}>
                    <div className="step-bar" style={{ background: '#1e293b' }}></div>
                    <div className="step-bar active"></div>
                    <div className="step-bar" style={{ background: '#e2e8f0' }}></div>
                </div>
                <span className="step-text right" style={{ color: '#1e293b' }}>VEHICLE</span>
            </div>

            <h1 className="auth-title">Vehicle Registration</h1>
            <p className="auth-subtitle">
                Tell us about your machine so we can provide precise service recommendations.
            </p>

            <form onSubmit={handleSubmit}>
                <div className="form-row">
                    <div className="form-group">
                        <label className="form-label">MODEL NAME</label>
                        <input
                            type="text"
                            name="modelName"
                            className="form-input"
                            placeholder="e.g. Panigale V4"
                            value={formData.modelName}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">ENGINE CC</label>
                        <input
                            type="number"
                            name="cc"
                            className="form-input"
                            placeholder="e.g. 1103"
                            value={formData.cc}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label className="form-label">BIKE TYPE</label>
                        <div className="form-input-container">
                            <select
                                name="bikeType"
                                className="form-input select-input"
                                value={formData.bikeType}
                                onChange={handleChange}
                                required
                            >
                                <option value="" disabled>Select Type</option>
                                <option value="adv">Adventure (ADV)</option>
                                <option value="naked">Naked</option>
                                <option value="cruiser">Cruiser</option>
                                <option value="sport">Sport</option>
                                <option value="touring">Touring</option>
                            </select>
                            <svg className="select-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="6 9 12 15 18 9"></polyline>
                            </svg>
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label">REGISTRATION YEAR</label>
                        <div className="form-input-container">
                            <select
                                name="registrationYear"
                                className="form-input select-input"
                                value={formData.registrationYear}
                                onChange={handleChange}
                                required
                            >
                                <option value="" disabled>Select Year</option>
                                <option value="2024">2024</option>
                                <option value="2023">2023</option>
                                <option value="2022">2022</option>
                                <option value="2021">2021</option>
                            </select>
                            <svg className="select-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="6 9 12 15 18 9"></polyline>
                            </svg>
                        </div>
                    </div>
                </div>

                <div className="form-group" style={{ marginBottom: '8px' }}>
                    <label className="form-label">REGISTRATION NUMBER / VIN</label>
                    <input
                        type="text"
                        name="vin"
                        className="form-input"
                        placeholder="ENTER LICENSE PLATE OR VIN"
                        value={formData.vin}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-actions" style={{ marginTop: '24px' }}>
                    <button type="button" className="btn-outline" onClick={onBack}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
                            <line x1="19" y1="12" x2="5" y2="12"></line>
                            <polyline points="12 19 5 12 5"></polyline>
                        </svg>
                        Back
                    </button>
                    <button type="submit" className="btn-primary" style={{ width: 'auto', marginTop: '0', padding: '12px 32px' }}>
                        Next Step
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '8px' }}>
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                            <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                    </button>
                </div>
            </form>
        </div>
    );
}

export default RegistrationVehicleDetails;
