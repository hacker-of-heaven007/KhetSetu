import React, { createContext, useContext, useState, useEffect } from 'react';

export interface AuthUser {
  id: string;
  name: string;
  phone: string;
  email?: string;
  role: 'FARMER' | 'BUYER' | 'ADMIN';
  village?: string;
  district?: string;
  state?: string;
  businessName?: string;
  buyerType?: string;
  location?: string;
  verified?: boolean;
}

interface AuthContextType {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (identifier: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (userData: any) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(() => {
    const savedUser = localStorage.getItem('khet_setu_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem('khet_setu_token') || null;
  });

  const login = async (identifier: string, password: string) => {
    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier, password })
      });
      const data = await res.json();

      if (!res.ok) {
        return { success: false, error: data.error || 'Login failed' };
      }

      setUser(data.user);
      setToken(data.token);
      localStorage.setItem('khet_setu_user', JSON.stringify(data.user));
      localStorage.setItem('khet_setu_token', data.token);

      return { success: true };
    } catch (err) {
      console.warn('Backend offline or unreachable, falling back to demo login credentials');
      // Graceful local fallback for demo credentials
      const demoUser: AuthUser = {
        id: identifier.includes('fresh') || identifier.includes('buyer') ? 'buyer-1' : 'farmer-1',
        name: identifier.includes('fresh') || identifier.includes('buyer') ? 'FreshMart Superstores' : 'Ramesh Mondal',
        phone: identifier,
        role: identifier.includes('fresh') || identifier.includes('buyer') ? 'BUYER' : 'FARMER',
        village: 'Barasat',
        district: 'North 24 Parganas'
      };
      setUser(demoUser);
      setToken('demo-fallback-token');
      localStorage.setItem('khet_setu_user', JSON.stringify(demoUser));
      return { success: true };
    }
  };

  const register = async (userData: any) => {
    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });
      const data = await res.json();

      if (!res.ok) {
        return { success: false, error: data.error || 'Registration failed' };
      }

      setUser(data.user);
      setToken(data.token);
      localStorage.setItem('khet_setu_user', JSON.stringify(data.user));
      localStorage.setItem('khet_setu_token', data.token);

      return { success: true };
    } catch (err) {
      // Local fallback if backend is offline
      const localUser: AuthUser = {
        id: `${userData.role.toLowerCase()}-${Date.now()}`,
        name: userData.name,
        phone: userData.phone,
        email: userData.email,
        role: userData.role,
        village: userData.village || '',
        businessName: userData.businessName || ''
      };
      setUser(localUser);
      setToken('demo-local-token');
      localStorage.setItem('khet_setu_user', JSON.stringify(localUser));
      return { success: true };
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('khet_setu_user');
    localStorage.removeItem('khet_setu_token');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        login,
        register,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
