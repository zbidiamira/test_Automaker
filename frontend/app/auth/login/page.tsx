import React, { useState } from 'react';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        // Add form validation
        if (!email || !password) {
            setError('Email and password are required');
            setLoading(false);
            return;
        }

        // API call for login
        try {
            // Call login API
            // Store JWT token securely
        } catch (err) {
            setError('Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            {error && <p>{error}</p>}
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
            <button type="submit" disabled={loading}>{loading ? 'Logging in...' : 'Login'}</button>
        </form>
    );
};

export default LoginPage;