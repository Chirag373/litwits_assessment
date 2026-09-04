import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from '../components/Modal';
import { useAuth } from '../context/AuthContext';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const { user } = useAuth();
  const token = user?.token;

  // Unified modal state
  const [modalConfig, setModalConfig] = useState({ isOpen: false, type: null });
  const [showPassword, setShowPassword] = useState(false);
  
  const [selectedUser, setSelectedUser] = useState(null);
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'user', password: '' });

  const fetchUsers = async () => {
    try {
      const response = await axios.get('/api/users', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(response.data);
    } catch (error) {
      console.error('Failed to fetch users:', error);
    }
  };

  useEffect(() => {
    if (token) fetchUsers();
  }, [token]);

  // Handlers for Delete
  const openDeleteModal = (u) => {
    setSelectedUser(u);
    setModalConfig({ isOpen: true, type: 'delete' });
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`/api/users/${selectedUser._id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(users.filter(u => u._id !== selectedUser._id));
      closeModal();
    } catch (error) {
      console.error('Failed to delete user:', error);
    }
  };

  // Handlers for Edit
  const openEditModal = (u) => {
    setSelectedUser({ ...u, password: '' }); 
    setModalConfig({ isOpen: true, type: 'edit' });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setSelectedUser({ ...selectedUser, [name]: value });
  };

  const saveEdit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/users/${selectedUser._id}`, selectedUser, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchUsers();
      closeModal();
    } catch (error) {
      console.error('Failed to update user:', error);
    }
  };

  // Handlers for Add
  const openAddModal = () => {
    setNewUser({ name: '', email: '', role: 'user', password: '' });
    setModalConfig({ isOpen: true, type: 'add' });
  };

  const handleAddChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const saveAdd = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/users', newUser, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchUsers();
      closeModal();
    } catch (error) {
      console.error('Failed to create user:', error);
    }
  };

  const closeModal = () => {
    setModalConfig({ isOpen: false, type: null });
    setSelectedUser(null);
    setShowPassword(false);
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h2>Admin Dashboard</h2>
          <p>Manage system users and their roles</p>
        </div>
        <button className="btn btn-primary" onClick={openAddModal}>
          + Add New User
        </button>
      </div>

      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div className="table-container" style={{ border: 'none' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>User Details</th>
                <th>Role</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u._id}>
                  <td>
                    <div style={{ fontWeight: 500 }}>{u.name}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{u.email}</div>
                  </td>
                  <td>
                    <span className="badge" style={{ backgroundColor: u.role === 'admin' ? '#FEF3C7' : '#EEF2FF', color: u.role === 'admin' ? '#D97706' : '#4F46E5' }}>
                      {u.role}
                    </span>
                  </td>
                  <td>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', color: '#10B981' }}>
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10B981' }}></span>
                      Active
                    </span>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <button 
                      className="btn btn-outline" 
                      style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem', marginRight: '0.5rem' }}
                      onClick={() => openEditModal(u)}
                    >
                      Edit
                    </button>
                    <button 
                      className="btn btn-danger" 
                      style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem' }} 
                      onClick={() => openDeleteModal(u)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan="4" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Unified Dynamic Modal */}
      {modalConfig.isOpen && (
        <Modal 
          isOpen={modalConfig.isOpen} 
          onClose={closeModal} 
          title={
            modalConfig.type === 'add' ? 'Add New User' :
            modalConfig.type === 'edit' ? 'Edit User' :
            modalConfig.type === 'delete' ? 'Confirm Deletion' : ''
          }
        >
          {modalConfig.type === 'add' && (
            <form onSubmit={saveAdd}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">Name</label>
                  <input className="form-input" name="name" value={newUser.name} onChange={handleAddChange} placeholder="e.g. John Doe" required />
                </div>
                <div className="form-group">
                  <label className="form-label">Email</label>
                  <input type="email" className="form-input" name="email" value={newUser.email} onChange={handleAddChange} placeholder="john@example.com" required />
                </div>
                <div className="form-group">
                  <label className="form-label">Password</label>
                  <div className="password-wrapper">
                    <input type={showPassword ? "text" : "password"} className="form-input" name="password" value={newUser.password} onChange={handleAddChange} placeholder="••••••••" required />
                    <button type="button" className="password-toggle" onClick={() => setShowPassword(!showPassword)} tabIndex="-1">
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Role</label>
                  <select className="form-input" name="role" value={newUser.role} onChange={handleAddChange}>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-outline" onClick={closeModal}>Cancel</button>
                <button type="submit" className="btn btn-primary">Add User</button>
              </div>
            </form>
          )}

          {modalConfig.type === 'edit' && selectedUser && (
            <form onSubmit={saveEdit}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">Name</label>
                  <input className="form-input" name="name" value={selectedUser.name} onChange={handleEditChange} required />
                </div>
                <div className="form-group">
                  <label className="form-label">Email</label>
                  <input type="email" className="form-input" name="email" value={selectedUser.email} onChange={handleEditChange} required />
                </div>
                <div className="form-group">
                  <label className="form-label">
                    New Password <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 'normal' }}>(Leave blank to keep current)</span>
                  </label>
                  <div className="password-wrapper">
                    <input type={showPassword ? "text" : "password"} className="form-input" name="password" value={selectedUser.password} onChange={handleEditChange} placeholder="••••••••" />
                    <button type="button" className="password-toggle" onClick={() => setShowPassword(!showPassword)} tabIndex="-1">
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Role</label>
                  <select className="form-input" name="role" value={selectedUser.role} onChange={handleEditChange}>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-outline" onClick={closeModal}>Cancel</button>
                <button type="submit" className="btn btn-primary">Save Changes</button>
              </div>
            </form>
          )}

          {modalConfig.type === 'delete' && selectedUser && (
            <div>
              <div className="modal-body">
                <p>Are you sure you want to delete the user <strong>{selectedUser.name}</strong>?</p>
                <p style={{ fontSize: '0.875rem', color: 'var(--danger)', marginTop: '0.5rem' }}>This action cannot be undone.</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-outline" onClick={closeModal}>Cancel</button>
                <button type="button" className="btn btn-danger" onClick={confirmDelete}>Delete User</button>
              </div>
            </div>
          )}
        </Modal>
      )}

    </div>
  );
};

export default AdminDashboard;
