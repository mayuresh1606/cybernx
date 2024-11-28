'use client'
import React, { createContext, useState, useEffect, useContext } from 'react';
import { useRouter, usePathname } from 'next/navigation';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (user: { email: string }) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  const pathName = usePathname();

  useEffect(() => {
    let user;
    if (typeof window !== undefined){
      user = localStorage.getItem('user');
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    }
  }, []);

  const login = (user: { email: string }) => {
    setIsAuthenticated(true);
    localStorage.setItem('user', JSON.stringify(user));
    router.push('/');
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('user');
    router.push('/login');
  };

  useEffect(() => {
    if (isAuthenticated && pathName === "/login"){
      router.push("/")
    }
  }, [isAuthenticated, pathName, router])

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
