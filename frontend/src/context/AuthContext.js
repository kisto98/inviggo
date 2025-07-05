import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, register, logout as apiLogout } from '../services/auth';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const loginUser = async (username, password) => {
    try {
      const response = await login(username, password);
      localStorage.setItem('user', JSON.stringify(response.data));
      setUser(response.data);
      navigate('/');
    } catch (error) {
      throw error;
    }
  };

  const registerUser = async (username, password, phone) => {
    try {
      await register(username, password, phone);
      navigate('/login');
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    apiLogout();
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, loginUser, registerUser, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}