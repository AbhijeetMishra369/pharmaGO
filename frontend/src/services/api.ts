import axios, { AxiosInstance, AxiosResponse } from 'axios';
import {
  User,
  AuthResponse,
  LoginRequest,
  RegisterRequest,
  Medicine,
  Order,
  PaginatedResponse,
  Statistics,
  SearchFilters,
} from '../types';

// Create axios instance
const api: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle common errors
api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: async (data: LoginRequest): Promise<AuthResponse> => {
    const response = await api.post('/api/auth/signin', data);
    return response.data;
  },

  register: async (data: RegisterRequest): Promise<{ message: string; user: User }> => {
    const response = await api.post('/api/auth/signup', data);
    return response.data;
  },

  // NOTE: Not in API_DOCUMENTATION.md
  logout: async (): Promise<{ message: string }> => {
    const response = await api.post('/api/auth/signout');
    return response.data;
  },

  // NOTE: Not in API_DOCUMENTATION.md
  refreshToken: async (): Promise<{ token: string; type: string }> => {
    const response = await api.post('/api/auth/refresh');
    return response.data;
  },
};

// User API
export const userAPI = {
  getProfile: async (): Promise<User> => {
    const response = await api.get('/api/users/profile');
    return response.data;
  },

  // NOTE: Not in API_DOCUMENTATION.md
  updateProfile: async (data: Partial<RegisterRequest>): Promise<User> => {
    const response = await api.put('/api/users/profile', data);
    return response.data;
  },

  getAllUsers: async (params: {
    page?: number;
    size?: number;
    sortBy?: string;
    sortDir?: string;
    name?: string;
    email?: string;
    role?: string;
    isActive?: boolean;
  }): Promise<PaginatedResponse<User>> => {
    const response = await api.get('/api/users', { params });
    return response.data;
  },

  getUserById: async (id: number): Promise<User> => {
    const response = await api.get(`/api/users/${id}`);
    return response.data;
  },

  updateUser: async (id: number, data: Partial<RegisterRequest>): Promise<User> => {
    const response = await api.put(`/api/users/${id}`, data);
    return response.data;
  },

  deleteUser: async (id: number): Promise<{ message: string }> => {
    const response = await api.delete(`/api/users/${id}`);
    return response.data;
  },

  // NOTE: Not in API_DOCUMENTATION.md
  activateUser: async (id: number): Promise<{ message: string }> => {
    const response = await api.put(`/api/users/${id}/activate`);
    return response.data;
  },

  // NOTE: Not in API_DOCUMENTATION.md
  deactivateUser: async (id: number): Promise<{ message: string }> => {
    const response = await api.put(`/api/users/${id}/deactivate`);
    return response.data;
  },

  // NOTE: Not in API_DOCUMENTATION.md
  verifyEmail: async (token: string): Promise<{ message: string; success: boolean }> => {
    const response = await api.get(`/api/users/verify-email?token=${token}`);
    return response.data;
  },

  // NOTE: Not in API_DOCUMENTATION.md
  forgotPassword: async (email: string): Promise<{ message: string }> => {
    const response = await api.post(`/api/users/forgot-password?email=${email}`);
    return response.data;
  },

  // NOTE: Not in API_DOCUMENTATION.md
  resetPassword: async (token: string, newPassword: string): Promise<{ message: string; success: boolean }> => {
    const response = await api.post(`/api/users/reset-password?token=${token}&newPassword=${newPassword}`);
    return response.data;
  },

  // NOTE: Not in API_DOCUMENTATION.md
  resendVerification: async (email: string): Promise<{ message: string }> => {
    const response = await api.post(`/api/users/resend-verification?email=${email}`);
    return response.data;
  },

  // NOTE: Not in API_DOCUMENTATION.md
  checkEmail: async (email: string): Promise<{ exists: boolean }> => {
    const response = await api.get(`/api/users/check-email?email=${email}`);
    return response.data;
  },

  // NOTE: Not in API_DOCUMENTATION.md
  checkContact: async (contactNumber: string): Promise<{ exists: boolean }> => {
    const response = await api.get(`/api/users/check-contact?contactNumber=${contactNumber}`);
    return response.data;
  },

  getStatistics: async (): Promise<Statistics> => {
    const response = await api.get('/api/users/statistics');
    return response.data;
  },
};

// Medicine API
export const medicineAPI = {
  getAllMedicines: async (params: {
    page?: number;
    size?: number;
    sortBy?: string;
    sortDir?: string;
    filters?: SearchFilters;
  }): Promise<PaginatedResponse<Medicine>> => {
    const response = await api.get('/api/medicines', { params: { ...params, ...params.filters } });
    return response.data;
  },

  getMedicineById: async (id: number): Promise<Medicine> => {
    const response = await api.get(`/api/medicines/${id}`);
    return response.data;
  },

  createMedicine: async (data: Partial<Medicine>): Promise<Medicine> => {
    const response = await api.post('/api/medicines', data);
    return response.data;
  },

  updateMedicine: async (id: number, data: Partial<Medicine>): Promise<Medicine> => {
    const response = await api.put(`/api/medicines/${id}`, data);
    return response.data;
  },

  deleteMedicine: async (id: number): Promise<{ message: string }> => {
    const response = await api.delete(`/api/medicines/${id}`);
    return response.data;
  },

  searchMedicines: async (query: string): Promise<Medicine[]> => {
    const response = await api.get(`/api/medicines/search?query=${query}`);
    return response.data;
  },

  getCategories: async (): Promise<string[]> => {
    const response = await api.get('/api/medicines/categories');
    return response.data;
  },

  getManufacturers: async (): Promise<string[]> => {
    const response = await api.get('/api/medicines/manufacturers');
    return response.data;
  },

  getExpiredMedicines: async (): Promise<Medicine[]> => {
    const response = await api.get('/api/medicines/expired');
    return response.data;
  },
};

// Order API
export const orderAPI = {
  getAllOrders: async (params: {
    page?: number;
    size?: number;
    sortBy?: string;
    sortDir?: string;
    status?: string;
    userId?: number;
  }): Promise<PaginatedResponse<Order>> => {
    const response = await api.get('/api/orders', { params });
    return response.data;
  },

  getOrderById: async (id: number): Promise<Order> => {
    const response = await api.get(`/api/orders/${id}`);
    return response.data;
  },

  createOrder: async (data: {
    orderItems: { medicineId: number; quantity: number }[];
    shippingAddress: any;
    paymentMethod: string;
    prescriptionUrl?: string;
  }): Promise<Order> => {
    const response = await api.post('/api/orders', data);
    return response.data;
  },

  updateOrderStatus: async (id: number, status: string): Promise<Order> => {
    const response = await api.put(`/api/orders/${id}/status?status=${status}`);
    return response.data;
  },

  cancelOrder: async (id: number): Promise<{ message: string }> => {
    const response = await api.delete(`/api/orders/${id}`);
    return response.data;
  },

  getMyOrders: async (params: {
    page?: number;
    size?: number;
    sortBy?: string;
    sortDir?: string;
  }): Promise<PaginatedResponse<Order>> => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const response = await api.get(`/api/orders/user/${user.id}`, { params });
    return response.data;
  },
};

export default api;