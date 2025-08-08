import { useState, useEffect, createContext, useContext } from 'react';
import { User, LoginRequest, LoginResponse } from '../types/auth';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (credentials: LoginRequest) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

// Mock authentication hook - replace with actual API calls
export const useAuth = (): AuthContextType => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('pharmago_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('pharmago_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (credentials: LoginRequest): Promise<void> => {
    setIsLoading(true);
    try {
      // Mock API call - replace with actual authentication
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay

      // Mock user data based on credentials
      let mockUser: User;
      
      if (credentials.email === 'admin@pharmago.com') {
        mockUser = {
          id: 1,
          firstName: 'Admin',
          lastName: 'User',
          email: 'admin@pharmago.com',
          phoneNumber: '+1234567890',
          role: 'ADMIN' as any,
          enabled: true,
          emailVerified: true,
          createdAt: '2024-01-01T00:00:00Z',
          updatedAt: '2024-01-01T00:00:00Z',
          country: 'USA',
        };
      } else {
        mockUser = {
          id: 2,
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@example.com',
          phoneNumber: '+1987654321',
          role: 'CUSTOMER' as any,
          enabled: true,
          emailVerified: true,
          createdAt: '2024-01-15T00:00:00Z',
          updatedAt: '2024-01-20T00:00:00Z',
          streetAddress: '123 Main St',
          city: 'New York',
          state: 'NY',
          postalCode: '10001',
          country: 'USA',
        };
      }

      // Store user data
      localStorage.setItem('pharmago_user', JSON.stringify(mockUser));
      localStorage.setItem('pharmago_token', 'mock-jwt-token');
      setUser(mockUser);
    } catch (error) {
      throw new Error('Invalid credentials');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('pharmago_user');
    localStorage.removeItem('pharmago_token');
    setUser(null);
  };

  return {
    user,
    isLoading,
    login,
    logout,
    isAuthenticated: !!user,
  };
};