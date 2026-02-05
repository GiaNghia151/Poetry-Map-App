import React, { useState } from 'react';

const Auth: React.FC = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIsLogin] = useState(true);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            var payload = isLogin ? { email, password } : { username, email, password };
            var response = await fetch('/api/auth/' + (isLogin ? 'login' : 'register'), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                var data = await response.json();
                throw new Error(data.message || 'Authentication failed');
            }

            // Handle successful authentication
            console.log('Authentication successful');
        } catch (e) {
            var err: any = e;
            setError(err.message || 'An unknown error occurred');
        }
    };

    return (
        <div style={{ padding: '40px', background: '#222', color: 'white', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ background: '#333', padding: '30px', borderRadius: '8px', width: '100%', maxWidth: '400px' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>{isLogin ? 'Login' : 'Register'}</h2>
                <form onSubmit={handleSubmit}>
                    {!isLogin && (
                        <div style={{ marginBottom: '15px' }}>
                            <label style={{ display: 'block', marginBottom: '5px' }}>Username:</label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #555', background: '#444', color: 'white' }}
                                required
                            />
                        </div>
                    )}
                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'block', marginBottom: '5px' }}>Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #555', background: '#444', color: 'white' }}
                            required
                        />
                    </div>
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', marginBottom: '5px' }}>Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #555', background: '#444', color: 'white' }}
                            required
                        />
                    </div>
                    <button type="submit" style={{ width: '100%', padding: '12px', borderRadius: '4px', border: 'none', background: '#007bff', color: 'white', fontWeight: 'bold', cursor: 'pointer' }}>
                        {isLogin ? 'Login' : 'Register'}
                    </button>
                    {error && <p style={{ color: '#ff6b6b', marginTop: '15px', textAlign: 'center' }}>{error}</p>}
                </form>
                <div style={{ marginTop: '20px', textAlign: 'center' }}>
                    <button
                        onClick={() => setIsLogin(!isLogin)}
                        style={{ background: 'none', border: 'none', color: '#007bff', cursor: 'pointer', textDecoration: 'underline' }}
                    >
                        Switch to {isLogin ? 'Register' : 'Login'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export const useAuth = () => {
    return {
        user: { name: 'Guest' },
        login: function () { },
        logout: function () { }
    };
};

export default Auth;