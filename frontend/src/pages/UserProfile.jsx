import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const UserProfile = () => {
  const { user } = useAuth();
  const token = user?.token;

  const [profile, setProfile] = useState({ 
    name: user?.name || '', 
    email: user?.email || '',
    password: ''
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('/api/users/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProfile({ name: response.data.name, email: response.data.email, password: '' });
      } catch (err) {
        console.error('Failed to fetch profile', err);
      }
    };
    
    if (token) fetchProfile();
  }, [token]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    
    try {
      await axios.put('/api/users/profile', profile, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setMessage('Profile updated successfully!');
      setProfile(prev => ({ ...prev, password: '' })); // clear password field
    } catch (err) {
      setError(err.response?.data?.message || 'Server error');
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <div className="page-header">
        <div>
          <h2>My Profile</h2>
          <p>Update your personal information</p>
        </div>
      </div>

      <div className="card">
        {message && (
          <div style={{ backgroundColor: '#D1FAE5', color: '#059669', padding: '0.75rem', borderRadius: '8px', marginBottom: '1.5rem', fontSize: '0.875rem' }}>
            {message}
          </div>
        )}
        {error && (
          <div style={{ backgroundColor: '#FEF2F2', color: '#DC2626', padding: '0.75rem', borderRadius: '8px', marginBottom: '1.5rem', fontSize: '0.875rem' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleUpdate}>
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input 
              className="form-input"
              value={profile.name} 
              onChange={e => setProfile({...profile, name: e.target.value})} 
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input 
              type="email"
              className="form-input"
              value={profile.email} 
              onChange={e => setProfile({...profile, email: e.target.value})} 
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">New Password <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>(Leave blank to keep current)</span></label>
            <input 
              type="password"
              className="form-input"
              placeholder="••••••••"
              value={profile.password} 
              onChange={e => setProfile({...profile, password: e.target.value})} 
            />
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '2rem', borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>
            <button type="submit" className="btn btn-primary">Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserProfile;
