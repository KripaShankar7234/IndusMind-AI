import React, { createContext, useContext, useState, useEffect } from 'react';
import { authApi } from '../services/apiService';
import { useNotification } from './NotificationContext';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { showSuccess, showError } = useNotification();

  useEffect(() => {
    // Restore persistent session if exists
    const storedUser = localStorage.getItem('indusmind_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error('Failed to parse user session', e);
      }
    } else {
      // Default enterprise demo user
      const defaultUser = {
        id: 'usr_99812',
        name: 'Dr. Sarah Jenkins',
        email: 's.jenkins@titanheavy.com',
        role: 'Chief Reliability Engineer',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150',
        org: 'Titan Heavy Industries',
        apiKey: 'indus_live_9f82a10b42c98402a991'
      };
      setUser(defaultUser);
      localStorage.setItem('indusmind_user', JSON.stringify(defaultUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const res = await authApi.login(email, password);
      setUser(res.user);
      localStorage.setItem('indusmind_user', JSON.stringify(res.user));
      localStorage.setItem('indusmind_token', res.token || 'mock_jwt_token');
      showSuccess(`Welcome back, ${res.user.name}`);
      return true;
    } catch (err) {
      showError(err.message || 'Login failed. Check credentials.');
      return false;
    }
  };

  const register = async (formData) => {
    try {
      const res = await authApi.register(formData);
      setUser(res.user);
      localStorage.setItem('indusmind_user', JSON.stringify(res.user));
      showSuccess('Organization account successfully initialized!');
      return true;
    } catch (err) {
      showError(err.message || 'Registration failed');
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('indusmind_user');
    localStorage.removeItem('indusmind_token');
    showSuccess('Signed out safely');
  };

  const updateApiKey = (newKey) => {
    if (!user) return;
    const updated = { ...user, apiKey: newKey };
    setUser(updated);
    localStorage.setItem('indusmind_user', JSON.stringify(updated));
    showSuccess('API key regenerated successfully');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updateApiKey, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
