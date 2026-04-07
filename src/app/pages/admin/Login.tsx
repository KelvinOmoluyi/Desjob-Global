import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { ShieldCheck, LogIn } from 'lucide-react';
import { adminApi } from '../../api/adminApi';
import '../../../styles/admin.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await adminApi.login(email, password);
      if (response.success) {
        navigate('/admin/messages');
      } else {
        setError(response.error || 'Login failed');
      }
    } catch (err) {
      setError('An error occurred during login.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-card">
        <div className="admin-login-header">
          <div className="admin-login-logo-wrap">
            <ShieldCheck size={48} className="admin-login-logo" />
          </div>
          <h1 className="admin-login-title">Admin Login</h1>
          <p className="admin-login-subtitle">Sign in to manage Desjob Global Limited</p>
        </div>

        {error && <div className="admin-error-msg">{error}</div>}

        <form onSubmit={handleLogin} className="admin-form-group" style={{ gap: '1.25rem' }}>
          <div className="admin-form-group">
            <label className="admin-label">Email Address</label>
            <input
              type="email"
              className="admin-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@gmail.com"
              required
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-label">Password</label>
            <input
              type="password"
              className="admin-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          <button 
            type="submit" 
            className="admin-btn-primary" 
            disabled={isLoading}
            style={{ marginTop: '0.5rem', width: '100%' }}
          >
            {isLoading ? 'Signing in...' : (
              <>
                <LogIn size={20} />
                Sign In
              </>
            )}
          </button>
          
          <a href="/" className="admin-btn-secondary">
            Back to Web
          </a>
        </form>
      </div>
    </div>
  );
}
