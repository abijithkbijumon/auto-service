import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { DollarSign, TrendingUp, AlertCircle, Activity } from 'lucide-react';

const RevenueDashboard = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/repair-orders/dashboard_stats/')
      .then(res => {
        if (!res.ok) throw new Error('Backend failed to return stats');
        return res.json();
      })
      .then(json => setData(json))
      .catch(err => {
        console.error(err);
        setError(err.message);
      });
  }, []);

  if (error) return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', color: '#ef4444', background: '#fef2f2', padding: '20px', textAlign: 'center' }}>
      <div>
        <AlertCircle size={48} style={{ marginBottom: '16px' }} />
        <h2>Failed to load revenue data</h2>
        <p>{error}</p>
        <p style={{ fontSize: '14px' }}>Please ensure the Django backend is running.</p>
      </div>
    </div>
  );

  if (!data) return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', color: '#64748b' }}>
      <div style={{ textAlign: 'center' }}>
        <Activity size={40} style={{ marginBottom: '16px', color: '#ea580c' }} />
        <p>Loading Financial Intelligence...</p>
      </div>
    </div>
  );

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', fontFamily: 'Inter, sans-serif' }}>
      {/* Staff Nav */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 32px', background: 'white', borderBottom: '1px solid #e2e8f0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          <div style={{ fontWeight: 'bold', fontSize: '18px', color: '#0f172a' }}>AutoService Pro <span style={{ fontSize: '12px', background: '#f1f5f9', padding: '4px 8px', borderRadius: '4px', color: '#64748b', marginLeft: '8px' }}>Staff Portal</span></div>
          <div style={{ display: 'flex', gap: '24px' }}>
            <span onClick={() => navigate('/staff-dashboard')} style={{ color: '#64748b', cursor: 'pointer' }}>Dashboard</span>
            <span onClick={() => navigate('/staff-inventory')} style={{ color: '#64748b', cursor: 'pointer' }}>Inventory</span>
            <span onClick={() => navigate('/staff-appointments')} style={{ color: '#64748b', cursor: 'pointer' }}>Appointments</span>
            <span onClick={() => navigate('/revenue')} style={{ color: '#ea580c', fontWeight: 'bold', borderBottom: '2px solid #ea580c', paddingBottom: '16px', marginBottom: '-17px', cursor: 'pointer' }}>Revenue</span>
          </div>
        </div>
      </nav>

      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 24px' }}>
        <div style={{ marginBottom: '32px' }}>
          <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#ea580c', letterSpacing: '0.05em' }}>FINANCIALS</span>
          <h1 style={{ margin: '4px 0 0 0', fontSize: '32px', color: '#0f172a' }}>Revenue Dashboard</h1>
        </div>

        {/* Top Stats Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px', marginBottom: '40px' }}>
          <StatCard
            title="TOTAL REVENUE"
            value={`₹${(data.summary.total_revenue || 0).toLocaleString()}`}
            change="+8.4%"
            icon={<DollarSign size={20} color="#ea580c" />}
          />
          <StatCard
            title="MONTHLY GROWTH"
            value={`${data.summary.monthly_growth}%`}
            change="+2.1%"
            icon={<TrendingUp size={20} color="#10b981" />}
          />
          <StatCard
            title="AVG SERVICE VALUE"
            value={`₹${data.summary.avg_service_value}`}
            change="-1.4%"
            icon={<Activity size={20} color="#3b82f6" />}
          />
          <StatCard
            title="OUTSTANDING"
            value={`₹${(data.summary.outstanding_payments || 0).toLocaleString()}`}
            status="CRITICAL"
            icon={<AlertCircle size={20} color="#ef4444" />}
          />
        </div>

        {/* Main Chart */}
        <div style={{ background: 'white', padding: '32px', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', marginBottom: '32px' }}>
          <h3 style={{ margin: '0 0 24px 0', fontSize: '18px', color: '#0f172a' }}>Daily Revenue Distribution (Last 30 Days)</h3>
          <div style={{ height: '400px', width: '100%', position: 'relative' }}>
            {data.daily_distribution && data.daily_distribution.length > 0 ? (
              <ResponsiveContainer width="99%" height="100%">
                <LineChart data={data.daily_distribution} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis
                    dataKey="day"
                    tick={{ fontSize: 11, fill: '#94a3b8' }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(str) => {
                      const d = new Date(str);
                      return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                    }}
                  />
                  <YAxis
                    tick={{ fontSize: 11, fill: '#94a3b8' }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(val) => `₹${val}`}
                  />
                  <Tooltip
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', fontSize: '12px' }}
                    formatter={(value) => [`₹${value}`, 'Revenue']}
                  />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#ea580c"
                    strokeWidth={3}
                    dot={{ r: 4, fill: '#ea580c', strokeWidth: 2, stroke: 'white' }}
                    activeDot={{ r: 6, strokeWidth: 0 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div style={{ display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center', color: '#94a3b8' }}>
                No data points found for this range.
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

const StatCard = ({ title, value, change, status, icon }) => (
  <div style={{ background: 'white', padding: '24px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
      <span style={{ fontSize: '11px', color: '#64748b', fontWeight: 'bold', letterSpacing: '0.05em' }}>{title}</span>
      <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#f8fafc', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {icon}
      </div>
    </div>
    <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
      <h2 style={{ fontSize: '28px', margin: 0, color: '#0f172a' }}>{value}</h2>
      {status && (
        <span style={{ fontSize: '10px', background: '#fef2f2', color: '#ef4444', padding: '2px 8px', borderRadius: '12px', fontWeight: 'bold' }}>
          {status}
        </span>
      )}
    </div>
    <div style={{ marginTop: '12px', fontSize: '12px' }}>
      <span style={{ color: change?.startsWith('+') ? '#10b981' : '#ef4444', fontWeight: 'bold' }}>{change}</span>
      <span style={{ color: '#94a3b8', marginLeft: '4px' }}>vs last month</span>
    </div>
  </div>
);

export default RevenueDashboard;
