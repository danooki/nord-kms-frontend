import { createContext, useContext, useState, useEffect } from 'react';
import api from '../config/api.js';

const AuthContext = createContext();

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored token on mount
    const token = localStorage.getItem('token');
    if (token) {
      fetchUser();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUser = async () => {
    try {
      const response = await api.get('/api/auth/me');
      setUser(response.data.user);
    } catch (error) {
      localStorage.removeItem('token');
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await api.post('/api/auth/login', { email, password });
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      setUser(user);
      return { success: true };
    } catch (error) {
      // Handle connection errors
      if (error.code === 'ERR_NETWORK' || error.message?.includes('ERR_CONNECTION_REFUSED')) {
        return {
          success: false,
          error: 'Cannot connect to server. Please make sure the backend server is running on port 3000.'
        };
      }
      return {
        success: false,
        error: error.response?.data?.error || 'Login failed'
      };
    }
  };

  const register = async (email, password) => {
    try {
      const response = await api.post('/api/auth/register', { email, password });
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      setUser(user);
      return { success: true };
    } catch (error) {
      // Handle connection errors
      if (error.code === 'ERR_NETWORK' || error.message?.includes('ERR_CONNECTION_REFUSED')) {
        return {
          success: false,
          error: 'Cannot connect to server. Please make sure the backend server is running on port 3000.'
        };
      }
      return {
        success: false,
        error: error.response?.data?.error || 'Registration failed'
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  // Authentication check
  const isAuthenticated = !!user;

  // Role-based helper functions
  const isAdmin = user?.role === 'admin';
  const isEditor = user?.role === 'editor';
  const isRegistered = user?.role === 'registered';
  const isPublic = !user; // Public users are not authenticated

  // Permission checks
  const canManageUsers = isAdmin;
  const canEditWiki = isAdmin || isEditor;
  const canAnswerTickets = isAdmin || isEditor;
  const canViewPrivateWiki = isAuthenticated; // Any authenticated user can view private content
  const canOpenTickets = isAuthenticated; // Any authenticated user can open tickets

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated,
    // Role checks
    isAdmin,
    isEditor,
    isRegistered,
    isPublic,
    // Permission checks
    canManageUsers,
    canEditWiki,
    canAnswerTickets,
    canViewPrivateWiki,
    canOpenTickets
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
