import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './index.css';

function Billing() {
    const location = useLocation();
    const navigate = useNavigate();

    // Safety fallback
    const state = location.state || {
        service: 'Regular Service',
        date: '2024-10-15',
        time: '09:00:00',
        vehicleId: null,
        vin: 'ABC-1234-XYZ',
        instructions: 'Vehicle in excellent condition. Requested inspection of rear brake pads during regular service.',
        mileage: '24500',
        vehicleData: {
            model_name: 'Ducati Panigale V4',
            bike_type: 'Sport',
            registration_year: 2021
        }
    };

    const user = JSON.parse(localStorage.getItem('user') || '{"id": 1}');
    const [selectedPayment, setSelectedPayment] = useState('Credit Card (**4242)');

    const mockPrice = 1850.00;
    const serviceFee = 1200.00;
    const partsFee = 500.00;
    const tax = 150.00;

    const [isProcessing, setIsProcessing] = useState(false);

    const handlePayment = async () => {
        setIsProcessing(true);
        // Call the appointment creation endpoint here
        try {
            const res = await fetch(`http://127.0.0.1:8000/api/appointments/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    owner: user?.id,
                    vehicle: state.vehicleId,
                    service_type: state.service,
                    appointment_date: state.date,
                    appointment_time: state.time,
                    status: 'Scheduled'
                })
            });

            if (res.ok) {
                // Navigate to confirmation instead of dashboard
                navigate('/confirmation', { state: { ...state } });
            } else {
                alert('Failed to process appointment.');
            }
        } catch (err) {
            console.error(err);
            alert('Error connecting to server.');
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="dashboard-root" style={{ background: '#f8fafc', minHeight: '100vh', fontFamily: 'Inter, sans-serif' }}>
            <nav className="dashboard-nav" style={{ borderBottom: '1px solid #e2e8f0', background: 'white' }}>
                <div className="nav-left">
                    <div className="nav-logo" style={{ color: '#0f172a' }}>AutoService Pro</div>
                </div>
                <div className="nav-center">
                    <button className="nav-link" onClick={() => navigate('/dashboard')} style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}>Dashboard</button>
                    <button className="nav-link active" onClick={() => navigate('/history')} style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}>My Bookings</button>
                </div>
                <div className="nav-right">
                    <div className="nav-avatar"></div>
                </div>
            </nav>

            <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '40px 20px' }}>

                {/* Stepper */}
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '40px', position: 'relative' }}>
                    <div style={{ position: 'absolute', top: '15px', left: '25%', right: '25%', height: '2px', background: '#e2e8f0', zIndex: 1 }}></div>
                    <div style={{ position: 'absolute', top: '15px', left: '25%', right: '25%', height: '2px', background: '#0d9488', zIndex: 1 }}></div>

                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 2, background: '#f8fafc', padding: '0 20px' }}>
                        <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#0d9488', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold', marginBottom: '8px' }}>✓</div>
                        <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#0d9488', letterSpacing: '0.05em' }}>VEHICLE</span>
                    </div>

                    <div style={{ flex: 1 }}></div>

                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 2, background: '#f8fafc', padding: '0 20px' }}>
                        <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#0d9488', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold', marginBottom: '8px' }}>✓</div>
                        <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#0d9488', letterSpacing: '0.05em' }}>SERVICE</span>
                    </div>

                    <div style={{ flex: 1 }}></div>

                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 2, background: '#f8fafc', padding: '0 20px' }}>
                        <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'white', border: '2px solid #0f172a', color: '#0f172a', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold', marginBottom: '8px' }}>3</div>
                        <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#0f172a', letterSpacing: '0.05em' }}>BILLING</span>
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.3fr) minmax(0, 0.7fr)', gap: '32px', alignItems: 'start' }}>

                    {/* Left Column Container */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>

                        {/* Top Left Box: Bike Details & Payment */}
                        <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '32px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                                <h1 style={{ margin: 0, fontSize: '28px', color: '#0f172a' }}>{state.vehicleData?.model_name || 'Ducati Panigale'}</h1>
                                <span style={{ background: '#eff6ff', color: '#3b82f6', padding: '6px 12px', borderRadius: '16px', fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase' }}>
                                    {state.vehicleData?.bike_type || 'SPORT'}
                                </span>
                            </div>

                            <p style={{ margin: '-24px 0 32px 0', fontSize: '13px', color: '#64748b' }}>VIN: {state.vin}</p>

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', borderBottom: '1px solid #e2e8f0', paddingBottom: '24px', marginBottom: '24px' }}>
                                <div>
                                    <p style={{ fontSize: '11px', color: '#64748b', fontWeight: 'bold', margin: '0 0 8px 0', letterSpacing: '0.05em' }}>YEAR</p>
                                    <p style={{ margin: 0, fontSize: '15px', color: '#0f172a' }}>{state.vehicleData?.registration_year || '2022'}</p>
                                </div>
                                <div>
                                    <p style={{ fontSize: '11px', color: '#64748b', fontWeight: 'bold', margin: '0 0 8px 0', letterSpacing: '0.05em' }}>MILEAGE</p>
                                    <p style={{ margin: 0, fontSize: '15px', color: '#0f172a' }}>{state.mileage || 'N/A'} km</p>
                                </div>
                                <div>
                                    <p style={{ fontSize: '11px', color: '#64748b', fontWeight: 'bold', margin: '0 0 8px 0', letterSpacing: '0.05em' }}>PLATE</p>
                                    <p style={{ margin: 0, fontSize: '15px', color: '#0f172a' }}>{state.vin?.split('-')[0] || 'REG-1'}</p>
                                </div>
                                <div>
                                    <p style={{ fontSize: '11px', color: '#64748b', fontWeight: 'bold', margin: '0 0 8px 0', letterSpacing: '0.05em' }}>PAYMENT METHOD</p>
                                    <select
                                        value={selectedPayment}
                                        onChange={(e) => setSelectedPayment(e.target.value)}
                                        style={{ margin: 0, fontSize: '14px', color: '#0f172a', border: 'none', background: 'transparent', outline: 'none', cursor: 'pointer', fontWeight: '500', padding: 0 }}
                                    >
                                        <option>Credit Card (**4242)</option>
                                        <option>Apple Pay</option>
                                        <option>Pay at Workshop</option>
                                    </select>
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
                                <div style={{ width: '120px', height: '80px', borderRadius: '8px', overflow: 'hidden', background: '#f1f5f9' }}>
                                    <img src="https://images.unsplash.com/photo-1558981403-c5f9899a28bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Vehicle" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                </div>
                                <p style={{ flex: 1, margin: 0, fontStyle: 'italic', color: '#475569', fontSize: '14px', lineHeight: '1.5' }}>
                                    "{state.instructions || 'Routine factory maintenance and checkup.'}"
                                </p>
                            </div>
                        </div>

                        {/* Bottom Left Box: Services Provided */}
                        <div style={{ background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
                            <div style={{ background: '#e0e7ff', padding: '20px 24px', borderBottom: '1px solid #c7d2fe' }}>
                                <h2 style={{ margin: 0, fontSize: '18px', color: '#1e3a8a' }}>{state.service} Details</h2>
                            </div>
                            <div style={{ padding: '24px' }}>
                                <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
                                    <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#10b981', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>✓</div>
                                    <div>
                                        <strong style={{ display: 'block', marginBottom: '4px', color: '#0f172a' }}>Multi-Point Inspection</strong>
                                        <span style={{ fontSize: '14px', color: '#64748b' }}>Full diagnostic scan and visual safety check.</span>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
                                    <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#10b981', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>✓</div>
                                    <div>
                                        <strong style={{ display: 'block', marginBottom: '4px', color: '#0f172a' }}>Fluid Top-off</strong>
                                        <span style={{ fontSize: '14px', color: '#64748b' }}>Windshield washer and brake fluid levels checked.</span>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: '16px' }}>
                                    <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#10b981', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>✓</div>
                                    <div>
                                        <strong style={{ display: 'block', marginBottom: '4px', color: '#0f172a' }}>Precision Calibration</strong>
                                        <span style={{ fontSize: '14px', color: '#64748b' }}>Suspension and chain tension calibration for even wear.</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Right Column: Billing Summary */}
                    <div style={{ background: '#1e293b', borderRadius: '12px', padding: '32px', color: 'white', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }}>
                        <h2 style={{ margin: '0 0 32px 0', fontSize: '20px', fontWeight: '400' }}>Billing Summary</h2>

                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', color: '#94a3b8' }}>
                            <span>Service Fee</span>
                            <span>₹{serviceFee.toFixed(2)}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', color: '#94a3b8' }}>
                            <span>Parts</span>
                            <span>₹{partsFee.toFixed(2)}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '32px', color: '#94a3b8', paddingBottom: '32px', borderBottom: '1px solid #334155' }}>
                            <span>Tax</span>
                            <span>₹{tax.toFixed(2)}</span>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
                            <span style={{ fontSize: '16px' }}>Total Amount</span>
                            <span style={{ fontSize: '32px', color: '#f97316' }}>₹{mockPrice.toFixed(2)}</span>
                        </div>

                        <button
                            onClick={handlePayment}
                            disabled={isProcessing}
                            style={{ width: '100%', background: '#f97316', color: 'white', border: 'none', padding: '16px', borderRadius: '8px', fontSize: '16px', fontWeight: '600', cursor: isProcessing ? 'not-allowed' : 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', transition: 'background 0.2s' }}
                            onMouseEnter={(e) => { if (!isProcessing) e.currentTarget.style.background = '#ea580c' }}
                            onMouseLeave={(e) => { if (!isProcessing) e.currentTarget.style.background = '#f97316' }}
                        >
                            {isProcessing ? 'Processing...' : 'Proceed to Payment →'}
                        </button>

                        <p style={{ textAlign: 'center', fontSize: '11px', color: '#64748b', marginTop: '16px', lineHeight: '1.5' }}>
                            By clicking proceed, you agree to our <span style={{ textDecoration: 'underline', cursor: 'pointer' }}>Terms of Service</span><br />and <span style={{ textDecoration: 'underline', cursor: 'pointer' }}>Privacy Policy</span>.
                        </p>

                        <div style={{ background: '#0f172a', padding: '16px', borderRadius: '8px', display: 'flex', alignItems: 'flex-start', gap: '12px', marginTop: '32px' }}>
                            <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: '#059669', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', flexShrink: 0, marginTop: '2px' }}>
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                            </div>
                            <p style={{ margin: 0, fontSize: '11px', color: '#94a3b8', lineHeight: '1.5' }}>
                                Secure SSL encrypted checkout. Your vehicle is covered by our Enterprise service guarantee.
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Billing;
