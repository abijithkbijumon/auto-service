import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './index.css';

function PartReplacementDetails() {
    const location = useLocation();
    const navigate = useNavigate();

    const state = location.state || {
        service: 'Part Replacement',
        date: '2024-10-15',
        time: '09:00:00',
        vehicleId: null,
        vin: 'ABC-1234-XYZ',
        lastServiceDate: ''
    };

    const [issueDescription, setIssueDescription] = useState('');
    const [inventory, setInventory] = useState([]);
    const [selectedPartId, setSelectedPartId] = useState('');

    useEffect(() => {
        fetchInventory();
    }, []);

    const fetchInventory = async () => {
        try {
            const res = await fetch('http://127.0.0.1:8000/api/inventory/');
            if (res.ok) {
                const data = await res.json();
                setInventory(data);
            }
        } catch (err) {
            console.error("Error fetching inventory", err);
        }
    };

    const selectedPart = inventory.find(p => p.id.toString() === selectedPartId);
    const isOutOfStock = selectedPart && selectedPart.stock_quantity <= 0;

    const handleNext = () => {
        if (!selectedPartId) return alert("Please select a part to replace.");
        if (isOutOfStock) return alert("Selected part is currently out of stock.");
        if (!issueDescription.trim()) return alert("Please explain the issue briefly.");

        // Next step is billing! (Wait, keeping it the same as the previous flow)
        navigate('/billing', {
            state: {
                ...state,
                instructions: `Part Replacement (${selectedPart.name}): ${issueDescription}`,
                selectedPartData: selectedPart
            }
        });
    };

    return (
        <div className="dashboard-root" style={{ background: '#f8fafc', minHeight: '100vh', fontFamily: 'Inter, sans-serif' }}>
            <nav className="dashboard-nav" style={{ borderBottom: '1px solid #e2e8f0', background: 'white' }}>
                <div className="nav-left">
                    <div className="nav-logo" style={{ color: '#0f172a' }}>AutoService Pro</div>
                </div>
                <div className="nav-center">
                    <button className="nav-link" onClick={() => navigate('/dashboard')} style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}>Dashboard</button>
                    <button className="nav-link" style={{ background: 'transparent', border: 'none' }}>Services</button>
                    <button className="nav-link" onClick={() => navigate('/add-vehicle')} style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}>My Vehicles</button>
                    <button className="nav-link" onClick={() => navigate('/history')} style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}>Booking History</button>
                </div>
            </nav>

            <main style={{ maxWidth: '1000px', margin: '0 auto', padding: '40px 20px' }}>
                {/* Stepper */}
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '48px', position: 'relative' }}>
                    <div style={{ position: 'absolute', top: '15px', left: '20%', right: '20%', height: '2px', background: '#e2e8f0', zIndex: 1 }}></div>
                    <div style={{ position: 'absolute', top: '15px', left: '20%', right: '40%', height: '2px', background: '#0d9488', zIndex: 1 }}></div>

                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 2, background: '#f8fafc', padding: '0 10px' }}>
                        <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#0d9488', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold', marginBottom: '8px' }}>✓</div>
                        <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#0d9488', letterSpacing: '0.05em' }}>SERVICE</span>
                    </div>

                    <div style={{ flex: 1 }}></div>

                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 2, background: '#f8fafc', padding: '0 10px' }}>
                        <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#0d9488', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold', marginBottom: '8px' }}>✓</div>
                        <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#0d9488', letterSpacing: '0.05em' }}>VEHICLE</span>
                    </div>

                    <div style={{ flex: 1 }}></div>

                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 2, background: '#f8fafc', padding: '0 10px' }}>
                        <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'white', border: '2px solid #0f172a', color: '#0f172a', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold', marginBottom: '8px' }}>3</div>
                        <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#0f172a', letterSpacing: '0.05em' }}>DETAILS</span>
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '32px', alignItems: 'start' }}>

                    {/* Explain Issue Box */}
                    <div style={{ background: 'white', borderRadius: '12px', padding: '40px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)' }}>
                        <h2 style={{ margin: '0 0 8px 0', fontSize: '24px', color: '#0f172a' }}>Diagnostics & Symptoms</h2>
                        <p style={{ margin: '0 0 24px 0', color: '#64748b', fontSize: '14px' }}>Please explain the issue you are facing clearly so our technicians know what to inspect prior to replacement.</p>

                        <div style={{ marginBottom: '24px' }}>
                            <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', color: '#0f172a', marginBottom: '8px' }}>Describe the Issue</label>
                            <textarea
                                style={{ width: '100%', boxSizing: 'border-box', padding: '16px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '15px', color: '#0f172a', minHeight: '200px', resize: 'vertical' }}
                                placeholder="E.g. Squeaking noise when braking, loss of power..."
                                value={issueDescription}
                                onChange={(e) => setIssueDescription(e.target.value)}
                            ></textarea>
                        </div>
                    </div>

                    {/* Part Select Box */}
                    <div style={{ background: 'white', borderRadius: '12px', padding: '40px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)' }}>
                        <h2 style={{ margin: '0 0 8px 0', fontSize: '24px', color: '#0f172a' }}>Select Parts</h2>
                        <p style={{ margin: '0 0 24px 0', color: '#64748b', fontSize: '14px' }}>Choose the replacement components necessary from our live inventory stock.</p>

                        <div style={{ marginBottom: '32px' }}>
                            <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', color: '#0f172a', marginBottom: '8px' }}>OEM Component Required</label>
                            <select
                                style={{ width: '100%', padding: '16px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '15px', color: '#0f172a', backgroundColor: '#f8fafc', appearance: 'none', cursor: 'pointer' }}
                                value={selectedPartId}
                                onChange={(e) => setSelectedPartId(e.target.value)}
                            >
                                <option value="">-- View Live Inventory --</option>
                                {inventory.map(part => (
                                    <option key={part.id} value={part.id}>{part.name} (₹{part.price})</option>
                                ))}
                            </select>
                        </div>

                        {/* Status Message Display */}
                        {selectedPartId && (
                            <div style={{ padding: '20px', borderRadius: '12px', background: isOutOfStock ? '#fef2f2' : '#ecfdf5', border: `1px solid ${isOutOfStock ? '#fca5a5' : '#a7f3d0'}` }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                                    <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: isOutOfStock ? '#ef4444' : '#10b981', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold' }}>
                                        {isOutOfStock ? '!' : '✓'}
                                    </div>
                                    <strong style={{ fontSize: '16px', color: isOutOfStock ? '#991b1b' : '#065f46' }}>
                                        {isOutOfStock ? 'Currently Out of Stock' : 'Part in Stock & Reserved'}
                                    </strong>
                                </div>
                                <p style={{ margin: 0, fontSize: '13px', color: isOutOfStock ? '#b91c1c' : '#047857', lineHeight: '1.5' }}>
                                    {isOutOfStock
                                        ? `We unfortunately don't have enough ${selectedPart.name} on hand right now. Booking cannot proceed.`
                                        : `We have ${selectedPart.stock_quantity} units available in the Central Maintenance Hub right now.`}
                                </p>
                            </div>
                        )}

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f1f5f9', paddingTop: '32px', marginTop: '32px' }}>
                            <button
                                onClick={() => navigate(-1)}
                                style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px', background: 'white', border: '2px solid #0f172a', borderRadius: '8px', color: '#0f172a', fontWeight: 'bold', cursor: 'pointer' }}
                            >
                                Back
                            </button>
                            <button
                                onClick={handleNext}
                                disabled={isOutOfStock}
                                style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px', background: isOutOfStock ? '#cbd5e1' : '#f97316', border: 'none', borderRadius: '8px', color: 'white', fontWeight: 'bold', cursor: isOutOfStock ? 'not-allowed' : 'pointer' }}
                            >
                                Go to Billing Page
                            </button>
                        </div>

                    </div>
                </div>
            </main>
        </div>
    );
}

export default PartReplacementDetails;
