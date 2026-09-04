import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const UserProfile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState({ 
    name: user?.username || 'Guest', 
    email: `${user?.username || 'guest'}@example.com`,
    bio: 'Software developer passionate about building great products.'
  });

  const handleUpdate = (e) => {
    e.preventDefault();
    alert('Profile updated successfully!');
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
        <form onSubmit={handleUpdate}>
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input 
              className="form-input"
              value={profile.name} 
              onChange={e => setProfile({...profile, name: e.target.value})} 
            />
          </div>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input 
              type="email"
              className="form-input"
              value={profile.email} 
              onChange={e => setProfile({...profile, email: e.target.value})} 
            />
          </div>
          <div className="form-group">
            <label className="form-label">Short Bio</label>
            <textarea 
              className="form-input"
              rows="4"
              value={profile.bio} 
              onChange={e => setProfile({...profile, bio: e.target.value})} 
              style={{ resize: 'vertical' }}
            />
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '2rem', borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>
            <button type="button" className="btn btn-outline">Cancel</button>
            <button type="submit" className="btn btn-primary">Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserProfile;
