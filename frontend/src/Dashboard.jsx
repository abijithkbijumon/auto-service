import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css';

function Dashboard() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);

            // Re-fetch the latest data to ensure vehicles are loaded properly in case of a stale cache
            if (parsedUser.email) {
                fetch(`http://127.0.0.1:8000/users/auth/me/?email=${parsedUser.email}`)
                    .then(res => res.json())
                    .then(data => {
                        if (data.user) {
                            setUser(data.user);
                            localStorage.setItem('user', JSON.stringify(data.user));
                        }
                    })
                    .catch(err => console.error("Failed to fetch fresh user data:", err));
            }
        } else {
            // Mock user for UI development if bypassed
            setUser({ full_name: 'Alex' });
        }
    }, []);

    const firstName = user?.full_name?.split(' ')[0] || 'Alex';

    let nextAppointmentDisplay = 'N/A';
    let pendingServiceCount = 0;

    if (user?.vehicles?.length > 0) {
        // Calculate soonest next appointment
        const soonest = user.vehicles
            .filter(v => v.next_appointment_date)
            .map(v => new Date(v.next_appointment_date))
            .filter(d => !isNaN(d))
            .sort((a, b) => a - b)[0];
        if (soonest) {
            nextAppointmentDisplay = soonest.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        }

        // Calculate pending (overdue) services
        const now = new Date();
        now.setHours(0, 0, 0, 0);
        pendingServiceCount = user.vehicles.filter(v => {
            if (!v.next_appointment_date) return false;
            const apptDate = new Date(v.next_appointment_date);
            return apptDate < now;
        }).length;
    }

    const pendingDisplay = (pendingServiceCount > 0 && pendingServiceCount < 10) ? `0${pendingServiceCount}` : pendingServiceCount.toString();

    return (
        <div className="dashboard-root">
            {/* Navbar */}
            <nav className="dashboard-nav">
                <div className="nav-left">
                    <div className="nav-logo">AutoService Pro</div>
                </div>
                <div className="nav-center">
                    <button className="nav-link active" style={{ background: 'transparent', border: 'none' }}>Dashboard</button>
                    <button className="nav-link" onClick={() => navigate('/add-vehicle')} style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}>Add Vehicle</button>
                    <button className="nav-link" onClick={() => navigate('/book-appointment')} style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}>Book Service</button>
                    <button className="nav-link" onClick={() => navigate('/history')} style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}>Booking History</button>
                </div>
                <div className="nav-right">
                    <div className="search-wrapper">
                        <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                        <input type="text" placeholder="Search vehicle..." className="nav-search" />
                    </div>
                    <button className="icon-btn">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
                    </button>
                    <button className="icon-btn">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
                    </button>
                    <div className="nav-avatar"></div>
                </div>
            </nav>

            <main className="dashboard-content">
                {/* Hero Section */}
                <div className="hero-section">
                    <div className="hero-text">
                        <h1>Welcome back, {firstName}</h1>
                        <p>Manage your fleet and track upcoming services with precision.</p>
                    </div>
                    <div className="hero-actions">
                        <button className="btn-secondary-dash" onClick={() => navigate('/add-vehicle')}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 16, height: 16, marginRight: 8 }}><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                            Add Vehicle
                        </button>
                        <button className="btn-primary-dash" onClick={() => navigate('/book-appointment')}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 16, height: 16, marginRight: 8 }}><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                            Book Service
                        </button>
                    </div>
                </div>

                {/* KPI Cards */}
                <div className="kpi-grid">
                    <div className="kpi-card">
                        <span className="kpi-label">ONGOING SERVICES</span>
                        <span className="kpi-value warning">{pendingDisplay}</span>
                    </div>
                    <div className="kpi-card">
                        <span className="kpi-label">NEXT APPOINTMENT</span>
                        <span className="kpi-value text-default">{nextAppointmentDisplay}</span>
                    </div>
                </div>

                {/* Active Garage */}
                <div className="section-header">
                    <h2>Active Garage</h2>
                    <button className="btn-sort">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 16, height: 16, marginRight: 6 }}><line x1="21" y1="10" x2="3" y2="10"></line><line x1="21" y1="6" x2="3" y2="6"></line><line x1="21" y1="14" x2="3" y2="14"></line><line x1="21" y1="18" x2="3" y2="18"></line></svg>
                        SORT BY RECENT
                    </button>
                </div>

                <div className="garage-grid">
                    {user?.vehicles?.length > 0 ? (
                        user.vehicles.map((vehicle, index) => {
                            const stockImages = [
                                "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1609630875171-b13213774653?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                            ];
                            const imgSrc = stockImages[index % stockImages.length];

                            return (
                                <div className="vehicle-card" key={vehicle.id || index}>
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
                                            <div className="stat-row">
                                                <span className="stat-label">NEXT APPT</span>
                                                <span className="stat-val">
                                                    {vehicle.next_appointment_date
                                                        ? new Date(vehicle.next_appointment_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                                                        : 'N/A'
                                                    }
                                                </span>
                                            </div>
                                            <div className="stat-row">
                                                <span className="stat-label">SERVICES</span>
                                                <span className="stat-val">{vehicle.service_count}</span>
                                            </div>
                                        </div>
                                        <div className="vc-actions">
                                            <button className="btn-card-outline">View Details</button>
                                            <button className="btn-card-solid">Book Service</button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div style={{ padding: '40px 20px', color: '#64748b', gridColumn: '1 / -1', textAlign: 'center', background: 'white', borderRadius: '12px', border: '1px dashed #cbd5e1' }}>
                            <p style={{ margin: 0, fontSize: '16px', fontWeight: '500' }}>No vehicles registered yet.</p>
                            <p style={{ margin: '8px 0 0 0', fontSize: '14px' }}>Add a vehicle to your garage to start tracking services.</p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}

export default Dashboard;
