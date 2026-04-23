import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css';

function StaffDashboard() {
    const navigate = useNavigate();
    const [appointments, setAppointments] = useState([]);

    // Quick inline logic for stats
    const totalAppointments = appointments.length;
    const inProgress = appointments.filter(a => a.status === 'In Progress').length;
    const readyForPickup = appointments.filter(a => a.status === 'Ready for Pickup').length;
    const issueDetected = appointments.filter(a => a.status === 'Issue Detected').length;

    useEffect(() => {
        fetchAllAppointments();
    }, []);

    const fetchAllAppointments = async () => {
        try {
            // Getting ALL appointments. We will filter for today in UI, or just show all for the mockup.
            // A production app would pass ?date=YYYY-MM-DD
            const res = await fetch('http://127.0.0.1:8000/api/appointments/');
            if (res.ok) {
                const data = await res.json();
                setAppointments(data);
            }
        } catch (e) {
            console.error("Failed fetching appointments", e);
        }
    };

    // Helper to update status
    const updateStatus = async (id, newStatus) => {
        try {
            await fetch(`http://127.0.0.1:8000/api/appointments/${id}/`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus })
            });
            setAppointments(appointments.map(a => a.id === id ? { ...a, status: newStatus } : a));
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div style={{ background: '#f8fafc', minHeight: '100vh', fontFamily: 'Inter, sans-serif' }}>

            {/* Minimal Nav for Staff (User Requested no Sidebar) */}
            <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 32px', background: 'white', borderBottom: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
                    <div style={{ fontWeight: 'bold', fontSize: '18px', color: '#0f172a' }}>AutoService Pro <span style={{ fontSize: '12px', background: '#f1f5f9', padding: '4px 8px', borderRadius: '4px', color: '#64748b', marginLeft: '8px' }}>Staff Portal</span></div>
                    <div style={{ display: 'flex', gap: '24px' }}>
                        <span onClick={() => navigate('/staff-dashboard')} style={{ color: '#ea580c', fontWeight: 'bold', borderBottom: '2px solid #ea580c', paddingBottom: '16px', marginBottom: '-17px', cursor: 'pointer' }}>Dashboard</span>
                        <span onClick={() => navigate('/staff-inventory')} style={{ color: '#64748b', cursor: 'pointer' }}>Inventory</span>
                        <span onClick={() => navigate('/staff-appointments')} style={{ color: '#64748b', cursor: 'pointer' }}>Appointments</span>
                        <span onClick={() => navigate('/revenue')} style={{ color: '#64748b', cursor: 'pointer' }}>Revenue</span>
                    </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ width: '200px', background: '#f1f5f9', borderRadius: '8px', padding: '8px 12px', display: 'flex', alignItems: 'center', border: '1px solid #e2e8f0' }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                        <input type="text" placeholder="Search vehicles..." style={{ border: 'none', background: 'transparent', outline: 'none', paddingLeft: '8px', width: '100%', fontSize: '13px' }} />
                    </div>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#0f172a', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '12px' }}>SF</div>
                </div>
            </nav>

            <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '32px' }}>
                    <div>
                        <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#ea580c', letterSpacing: '0.05em' }}>OVERVIEW</span>
                        <h1 style={{ margin: '4px 0 0 0', fontSize: '32px', color: '#0f172a' }}>Service Dashboard</h1>
                    </div>
                    <div style={{ display: 'flex', background: '#f1f5f9', borderRadius: '8px', padding: '4px' }}>
                        <button style={{ background: '#ca8a04', color: 'white', border: 'none', padding: '6px 16px', borderRadius: '6px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer' }}>Today</button>
                        <button style={{ background: 'transparent', color: '#64748b', border: 'none', padding: '6px 16px', borderRadius: '6px', fontSize: '13px', cursor: 'pointer' }}>Weekly</button>
                        <button style={{ background: 'transparent', color: '#64748b', border: 'none', padding: '6px 16px', borderRadius: '6px', fontSize: '13px', cursor: 'pointer' }}>Monthly</button>
                    </div>
                </div>

                {/* State Cards */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', marginBottom: '40px' }}>

                    <div style={{ background: 'white', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#f1f5f9', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                            </div>
                            <span style={{ fontSize: '11px', color: '#64748b', fontWeight: 'bold', letterSpacing: '0.05em' }}>TOTAL APPOINTMENTS</span>
                        </div>
                        <h2 style={{ fontSize: '36px', margin: 0, color: '#0f172a' }}>{totalAppointments}</h2>
                    </div>

                    <div style={{ background: 'white', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#f1f5f9', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"></path></svg>
                            </div>
                            <span style={{ fontSize: '11px', color: '#64748b', fontWeight: 'bold', letterSpacing: '0.05em' }}>IN PROGRESS</span>
                        </div>
                        <h2 style={{ fontSize: '36px', margin: 0, color: '#0f172a' }}>{inProgress < 10 ? `0${inProgress}` : inProgress}</h2>
                    </div>

                    <div style={{ background: 'white', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#f1f5f9', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                            </div>
                            <span style={{ fontSize: '11px', color: '#64748b', fontWeight: 'bold', letterSpacing: '0.05em' }}>READY FOR PICKUP</span>
                        </div>
                        <h2 style={{ fontSize: '36px', margin: 0, color: '#0f172a' }}>{readyForPickup < 10 ? `0${readyForPickup}` : readyForPickup}</h2>
                    </div>

                    <div style={{ background: 'white', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#fef2f2', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
                            </div>
                            <span style={{ fontSize: '11px', color: '#64748b', fontWeight: 'bold', letterSpacing: '0.05em' }}>ISSUE DETECTED</span>
                        </div>
                        <h2 style={{ fontSize: '36px', margin: 0, color: '#0f172a' }}>{issueDetected < 10 ? `0${issueDetected}` : issueDetected}</h2>
                    </div>
                </div>

                {/* Main Appointments Table (Today) */}
                <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
                    <div style={{ padding: '24px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h2 style={{ fontSize: '18px', margin: 0, color: '#0f172a' }}>Today's Appointments</h2>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
                    </div>

                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <thead style={{ background: '#f8fafc' }}>
                            <tr>
                                <th style={{ padding: '16px 24px', color: '#64748b', fontSize: '12px', fontWeight: 'bold', letterSpacing: '0.05em' }}>TIME</th>
                                <th style={{ padding: '16px 24px', color: '#64748b', fontSize: '12px', fontWeight: 'bold', letterSpacing: '0.05em' }}>VEHICLE DETAILS</th>
                                <th style={{ padding: '16px 24px', color: '#64748b', fontSize: '12px', fontWeight: 'bold', letterSpacing: '0.05em' }}>SERVICE TYPE</th>
                                <th style={{ padding: '16px 24px', color: '#64748b', fontSize: '12px', fontWeight: 'bold', letterSpacing: '0.05em' }}>STATUS</th>
                                <th style={{ padding: '16px 24px', color: '#64748b', fontSize: '12px', fontWeight: 'bold', letterSpacing: '0.05em', textAlign: 'right' }}>ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {appointments.map((item, i) => {
                                // Time formatter
                                const timeFormat = new Date(`1970-01-01T${item.appointment_time}`);

                                return (
                                    <tr key={i} style={{ borderBottom: '1px solid #e2e8f0' }}>
                                        <td style={{ padding: '20px 24px' }}>
                                            <strong style={{ display: 'block', fontSize: '15px', color: '#0f172a' }}>{timeFormat.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}</strong>
                                            <span style={{ fontSize: '12px', color: '#64748b' }}>Est. 2h 45m</span>
                                        </td>
                                        <td style={{ padding: '20px 24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                                            <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: '#f1f5f9', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2"><rect x="2" y="7" width="20" height="15" rx="2" ry="2"></rect><polyline points="17 2 12 7 7 2"></polyline></svg>
                                            </div>
                                            <div>
                                                <strong style={{ display: 'block', fontSize: '14px', color: '#0f172a' }}>{item.vehicle?.model_name || 'Vehicle Model'}</strong>
                                                <span style={{ fontSize: '12px', color: '#64748b' }}>VIN: {item.vehicle?.identification_number || 'N/A'}</span>
                                            </div>
                                        </td>
                                        <td style={{ padding: '20px 24px' }}>
                                            <strong style={{ display: 'block', fontSize: '14px', color: '#0f172a' }}>{item.service_type}</strong>
                                            <span style={{ fontSize: '12px', color: '#64748b' }}>Full diagnostic, brake check</span>
                                        </td>
                                        <td style={{ padding: '20px 24px' }}>
                                            <select
                                                value={item.status}
                                                onChange={(e) => updateStatus(item.id, e.target.value)}
                                                style={{
                                                    padding: '6px 12px', borderRadius: '16px', fontSize: '12px', fontWeight: 'bold', outline: 'none', cursor: 'pointer', appearance: 'none', border: 'none',
                                                    color: item.status === 'In Progress' ? '#3b82f6' : item.status === 'Ready for Pickup' ? '#10b981' : item.status === 'Issue Detected' ? '#ef4444' : '#64748b',
                                                    background: item.status === 'In Progress' ? '#eff6ff' : item.status === 'Ready for Pickup' ? '#d1fae5' : item.status === 'Issue Detected' ? '#fef2f2' : '#f1f5f9'
                                                }}
                                            >
                                                <option value="Scheduled">Scheduled</option>
                                                <option value="In Progress">In Progress</option>
                                                <option value="Issue Detected">Issue Detected</option>
                                                <option value="Ready for Pickup">Ready for Pickup</option>
                                            </select>
                                        </td>
                                        <td style={{ padding: '20px 24px', textAlign: 'right' }}>
                                            <button style={{ background: 'transparent', border: 'none', color: '#ea580c', fontWeight: 'bold', cursor: 'pointer', fontSize: '13px' }}>
                                                {item.status === 'Scheduled' ? 'Start Service' : item.status === 'Issue Detected' ? 'View Alert' : item.status === 'Ready for Pickup' ? 'Notify Owner' : 'View Details'}
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}

                            {/* If no items (or to match the exact mockup flow if array empty) */}
                            {appointments.length === 0 && (
                                <tr><td colSpan="5" style={{ padding: '24px', textAlign: 'center', color: '#64748b' }}>No appointments today.</td></tr>
                            )}
                        </tbody>
                    </table>

                    <div style={{ padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #e2e8f0' }}>
                        <span style={{ fontSize: '13px', color: '#64748b' }}>Showing {appointments.length} of {appointments.length} appointments for today</span>
                        <div style={{ display: 'flex', gap: '8px' }}>
                            <button style={{ padding: '6px 12px', background: 'white', border: '1px solid #e2e8f0', borderRadius: '6px', fontSize: '13px', color: '#64748b', cursor: 'pointer' }}>Previous</button>
                            <button style={{ padding: '6px 12px', background: 'white', border: '1px solid #e2e8f0', borderRadius: '6px', fontSize: '13px', color: '#0f172a', fontWeight: 'bold', cursor: 'pointer' }}>Next</button>
                        </div>
                    </div>
                </div>

            </main>
        </div>
    );
}

export default StaffDashboard;
