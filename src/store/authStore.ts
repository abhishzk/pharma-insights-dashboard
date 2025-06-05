import { create } from 'zustand';
import { AuthState, User } from '../types';

// Mock users for demonstration
const mockUsers = [
  {
    id: '1',
    name: 'Dr. Jane Smith',
    email: 'jane.smith@research.pfizer.com',
    role: 'admin',
    avatar: 'https://i.pravatar.cc/150?img=1',
  },
  {
    id: '2',
    name: 'Dr. John Davis',
    email: 'john.davis@research.pfizer.com',
    role: 'researcher',
    avatar: 'https://i.pravatar.cc/150?img=2',
  },
] as User[];

interface AuthStore extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  login: async (email: string, password: string) => {
    set({ isLoading: true, error: null });
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Simulate authentication with mock data
      const user = mockUsers.find(user => user.email === email);
      
      if (user && password === 'password') {
        set({ user, isAuthenticated: true, isLoading: false });
        localStorage.setItem('auth_token', 'mock_jwt_token');
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        set({ 
          isLoading: false, 
          error: 'Invalid email or password. Try jane.smith@research.pfizer.com with password "password"'
        });
      }
    } catch (error) {
      set({ 
        isLoading: false, 
        error: 'Authentication failed. Please try again.' 
      });
    }
  },

  logout: () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
    set({ user: null, isAuthenticated: false });
  },

  checkAuth: async () => {
    set({ isLoading: true });
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const token = localStorage.getItem('auth_token');
      const storedUser = localStorage.getItem('user');
      
      if (token && storedUser) {
        const user = JSON.parse(storedUser) as User;
        set({ user, isAuthenticated: true, isLoading: false });
      } else {
        set({ isLoading: false });
      }
    } catch (error) {
      set({ isLoading: false });
    }
  },
}));