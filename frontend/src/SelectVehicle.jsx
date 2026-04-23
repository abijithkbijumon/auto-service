import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './index.css';

function SelectVehicle() {
    const location = useLocation();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    // State passed from BookAppointment
    const state = location.state || {
        service: 'Regular Service',
        date: '',
        time: ''
    };

    const [selectedDate, setSelectedDate] = useState(state.date || new Date().toISOString().split('T')[0]);
    const [selectedTime, setSelectedTime] = useState(state.time || '');
    const [takenSlots, setTakenSlots] = useState([]);

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
    };

    const handleSelectVehicle = (vehicle) => {
        if (!selectedTime) { return alert("Please select a date and time slot first from the availability box below!"); }

        const nextRoute = state.service === 'Part Replacement' ? '/part-replacement-details' : '/service-details';

        navigate(nextRoute, {
            state: {
                ...state,
                date: selectedDate,
                time: selectedTime,
                vehicleId: vehicle.id,
                vin: vehicle.identification_number,
                lastServiceDate: vehicle.last_service_date,
                vehicleData: vehicle
            }
        });
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
            </nav>

            <main style={{ maxWidth: '1000px', margin: '0 auto', padding: '40px 20px' }}>
                {/* Stepper Expansion */}
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '48px', position: 'relative' }}>
                    <div style={{ position: 'absolute', top: '15px', left: '20%', right: '20%', height: '2px', background: '#e2e8f0', zIndex: 1 }}></div>
                    <div style={{ position: 'absolute', top: '15px', left: '20%', right: '60%', height: '2px', background: '#0d9488', zIndex: 1 }}></div>

                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 2, background: '#f8fafc', padding: '0 10px' }}>
                        <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#0d9488', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold', marginBottom: '8px' }}>✓</div>
                        <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#0d9488', letterSpacing: '0.05em' }}>SERVICE</span>
                    </div>

                    {/* Middle steps space */}
                    <div style={{ flex: 1 }}></div>

                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 2, background: '#f8fafc', padding: '0 10px' }}>
                        <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#0d9488', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold', marginBottom: '8px' }}>2</div>
                        <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#0d9488', letterSpacing: '0.05em' }}>VEHICLE</span>
                    </div>

                    <div style={{ flex: 1 }}></div>

                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 2, background: '#f8fafc', padding: '0 10px' }}>
                        <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#e2e8f0', color: '#64748b', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold', marginBottom: '8px' }}>3</div>
                        <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#64748b', letterSpacing: '0.05em' }}>DETAILS</span>
                    </div>
                </div>

                <div style={{ marginBottom: '32px' }}>
                    <h1 style={{ fontSize: '28px', color: '#0f172a', marginBottom: '8px' }}>Select Your Vehicle</h1>
                    <p style={{ color: '#64748b' }}>Choose which vehicle from your garage requires this service.</p>
                </div>

                <div className="garage-grid" style={{ marginBottom: '40px' }}>
                    {user?.vehicles?.length > 0 ? (
                        user.vehicles.map((vehicle, index) => {
                            const stockImages = [
                                "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1609630875171-b13213774653?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                            ];
                            const imgSrc = stockImages[index % stockImages.length];

                            return (
                                <div className="vehicle-card" key={vehicle.id || index} style={{ cursor: 'pointer', transition: 'box-shadow 0.2s', border: '2px solid transparent' }}
                                    onMouseEnter={(e) => e.currentTarget.style.border = '2px solid #b45309'}
                                    onMouseLeave={(e) => e.currentTarget.style.border = '2px solid transparent'}
                                    onClick={() => handleSelectVehicle(vehicle)}>
                                    <div className="vc-image-wrapper">
                                        <img src={imgSrc} alt={vehicle.model_name} className="vc-image" />
                                        <div className="status-chip chip-default">
                                            <span className="dot"></span> REGISTERED
                                        </div>
                                    </div>
                                    <div className="vc-content">
                                        <div className="vc-header">
                                            <div>
                                                <h3>{vehicle.model_name}</h3>
                                                <p>{vehicle.registration_year ? `${vehicle.registration_year} Model` : `${vehicle.cc}cc ${vehicle.bike_type}`}</p>
                                            </div>
                                            <span className="plate-badge">{vehicle.identification_number || 'UNREGISTERED'}</span>
                                        </div>
                                        <div className="vc-stats">
                                            <div className="stat-row">
                                                <span className="stat-label">LAST SERVICE</span>
                                                <span className="stat-val">
                                                    {vehicle.last_service_date
                                                        ? new Date(vehicle.last_service_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                                                        : 'No service yet'
                                                    }
                                                </span>
                                            </div>
                                        </div>
                                        <div className="vc-actions">
                                            <button className="btn-card-solid" style={{ width: '100%', background: '#b45309', border: 'none' }}>Proceed with this vehicle</button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div style={{ padding: '40px 20px', color: '#64748b', gridColumn: '1 / -1', textAlign: 'center', background: 'white', borderRadius: '12px', border: '1px dashed #cbd5e1' }}>
                            <p style={{ margin: 0, fontSize: '16px', fontWeight: '500' }}>No vehicles registered yet.</p>
                            <button onClick={() => navigate('/add-vehicle')} style={{ marginTop: '16px', padding: '12px 24px', background: '#b45309', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>+ Add a Vehicle</button>
                        </div>
                    )}
                </div>

                {/* Schedule Availability */}
                <div style={{ background: 'white', padding: '40px', borderRadius: '12px', border: '1px solid #cbd5e1' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '40px' }}>
                        <div>
                            <h2 style={{ margin: '0 0 8px 0', fontSize: '20px' }}>Schedule Availability</h2>
                            <p style={{ margin: 0, color: '#64748b', fontSize: '14px' }}>Confirm or select your preferred date and time for the appointment.</p>
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

export default SelectVehicle;
