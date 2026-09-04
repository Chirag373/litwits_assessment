import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <h1 className="navbar-brand">LITWITS</h1>
      {user && (
        <div className="navbar-user">
          <span>
            {user.username} <span className="badge">{user.role}</span>
          </span>
          <button className="btn btn-outline" onClick={handleLogout} style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}>
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
