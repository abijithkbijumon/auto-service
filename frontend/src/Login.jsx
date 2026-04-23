import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    });

    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        });
        setError(null);
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://127.0.0.1:8000/users/auth/login/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(credentials)
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('user', JSON.stringify(data.user));
                localStorage.setItem('vehicles', JSON.stringify(data.vehicles));
                // 2 corresponds to STAFF in our backend
                if (data.user.user_type === 2) {
                    navigate('/staff-dashboard');
                } else {
                    navigate('/dashboard');
                }
            } else {
                const data = await response.json();
                setError(data.error || 'Invalid credentials');
            }
        } catch (err) {
            setError('Unable to connect to the server.');
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontFamily: 'Inter', backgroundColor: '#f8fafc', color: '#1e293b' }}>
            <div style={{ background: 'white', padding: '60px', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', textAlign: 'center', maxWidth: '400px', width: '100%' }}>
                <h1 style={{ margin: '0 0 16px 0' }}>Welcome Back</h1>
                <p style={{ color: '#64748b', marginBottom: '32px' }}>Please log in to manage your vehicle services.</p>

                {error && (
                    <div style={{ background: '#fef2f2', color: '#ef4444', padding: '12px', borderRadius: '8px', marginBottom: '24px', fontSize: '14px', border: '1px solid #fca5a5' }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin}>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={credentials.email}
                        onChange={handleChange}
                        required
                        style={{ width: '100%', padding: '12px 16px', marginBottom: '16px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px', boxSizing: 'border-box' }}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={credentials.password}
                        onChange={handleChange}
                        required
                        style={{ width: '100%', padding: '12px 16px', marginBottom: '32px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px', boxSizing: 'border-box' }}
                    />
                    <button type="submit" style={{ width: '100%', padding: '14px', background: '#F97316', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>
                        Log In
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;
