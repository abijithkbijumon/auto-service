import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './index.css';

function Confirmation() {
    const location = useLocation();
    const navigate = useNavigate();

    // Safety fallback
    const state = location.state || {
        date: '2024-10-06',
        time: '11:00:00'
    };

    // Format the date (e.g., Oct 6, 2024)
    const formattedDate = new Date(state.date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });

    // Format the time (11:00 AM)
    const formattedTime = new Date(`1970-01-01T${state.time}`).toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    });

    return (
        <div style={{ background: '#f8fafc', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '60px 20px', fontFamily: 'Inter, sans-serif' }}>

            {/* Main Card */}
            <div style={{ background: 'white', borderRadius: '16px', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05), 0 8px 10px -6px rgba(0,0,0,0.01)', width: '100%', maxWidth: '900px', display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 0.8fr)', overflow: 'hidden', border: '1px solid #e2e8f0' }}>

                {/* Left Side: Success Message */}
                <div style={{ padding: '64px 48px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#059669', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '32px', boxShadow: '0 4px 6px -1px rgba(5,150,105,0.3)' }}>
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </div>

                    <h1 style={{ margin: '0 0 16px 0', fontSize: '36px', color: '#0f172a', lineHeight: '1.2', fontWeight: 'bold' }}>
                        Service Booked<br />Successfully!
                    </h1>

                    <p style={{ margin: '0 0 40px 0', color: '#64748b', fontSize: '15px', lineHeight: '1.6' }}>
                        Your appointment has been confirmed and scheduled in our system. A confirmation email has been sent to your registered address.
                    </p>

                    {/* Stats Boxes */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '48px' }}>

                        <div style={{ background: '#f1f5f9', borderRadius: '12px', padding: '20px 24px', display: 'flex', alignItems: 'center', gap: '20px', border: '1px solid #e2e8f0' }}>
                            <div style={{ width: '48px', height: '48px', background: '#0f172a', borderRadius: '12px', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#94a3b8' }}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                            </div>
                            <div>
                                <span style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', letterSpacing: '0.05em', color: '#64748b', marginBottom: '4px' }}>APPOINTMENT DATE</span>
                                <strong style={{ fontSize: '18px', color: '#0f172a' }}>{formattedDate}</strong>
                            </div>
                        </div>

                        <div style={{ background: '#f1f5f9', borderRadius: '12px', padding: '20px 24px', display: 'flex', alignItems: 'center', gap: '20px', border: '1px solid #e2e8f0' }}>
                            <div style={{ width: '48px', height: '48px', background: '#0f172a', borderRadius: '12px', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#94a3b8' }}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                            </div>
                            <div>
                                <span style={{ display: 'block', fontSize: '11px', fontWeight: 'bold', letterSpacing: '0.05em', color: '#64748b', marginBottom: '4px' }}>ARRIVAL TIME</span>
                                <strong style={{ fontSize: '18px', color: '#0f172a' }}>{formattedTime}</strong>
                            </div>
                        </div>

                    </div>

                    <div>
                        <button
                            onClick={() => navigate('/dashboard')}
                            style={{ background: '#b45309', color: 'white', border: 'none', padding: '16px 32px', borderRadius: '8px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '12px', transition: 'background 0.2s', boxShadow: '0 4px 6px -1px rgba(180,83,9,0.2)' }}
                            onMouseEnter={(e) => e.currentTarget.style.background = '#92400e'}
                            onMouseLeave={(e) => e.currentTarget.style.background = '#b45309'}
                        >
                            {/* Grid Icon */}
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
                            Back to Dashboard
                        </button>
                    </div>

                </div>

                {/* Right Side: Graphic/Image representation */}
                <div style={{ padding: '32px', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ flex: 1, background: '#1e293b', borderRadius: '16px', overflow: 'hidden', position: 'relative', display: 'flex', flexDirection: 'column' }}>

                        {/* Illustration Box */}
                        <div style={{ padding: '32px 32px 0 32px', textAlign: 'center', position: 'relative', zIndex: 2 }}>
                            <h2 style={{ color: '#fbbf24', fontSize: '28px', margin: '0 0 16px 0', fontWeight: 'bold', letterSpacing: '1px' }}>SAFE FOR SERVICE</h2>
                        </div>

                        <div style={{ flex: 1, position: 'relative', minHeight: '200px' }}>
                            <img src="https://images.unsplash.com/photo-1620063259960-9188849cd8cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Tech Maintenance" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }} />
                            {/* Dark gradient overlay */}
                            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(30,41,59,0) 0%, rgba(30,41,59,1) 90%)' }}></div>
                        </div>

                        {/* Guarantee Tech Details */}
                        <div style={{ padding: '32px', position: 'relative', zIndex: 2, background: 'linear-gradient(to top, rgba(15,23,42,1) 0%, rgba(30,41,59,0.5) 100%)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="#10b981"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                                <span style={{ color: '#cbd5e1', fontSize: '11px', fontWeight: 'bold', letterSpacing: '0.1em' }}>SERVICE GUARANTEE</span>
                            </div>
                            <h3 style={{ color: 'white', fontSize: '18px', margin: '0 0 8px 0' }}>Certified Technicians Only</h3>
                            <p style={{ color: '#94a3b8', fontSize: '13px', margin: 0, lineHeight: '1.5' }}>
                                Your vehicle is in expert hands. We use only OEM parts for all premium fleet services.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Help Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', width: '100%', maxWidth: '900px', marginTop: '48px' }}>
                <div style={{ background: 'white', padding: '24px', borderRadius: '12px', display: 'flex', gap: '16px', alignItems: 'center', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)' }}>
                    <div style={{ color: '#b45309' }}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                    </div>
                    <div>
                        <strong style={{ display: 'block', fontSize: '14px', color: '#0f172a', marginBottom: '4px' }}>Service Location</strong>
                        <span style={{ fontSize: '12px', color: '#64748b' }}>Central Maintenance Hub, Bay 4</span>
                    </div>
                </div>

                <div style={{ background: 'white', padding: '24px', borderRadius: '12px', display: 'flex', gap: '16px', alignItems: 'center', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)' }}>
                    <div style={{ color: '#b45309' }}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
                    </div>
                    <div>
                        <strong style={{ display: 'block', fontSize: '14px', color: '#0f172a', marginBottom: '4px' }}>Need Help?</strong>
                        <span style={{ fontSize: '12px', color: '#64748b' }}>Call (555) 012-3456 anytime</span>
                    </div>
                </div>

                <div style={{ background: 'white', padding: '24px', borderRadius: '12px', display: 'flex', gap: '16px', alignItems: 'center', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)' }}>
                    <div style={{ color: '#b45309' }}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                    </div>
                    <div>
                        <strong style={{ display: 'block', fontSize: '14px', color: '#0f172a', marginBottom: '4px' }}>Rescheduling</strong>
                        <span style={{ fontSize: '12px', color: '#64748b' }}>Change booking up to 24h before</span>
                    </div>
                </div>
            </div>

            <div style={{ width: '100%', maxWidth: '900px', display: 'flex', justifyContent: 'space-between', marginTop: '64px', borderTop: '1px solid #e2e8f0', paddingTop: '24px' }}>
                <span style={{ fontSize: '11px', color: '#64748b' }}>© 2024 AutoService Pro Systems. All rights reserved.</span>
                <div style={{ display: 'flex', gap: '16px', fontSize: '11px', color: '#64748b' }}>
                    <span style={{ cursor: 'pointer' }}>Privacy Policy</span>
                    <span style={{ cursor: 'pointer' }}>Terms of Service</span>
                    <span style={{ cursor: 'pointer' }}>Service Level Agreement</span>
                    <span style={{ cursor: 'pointer' }}>Contact Support</span>
                </div>
            </div>

        </div>
    );
}

export default Confirmation;
