import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { user, login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      if (user.role === 'admin') navigate('/admin');
      else navigate('/profile');
    }
  }, [user, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = login(username, password);
    if (!success) {
      setError('Invalid credentials. Please use admin/admin or user/user.');
    }
  };

  return (
    <div className="login-container">
      <div className="card login-card">
        <div className="login-title">
          <h2>Welcome Back</h2>
          <p>Please enter your details to sign in.</p>
        </div>
        
        {error && (
          <div style={{ backgroundColor: '#FEF2F2', color: '#DC2626', padding: '0.75rem', borderRadius: '8px', marginBottom: '1.5rem', fontSize: '0.875rem', border: '1px solid #FCA5A5' }}>
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Username</label>
            <input 
              className="form-input" 
              placeholder="Enter your username" 
              value={username} 
              onChange={e => setUsername(e.target.value)} 
            />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <div className="password-wrapper">
              <input 
                type={showPassword ? "text" : "password"}
                className="form-input" 
                placeholder="••••••••"
                value={password} 
                onChange={e => setPassword(e.target.value)} 
              />
              <button 
                type="button" 
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex="-1"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '0.5rem' }}>
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
