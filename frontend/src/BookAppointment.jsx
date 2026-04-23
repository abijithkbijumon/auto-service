import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css';

function BookAppointment() {
    const navigate = useNavigate();
    const [selectedService, setSelectedService] = useState('Regular Service');

    // Add 1 day to current date to pretend we're booking in advance
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const [selectedDate, setSelectedDate] = useState(tomorrow.toISOString().split('T')[0]);

    const [selectedTime, setSelectedTime] = useState('');
    const [takenSlots, setTakenSlots] = useState([]);
    const [user, setUser] = useState(null);

    const availableSlots = [
        "08:00:00", "09:30:00", "11:00:00",
        "13:30:00", "15:00:00", "16:30:00"
    ];

    const slotLabels = {
        "08:00:00": "08:00 AM",
        "09:30:00": "09:30 AM",
        "11:00:00": "11:00 AM",
        "13:30:00": "01:30 PM",
        "15:00:00": "03:00 PM",
        "16:30:00": "04:30 PM"
    };

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) setUser(JSON.parse(storedUser));
        fetchAppointments();
    }, [selectedDate]);

    const fetchAppointments = async () => {
        try {
            const res = await fetch(`http://127.0.0.1:8000/api/appointments/?date=${selectedDate}`);
            if (res.ok) {
                const data = await res.json();
                const booked = data.map(app => app.appointment_time);
                // Hardcode some taken slots for demonstration purposes
                setTakenSlots([...booked, "09:30:00", "15:00:00"]);
            }
        } catch (err) {
            console.error("Error fetching appointments: ", err);
        }
    }; // Close fetchAppointments properly

    const handleConfirm = (srvType) => {
        if (!user || !user.vehicles || user.vehicles.length === 0) {
            return alert("You must add a vehicle first! (Your user profile might lack a vehicle via the API)");
        }

        navigate('/select-vehicle', {
            state: {
                service: srvType || selectedService,
                date: selectedDate,
                time: selectedTime
            }
        });
    };

    return (
        <div className="dashboard-root">
            <nav className="dashboard-nav">
                <div className="nav-left">
                    <div className="nav-logo">AutoService Pro</div>
                </div>
                <div className="nav-center">
                    <button className="nav-link" onClick={() => navigate('/dashboard')} style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}>Dashboard</button>
                    <button className="nav-link" onClick={() => navigate('/add-vehicle')} style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}>My Vehicles</button>
                    <button className="nav-link active" style={{ background: 'transparent', border: 'none' }}>Book Service</button>
                    <button className="nav-link" onClick={() => navigate('/history')} style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}>Booking History</button>
                </div>
                <div className="nav-right">
                    <div className="nav-avatar"></div>
                </div>
            </nav>

            <main className="dashboard-content" style={{ padding: '40px', maxWidth: '1000px', margin: '0 auto', background: '#f8fafc', minHeight: 'calc(100vh - 70px)' }}>
                <h1 style={{ fontSize: '28px', marginBottom: '8px' }}>Book Service Appointment</h1>
                <p style={{ color: '#64748b', marginBottom: '40px' }}>Select the type of mechanical attention your vehicle requires. Precision diagnostics and expert handling guaranteed for every selection.</p>

                {/* Service Types */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '48px' }}>
                    {['Regular Service', 'Part Replacement'].map(srv => (
                        <div
                            key={srv}
                            onClick={() => { setSelectedService(srv); handleConfirm(srv); }}
                            style={{
                                padding: '32px 24px',
                                border: '1px solid #cbd5e1',
                                borderRadius: '12px',
                                background: 'white',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                                boxShadow: 'none'
                            }}
                            onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#b45309'; e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0,0,0,0.1)'; }}
                            onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#cbd5e1'; e.currentTarget.style.boxShadow = 'none'; }}
                        >
                            <h3 style={{ margin: '0 0 12px 0', fontSize: '18px' }}>{srv}</h3>
                            <p style={{ margin: 0, fontSize: '14px', color: '#64748b', lineHeight: '1.5' }}>Select and proceed with {srv.toLowerCase()} for your vehicle. Guaranteed parts using OEM standard guidelines.</p>
                            <span style={{ color: '#b45309', fontSize: '14px', fontWeight: 600, display: 'inline-block', marginTop: '24px' }}>
                                Select Service &gt;
                            </span>
                        </div>
                    ))}
                </div>

                {/* Schedule Availability */}
                <div style={{ background: 'white', padding: '40px', borderRadius: '12px', border: '1px solid #cbd5e1' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '40px' }}>
                        <div>
                            <h2 style={{ margin: '0 0 8px 0', fontSize: '20px' }}>Schedule Availability</h2>
                            <p style={{ margin: 0, color: '#64748b', fontSize: '14px' }}>Select your preferred date and time for the appointment.</p>
                        </div>
                        <input
                            type="date"
                            className="form-input"
                            style={{ width: 'auto', padding: '10px 16px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                            value={selectedDate}
                            onChange={(e) => { setSelectedDate(e.target.value); setSelectedTime(''); }}
                        />
                    </div>

                    <div>
                        <p style={{ fontWeight: 600, marginBottom: '20px', color: '#334155' }}>AVAILABLE TIME SLOTS</p>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '16px' }}>
                            {availableSlots.map(slot => {
                                const isTaken = takenSlots.includes(slot);
                                const isSelected = selectedTime === slot;

                                let btnStyle = {
                                    padding: '14px',
                                    borderRadius: '8px',
                                    border: '1px solid #cbd5e1',
                                    background: 'white',
                                    cursor: 'pointer',
                                    fontWeight: 500,
                                    textAlign: 'center',
                                    fontSize: '14px'
                                };

                                if (isTaken) {
                                    btnStyle.background = '#fef2f2';
                                    btnStyle.color = '#ef4444';
                                    btnStyle.border = '2px solid #ef4444';
                                    btnStyle.cursor = 'not-allowed';
                                    btnStyle.opacity = 0.7;
                                } else if (isSelected) {
                                    btnStyle.border = '2px solid #10b981';
                                    btnStyle.color = '#065f46';
                                    btnStyle.background = '#d1fae5';
                                    btnStyle.boxShadow = '0 0 0 1px #10b981';
                                } else {
                                    btnStyle.border = '2px solid #10b981';
                                    btnStyle.color = '#10b981';
                                }

                                return (
                                    <button
                                        key={slot}
                                        style={btnStyle}
                                        disabled={isTaken}
                                        onClick={() => setSelectedTime(slot)}
                                    >
                                        {slotLabels[slot]} {isTaken && '(Taken)'}
                                    </button>
                                );
                            })}
                        </div>

                    </div>
                </div>
            </main>
        </div>
    );
}

export default BookAppointment;
