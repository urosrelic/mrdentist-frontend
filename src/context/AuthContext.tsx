import axios from 'axios';
import React, { createContext, useMemo, useState } from 'react';
import UserModel from '../model/UserModel';

interface AuthContextProps {
  user: UserModel | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string;
  userRole: string | undefined;
  login: (username: string) => Promise<UserModel | null>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined
);

export const AuthProvider = ({ children }: React.PropsWithChildren) => {
  const [user, setUser] = useState<UserModel | null>(() => {
    const savedUser = sessionStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const login = async (username: string): Promise<UserModel | null> => {
    setLoading(true);
    try {
      const response = await axios.post('api/login', {
        username,
      });

      if (response.status === 200) {
        sessionStorage.setItem('user', JSON.stringify(response.data.user));
        setUser(response.data.user);
        return response.data.user;
      }

      setError('');
    } catch (error) {
      setError(error.response?.data);
    } finally {
      setLoading(false);
    }
    return null;
  };

  const logout = async () => {
    setLoading(true);
    try {
      const response = await axios.post('/api/logout');
      console.log(response);
      sessionStorage.clear();
      setUser(null);
    } catch (error) {
      console.error('Logout failed:', error);
      setError(error.response?.data);
    } finally {
      setLoading(false);
    }
  };

  const userRole = useMemo(() => user?.role, [user]);

  const isAuthenticated = useMemo(() => user !== null, [user]);

  return (
    <AuthContext.Provider
      value={{ login, logout, isAuthenticated, user, error, loading, userRole }}
    >
      {children}
    </AuthContext.Provider>
  );
};
