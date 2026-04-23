import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css';

function StaffInventory() {
    const navigate = useNavigate();
    const [inventory, setInventory] = useState([]);

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
        } catch (e) {
            console.error("Failed fetching inventory", e);
        }
    };

    // Calculate dynamic stats
    const totalSKUs = inventory.length;
    const lowStockAlerts = inventory.filter(img => img.stock_quantity < 5).length;
    const totalValue = inventory.reduce((sum, item) => sum + (item.stock_quantity * item.price), 0);

    return (
        <div style={{ background: '#f8fafc', minHeight: '100vh', fontFamily: 'Inter, sans-serif' }}>

            {/* Minimal Nav for Staff */}
            <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 32px', background: 'white', borderBottom: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
                    <div style={{ fontWeight: 'bold', fontSize: '18px', color: '#0f172a' }}>AutoService Pro <span style={{ fontSize: '12px', background: '#f1f5f9', padding: '4px 8px', borderRadius: '4px', color: '#64748b', marginLeft: '8px' }}>Staff Portal</span></div>
                    <div style={{ display: 'flex', gap: '24px' }}>
                        <span onClick={() => navigate('/staff-dashboard')} style={{ color: '#64748b', cursor: 'pointer' }}>Dashboard</span>
                        <span onClick={() => navigate('/staff-inventory')} style={{ color: '#ea580c', fontWeight: 'bold', borderBottom: '2px solid #ea580c', paddingBottom: '16px', marginBottom: '-17px', cursor: 'pointer' }}>Inventory</span>
                        <span onClick={() => navigate('/staff-appointments')} style={{ color: '#64748b', cursor: 'pointer' }}>Appointments</span>
                    </div>
                </div>
            </nav>

            <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 24px', display: 'flex', gap: '32px' }}>

                {/* Main Content Area */}
                <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '32px' }}>
                        <div>
                            <h1 style={{ margin: '4px 0 0 0', fontSize: '28px', color: '#0f172a' }}>Parts Inventory</h1>
                            <p style={{ margin: '4px 0 0 0', color: '#64748b', fontSize: '14px' }}>Manage your service center's mechanical supplies and stock levels.</p>
                        </div>
                        <div style={{ display: 'flex', gap: '12px' }}>
                            <button style={{ background: 'white', border: '1px solid #e2e8f0', padding: '8px 16px', borderRadius: '8px', fontSize: '13px', fontWeight: 'bold', color: '#0f172a', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                                Export CSV
                            </button>
                            <button style={{ background: '#b45309', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '8px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                                Add New Part
                            </button>
                        </div>
                    </div>

                    {/* Stats Boxes inside Inventory Area */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginBottom: '32px' }}>
                        <div style={{ background: 'white', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                            <span style={{ fontSize: '11px', color: '#64748b', fontWeight: 'bold', letterSpacing: '0.05em' }}>TOTAL SKUs</span>
                            <h2 style={{ fontSize: '32px', margin: '8px 0 0 0', color: '#0f172a' }}>{totalSKUs}</h2>
                        </div>
                        <div style={{ background: 'white', padding: '24px', borderRadius: '12px', border: '1px solid #fca5a5', position: 'relative', overflow: 'hidden' }}>
                            <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '4px', background: '#ef4444' }}></div>
                            <span style={{ fontSize: '11px', color: '#ef4444', fontWeight: 'bold', letterSpacing: '0.05em' }}>LOW STOCK ALERTS</span>
                            <h2 style={{ fontSize: '32px', margin: '8px 0 0 0', color: '#b91c1c' }}>{lowStockAlerts}</h2>
                        </div>
                        <div style={{ background: 'white', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                            <span style={{ fontSize: '11px', color: '#64748b', fontWeight: 'bold', letterSpacing: '0.05em' }}>TOTAL VALUE</span>
                            <h2 style={{ fontSize: '32px', margin: '8px 0 0 0', color: '#0f172a' }}>₹{totalValue.toFixed(2)}</h2>
                        </div>
                    </div>

                    {/* Inventory Table */}
                    <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                            <thead style={{ background: '#f8fafc' }}>
                                <tr>
                                    <th style={{ padding: '16px 24px', color: '#64748b', fontSize: '11px', fontWeight: 'bold', letterSpacing: '0.05em' }}>PART DETAILS</th>
                                    <th style={{ padding: '16px 24px', color: '#64748b', fontSize: '11px', fontWeight: 'bold', letterSpacing: '0.05em' }}>CATEGORY</th>
                                    <th style={{ padding: '16px 24px', color: '#64748b', fontSize: '11px', fontWeight: 'bold', letterSpacing: '0.05em', width: '150px' }}>STOCK LEVEL</th>
                                    <th style={{ padding: '16px 24px', color: '#64748b', fontSize: '11px', fontWeight: 'bold', letterSpacing: '0.05em' }}>STATUS</th>
                                    <th style={{ padding: '16px 24px', color: '#64748b', fontSize: '11px', fontWeight: 'bold', letterSpacing: '0.05em' }}>UNIT PRICE</th>
                                </tr>
                            </thead>
                            <tbody>
                                {inventory.map((item, i) => (
                                    <tr key={i} style={{ borderBottom: '1px solid #e2e8f0' }}>
                                        <td style={{ padding: '20px 24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                                            <div style={{ width: '40px', height: '40px', background: '#f1f5f9', borderRadius: '8px', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#64748b' }}>
                                                {/* Generic part icon */}
                                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
                                            </div>
                                            <div>
                                                <strong style={{ display: 'block', fontSize: '14px', color: '#0f172a' }}>{item.name}</strong>
                                                <span style={{ fontSize: '11px', color: '#64748b' }}>SKU: PRT-00{item.id}</span>
                                            </div>
                                        </td>
                                        <td style={{ padding: '20px 24px', fontSize: '13px', color: '#64748b' }}>Consumables</td>
                                        <td style={{ padding: '20px 24px' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                                <div style={{ flex: 1, height: '4px', background: '#f1f5f9', borderRadius: '2px' }}>
                                                    <div style={{ width: `${Math.min((item.stock_quantity / 50) * 100, 100)}%`, height: '100%', background: item.stock_quantity < 5 ? '#ef4444' : '#10b981', borderRadius: '2px' }}></div>
                                                </div>
                                                <span style={{ fontSize: '13px', fontWeight: 'bold', color: '#0f172a', width: '30px' }}>{item.stock_quantity}</span>
                                            </div>
                                        </td>
                                        <td style={{ padding: '20px 24px' }}>
                                            <span style={{ fontSize: '11px', fontWeight: 'bold', color: item.stock_quantity < 5 ? '#ef4444' : '#10b981', padding: '4px 8px', borderRadius: '4px', background: item.stock_quantity < 5 ? '#fef2f2' : '#d1fae5' }}>
                                                {item.stock_quantity < 5 ? 'Issue Detected' : 'Ready for Use'}
                                            </span>
                                        </td>
                                        <td style={{ padding: '20px 24px', fontSize: '14px', fontWeight: 'bold', color: '#0f172a' }}>
                                            ₹{item.price}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Right Abstract Box (Automated Reordering graphic from mockup) */}
                <div style={{ width: '300px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    <h3 style={{ fontSize: '14px', color: '#0f172a', margin: '32px 0 0 0' }}>Recent Inventory Movements</h3>

                    <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '20px', display: 'flex', gap: '12px' }}>
                        <div style={{ color: '#10b981' }}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 16 16 12 12 8"></polyline><line x1="8" y1="12" x2="16" y2="12"></line></svg></div>
                        <div>
                            <span style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', color: '#0f172a', marginBottom: '4px' }}>Stock Received: Brake Pads</span>
                            <span style={{ fontSize: '11px', color: '#64748b' }}>+20 units added by System</span>
                        </div>
                    </div>

                </div>

            </main>
        </div>
    );
}

export default StaffInventory;
