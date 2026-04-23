import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './index.css';

function ServiceDetails() {
    const location = useLocation();
    const navigate = useNavigate();

    // Safety fallback if accessed without clicking a service card
    const state = location.state || {
        service: 'Regular Service',
        date: '2024-10-15',
        time: '09:00:00',
        vehicleId: null,
        vin: 'ABC-1234-XYZ',
        lastServiceDate: ''
    };

    const [mileage, setMileage] = useState('');
    const [lastServiceDate, setLastServiceDate] = useState(state.lastServiceDate || '');
    const [instructions, setInstructions] = useState('');

    const handleNext = () => {
        if (!mileage) return alert("Please provide current mileage.");
        // Next step is "Go to Billing Page"
        navigate('/billing', { state: { ...state, mileage, lastServiceDate, instructions } });
    };

    return (
        <div className="dashboard-root" style={{ background: '#f8fafc', minHeight: '100vh' }}>
            {/* Minimal top nav to match flow */}
            <nav className="dashboard-nav" style={{ borderBottom: '1px solid #e2e8f0' }}>
                <div className="nav-left">
                    <div className="nav-logo" style={{ color: '#0f172a' }}>AutoService Pro</div>
                </div>
                <div className="nav-center">
                    <button className="nav-link" onClick={() => navigate('/dashboard')} style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}>Dashboard</button>
                    <button className="nav-link active" style={{ background: 'transparent', border: 'none' }}>Services</button>
                    <button className="nav-link" onClick={() => navigate('/add-vehicle')} style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}>My Vehicles</button>
                    <button className="nav-link" onClick={() => navigate('/history')} style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}>Booking History</button>
                </div>
                <div className="nav-right">
                    <button className="btn-card-solid" style={{ background: '#f97316', color: 'white', padding: '8px 24px', borderRadius: '6px', border: 'none', fontWeight: '600', cursor: 'pointer' }} onClick={() => navigate('/book-appointment')}>
                        Book Service
                    </button>
                </div>
            </nav>

            <main style={{ maxWidth: '1000px', margin: '0 auto', padding: '40px 20px' }}>

                {/* Stepper */}
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '48px', position: 'relative' }}>
                    <div style={{ position: 'absolute', top: '15px', left: '30%', right: '30%', height: '2px', background: '#e2e8f0', zIndex: 1 }}></div>
                    <div style={{ position: 'absolute', top: '15px', left: '30%', right: '50%', height: '2px', background: '#0d9488', zIndex: 1 }}></div>

                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 2, marginRight: '120px', background: '#f8fafc', padding: '0 10px' }}>
                        <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#0d9488', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold', marginBottom: '8px' }}>✓</div>
                        <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#0d9488', letterSpacing: '0.05em' }}>SERVICE</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 2, marginRight: '120px', background: '#f8fafc', padding: '0 10px' }}>
                        <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#0d9488', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold', marginBottom: '8px' }}>2</div>
                        <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#0d9488', letterSpacing: '0.05em' }}>DETAILS</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 2, background: '#f8fafc', padding: '0 10px' }}>
                        <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#e2e8f0', color: '#64748b', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold', marginBottom: '8px' }}>3</div>
                        <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#64748b', letterSpacing: '0.05em' }}>CONFIRM</span>
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '32px', alignItems: 'start' }}>
                    {/* Left Sidebar */}
                    <div>
                        <div style={{ background: 'white', borderRadius: '12px', padding: '24px', border: '1px solid #e2e8f0', marginBottom: '16px' }}>
                            <p style={{ fontSize: '12px', color: '#64748b', fontWeight: '600', letterSpacing: '0.05em', margin: '0 0 16px 0' }}>SELECTED SERVICE</p>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                                <div style={{ width: '48px', height: '48px', background: '#f1f5f9', borderRadius: '8px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>
                                </div>
                                <div>
                                    <h3 style={{ margin: '0 0 4px 0', fontSize: '16px', color: '#0f172a' }}>{state.service}</h3>
                                    <p style={{ margin: 0, fontSize: '13px', color: '#64748b' }}>Full synthetic oil change & inspection</p>
                                </div>
                            </div>
                            <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ fontSize: '14px', color: '#64748b' }}>Estimated Time</span>
                                <strong style={{ fontSize: '14px', color: '#0f172a' }}>2 - 3 Hours</strong>
                            </div>
                        </div>

                        <div style={{ background: '#0f172a', borderRadius: '12px', padding: '32px 24px', color: 'white', position: 'relative', overflow: 'hidden' }}>
                            <h3 style={{ margin: '0 0 12px 0', fontSize: '18px' }}>Need a pick-up?</h3>
                            <p style={{ margin: '0 0 24px 0', fontSize: '14px', color: '#cbd5e1', lineHeight: '1.5' }}>We offer concierge vehicle collection for all regular services.</p>
                            <span style={{ fontSize: '14px', fontWeight: 'bold', display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                                Learn more <span style={{ marginLeft: '4px' }}>→</span>
                            </span>
                            {/* Abstract Truck Graphic */}
                            <svg style={{ position: 'absolute', bottom: '-10px', right: '-10px', opacity: '0.1' }} width="120" height="120" viewBox="0 0 24 24" fill="currentColor"><path d="M5 18H3V6h11v4h5l4 4v4h-2m-10 0H8m6 0h-6a2 2 0 1 1-4 0H2v-4h18v4h-2m-1 0a2 2 0 1 1-4 0m2-8v-4H4v8h1m11-2v-2h-3v4h5l-2-2"></path></svg>
                        </div>
                    </div>

                    {/* Main Form */}
                    <div style={{ background: 'white', borderRadius: '12px', padding: '40px', border: '1px solid #e2e8f0' }}>
                        <h2 style={{ margin: '0 0 8px 0', fontSize: '24px', color: '#0f172a' }}>Additional Information</h2>
                        <p style={{ margin: '0 0 32px 0', color: '#64748b', fontSize: '15px' }}>Help our technicians prepare for your vehicle by providing these specifics.</p>

                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#f8fafc', padding: '8px 16px', borderRadius: '8px', border: '1px solid #e2e8f0', marginBottom: '32px' }}>
                            <span style={{ fontSize: '13px', color: '#64748b', fontWeight: 'bold' }}>VIN</span>
                            <span style={{ fontSize: '14px', color: '#0f172a', fontWeight: 'bold' }}>{state.vin || 'ABC-1234-XYZ'}</span>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
                            <div>
                                <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', color: '#0f172a', marginBottom: '8px' }}>Current Mileage</label>
                                <div style={{ position: 'relative' }}>
                                    <input
                                        type="number"
                                        style={{ width: '100%', boxSizing: 'border-box', padding: '12px 16px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '15px' }}
                                        placeholder="e.g. 45000"
                                        value={mileage}
                                        onChange={(e) => setMileage(e.target.value)}
                                    />
                                    <span style={{ position: 'absolute', right: '16px', top: '12px', color: '#94a3b8', fontSize: '14px', fontWeight: 'bold' }}>KM</span>
                                </div>
                                <span style={{ fontSize: '12px', color: '#64748b', marginTop: '6px', display: 'block' }}>Required for accurate parts ordering.</span>
                            </div>
                            <div>
                                <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', color: '#0f172a', marginBottom: '8px' }}>Last Service Date <span style={{ color: '#94a3b8', fontWeight: 'normal' }}>(Optional)</span></label>
                                <input
                                    type="date"
                                    style={{ width: '100%', boxSizing: 'border-box', padding: '12px 16px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '15px', color: '#0f172a' }}
                                    value={lastServiceDate}
                                    onChange={(e) => setLastServiceDate(e.target.value)}
                                />
                            </div>
                        </div>

                        <div style={{ marginBottom: '32px' }}>
                            <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', color: '#0f172a', marginBottom: '8px' }}>Special Instructions or Symptoms</label>
                            <textarea
                                style={{ width: '100%', boxSizing: 'border-box', padding: '16px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '15px', color: '#0f172a', minHeight: '120px', resize: 'vertical' }}
                                placeholder="Describe any leaks, noises, or specific warning lights..."
                                value={instructions}
                                onChange={(e) => setInstructions(e.target.value)}
                            ></textarea>
                        </div>

                        <div style={{ marginBottom: '48px' }}>
                            <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', color: '#0f172a', marginBottom: '16px' }}>Attach Photos</label>
                            <div style={{ display: 'flex', gap: '16px' }}>
                                <div style={{ width: '140px', height: '140px', border: '2px dashed #cbd5e1', borderRadius: '12px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', background: '#f8fafc' }}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                                    <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#64748b', marginTop: '8px' }}>UPLOAD</span>
                                </div>
                                <div style={{ width: '140px', height: '140px', borderRadius: '12px', background: '#000', overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <div style={{ color: '#fbbf24' }}>
                                        {/* Mock Check Engine Light graphic */}
                                        <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor"><path d="M12.9 6h-1.8L10 8h-2v2H6v2H4v-1H2v4h2v-1h2v3c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2v-3h2v1h2v-4h-2v1h-2v-2h-2v-2h-2zm-3.9 10h-2V10h2v6zm4 0h-2V10h2v6z" /></svg>
                                    </div>
                                </div>
                            </div>
                            <span style={{ fontSize: '12px', color: '#64748b', marginTop: '12px', display: 'block', fontStyle: 'italic' }}>Recommended for documenting body damage or active warning lights.</span>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f1f5f9', paddingTop: '24px' }}>
                            <button
                                onClick={() => navigate(-1)}
                                style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px', background: 'white', border: '2px solid #0f172a', borderRadius: '8px', color: '#0f172a', fontWeight: 'bold', cursor: 'pointer' }}
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 5 5"></polyline></svg>
                                Back
                            </button>
                            <button
                                onClick={handleNext}
                                style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px', background: '#f97316', border: 'none', borderRadius: '8px', color: 'white', fontWeight: 'bold', cursor: 'pointer' }}
                            >
                                Go to Billing Page
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default ServiceDetails;
