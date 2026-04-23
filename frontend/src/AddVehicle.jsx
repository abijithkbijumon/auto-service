import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css';

function AddVehicle() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        bikeType: '',
        registrationYear: '',
        make: '',
        model: '',
        vin: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleAddVehicle = async (e) => {
        e.preventDefault();
        alert('Vehicle added successfully (Mock)!');
        navigate('/dashboard');
    };

    return (
        <div className="dashboard-root">
            <nav className="dashboard-nav">
                <div className="nav-left">
                    <div className="nav-logo">AutoService Pro</div>
                </div>
                <div className="nav-center">
                    <button className="nav-link" onClick={() => navigate('/dashboard')} style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}>Dashboard</button>
                    <button className="nav-link active" style={{ background: 'transparent', border: 'none' }}>My Vehicles</button>
                    <button className="nav-link" onClick={() => navigate('/book-appointment')} style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}>Book Service</button>
                    <button className="nav-link" onClick={() => navigate('/history')} style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}>Booking History</button>
                </div>
                <div className="nav-right">
                    <div className="nav-avatar"></div>
                </div>
            </nav>

            <main className="dashboard-content" style={{ display: 'flex', justifyContent: 'center', padding: '40px', background: '#f8fafc', minHeight: 'calc(100vh - 70px)' }}>
                <div className="auth-card" style={{ width: '100%', maxWidth: '600px', background: 'white', borderRadius: '12px', padding: '40px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                    <h1 style={{ margin: '0 0 8px 0', fontSize: '24px' }}>Add New Vehicle</h1>
                    <p style={{ margin: '0 0 32px 0', color: '#64748b' }}>Register a new asset to your maintenance portal</p>

                    <form onSubmit={handleAddVehicle}>
                        <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
                            <div className="form-group">
                                <label className="form-label">VEHICLE TYPE</label>
                                <select name="bikeType" className="form-input" style={{ width: '100%' }} value={formData.bikeType} onChange={handleChange} required>
                                    <option value="" disabled>Select type</option>
                                    <option value="Scooter">Scooter</option>
                                    <option value="Sports">Sports</option>
                                    <option value="Cruiser">Cruiser</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label className="form-label">MANUFACTURING YEAR</label>
                                <input type="number" name="registrationYear" className="form-input" style={{ width: '100%', boxSizing: 'border-box' }} placeholder="e.g. 2024" value={formData.registrationYear} onChange={handleChange} required />
                            </div>
                        </div>

                        <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
                            <div className="form-group">
                                <label className="form-label">MAKE</label>
                                <input type="text" name="make" className="form-input" style={{ width: '100%', boxSizing: 'border-box' }} placeholder="e.g. BMW, Honda" value={formData.make} onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label className="form-label">MODEL</label>
                                <input type="text" name="model" className="form-input" style={{ width: '100%', boxSizing: 'border-box' }} placeholder="e.g. M3, Civic" value={formData.model} onChange={handleChange} required />
                            </div>
                        </div>

                        <div className="form-group" style={{ marginBottom: '32px' }}>
                            <label className="form-label">REGISTRATION NUMBER / VIN</label>
                            <input type="text" name="vin" className="form-input" style={{ width: '100%', boxSizing: 'border-box' }} placeholder="ENTER LICENSE PLATE OR VIN" value={formData.vin} onChange={handleChange} required />
                        </div>

                        <div className="form-group" style={{ marginBottom: '40px' }}>
                            <label className="form-label">VEHICLE PHOTO <span style={{ color: '#94a3b8', fontWeight: 'normal', textTransform: 'none' }}>(Optional)</span></label>
                            <div style={{ border: '2px dashed #cbd5e1', borderRadius: '12px', padding: '48px', textAlign: 'center', background: '#f8fafc', cursor: 'pointer' }}>
                                <p style={{ margin: 0, fontWeight: 600, color: '#334155' }}>Click to upload or drag and drop</p>
                                <p style={{ fontSize: '12px', color: '#64748b', margin: '8px 0 0 0' }}>PNG, JPG or WEBP (max. 5MB)</p>
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: '16px' }}>
                            <button type="button" className="btn-card-outline" style={{ flex: 1, padding: '14px', borderRadius: '8px', cursor: 'pointer' }} onClick={() => navigate('/dashboard')}>+ Back</button>
                            <button type="submit" className="btn-card-solid" style={{ flex: 2, background: '#b45309', color: 'white', border: 'none', padding: '14px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>+ Add Vehicle</button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
}

export default AddVehicle;
