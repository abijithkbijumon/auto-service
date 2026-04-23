import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css';

function StaffAppointments() {
    const navigate = useNavigate();
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]); // Default to today
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        fetchAppointmentsByDate(date);
    }, [date]);

    const fetchAppointmentsByDate = async (selectedDate) => {
        try {
            const res = await fetch(`http://127.0.0.1:8000/api/appointments/?date=${selectedDate}`);
            if (res.ok) {
                const data = await res.json();
                setAppointments(data);
            }
        } catch (e) {
            console.error("Failed fetching appointments", e);
        }
    };

    const formatDateHeadline = (dString) => {
        const d = new Date(dString);
        return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };

    return (
        <div style={{ background: '#f8fafc', minHeight: '100vh', fontFamily: 'Inter, sans-serif' }}>

            {/* Minimal Nav for Staff */}
            <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 32px', background: 'white', borderBottom: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
                    <div style={{ fontWeight: 'bold', fontSize: '18px', color: '#0f172a' }}>AutoService Pro <span style={{ fontSize: '12px', background: '#f1f5f9', padding: '4px 8px', borderRadius: '4px', color: '#64748b', marginLeft: '8px' }}>Staff Portal</span></div>
                    <div style={{ display: 'flex', gap: '24px' }}>
                        <span onClick={() => navigate('/staff-dashboard')} style={{ color: '#64748b', cursor: 'pointer' }}>Dashboard</span>
                        <span onClick={() => navigate('/staff-inventory')} style={{ color: '#64748b', cursor: 'pointer' }}>Inventory</span>
                        <span onClick={() => navigate('/staff-appointments')} style={{ color: '#ea580c', fontWeight: 'bold', borderBottom: '2px solid #ea580c', paddingBottom: '16px', marginBottom: '-17px', cursor: 'pointer' }}>Appointments</span>
                        <span onClick={() => navigate('/revenue')} style={{ color: '#64748b', cursor: 'pointer' }}>Revenue</span>
                    </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ width: '200px', background: '#f1f5f9', borderRadius: '8px', padding: '8px 12px', display: 'flex', alignItems: 'center', border: '1px solid #e2e8f0' }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                        <input type="text" placeholder="Search bookings..." style={{ border: 'none', background: 'transparent', outline: 'none', paddingLeft: '8px', width: '100%', fontSize: '13px' }} />
                    </div>
                </div>
            </nav>

            <main style={{ maxWidth: '1000px', margin: '0 auto', padding: '40px 24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '32px' }}>
                    <div>
                        <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#ea580c', letterSpacing: '0.05em' }}>SCHEDULING</span>
                        <h1 style={{ margin: '4px 0 8px 0', fontSize: '32px', color: '#0f172a' }}>Upcoming Appointments</h1>
                        <p style={{ margin: 0, color: '#64748b', fontSize: '15px' }}>View scheduled jobs dynamically. Please select a date to list the appointments.</p>
                    </div>
                    <div style={{ display: 'flex', gap: '12px' }}>
                        <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '8px 16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                            <input
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                style={{ border: 'none', outline: 'none', fontSize: '14px', color: '#0f172a', fontWeight: 'bold', width: '120px' }}
                            />
                        </div>
                        <button style={{ background: 'white', border: '1px solid #e2e8f0', padding: '8px 16px', borderRadius: '8px', fontSize: '14px', fontWeight: 'bold', color: '#0f172a', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
                            Filter
                        </button>
                    </div>
                </div>

                {/* Selected Date Headline */}
                <div style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ background: '#fffbeb', color: '#b45309', padding: '12px 24px', borderRadius: '24px', fontSize: '18px', fontWeight: 'bold', display: 'inline-block' }}>
                        {formatDateHeadline(date)}
                    </div>
                    <span style={{ fontSize: '13px', fontWeight: 'bold', color: '#64748b', letterSpacing: '0.05em' }}>{appointments.length} APPOINTMENTS</span>
                </div>

                {/* Cards Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
                    {appointments.map((app, i) => (
                        <div key={i} style={{ background: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '24px', display: 'flex', flexDirection: 'column', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                                <span style={{ fontSize: '12px', color: '#64748b', fontWeight: 'bold' }}>{new Date(`1970-01-01T${app.appointment_time}`).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}</span>
                                <span style={{ fontSize: '11px', fontWeight: 'bold', background: app.status === 'Scheduled' ? '#f1f5f9' : '#eff6ff', color: app.status === 'Scheduled' ? '#64748b' : '#3b82f6', padding: '4px 8px', borderRadius: '4px' }}>
                                    {app.status}
                                </span>
                            </div>

                            <h3 style={{ margin: '0 0 4px 0', fontSize: '16px', color: '#0f172a' }}>{app.vehicle?.identification_number || 'VIN UNKNOWN'}</h3>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2"><rect x="2" y="7" width="20" height="15" rx="2" ry="2"></rect><polyline points="17 2 12 7 7 2"></polyline></svg>
                                <span style={{ fontSize: '13px', color: '#64748b' }}>{app.vehicle?.model_name || 'Vehicle'}</span>
                            </div>

                            <div style={{ flex: 1, borderTop: '1px solid #f1f5f9', paddingTop: '16px', marginBottom: '24px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                                    <div style={{ color: '#ea580c' }}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg></div>
                                    <strong style={{ fontSize: '14px', color: '#0f172a' }}>{app.service_type}</strong>
                                </div>
                                <p style={{ margin: 0, fontSize: '12px', color: '#64748b', lineHeight: '1.5' }}>General check and necessary fluid top-off as requested by system.</p>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ fontSize: '13px', color: '#ea580c', fontWeight: 'bold', cursor: 'pointer' }}>View Details →</span>
                            </div>
                        </div>
                    ))}

                    {/* Show nice message if empty */}
                    {appointments.length === 0 && (
                        <div style={{ gridColumn: 'span 3', textAlign: 'center', padding: '64px', background: 'white', borderRadius: '12px', border: '1px dashed #cbd5e1' }}>
                            <p style={{ color: '#64748b', fontSize: '16px' }}>No bookings found for the selected date.</p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}

export default StaffAppointments;
