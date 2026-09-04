import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // { username: string, role: 'admin' | 'user' }

  const login = (username, password) => {
    // Mock login logic
    if (username === 'admin' && password === 'admin') {
      setUser({ username: 'admin', role: 'admin' });
      return true;
    } else if (username === 'user' && password === 'user') {
      setUser({ username: 'user', role: 'user' });
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
