export interface User {
  id: number;
  name: string;
  email: string;
  contactNumber: string;
  role: 'CUSTOMER' | 'ADMIN';
  isActive: boolean;
  isEmailVerified: boolean;
  createdAt: string;
  address?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  dateOfBirth?: string;
}

export interface AuthResponse {
  token: string;
  type: string;
  id: number;
  name: string;
  email: string;
  role: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  contactNumber: string;
  password: string;
  confirmPassword: string;
  address?: string;
  city?: string;
  state?: string;
  postalCode?: string;
}

export interface Medicine {
  id: number;
  name: string;
  description?: string;
  category: string;
  manufacturer: string;
  price: number;
  stockQuantity: number;
  expiryDate?: string;
  requiresPrescription: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  imageUrl?: string;
  dosage?: string;
  sideEffects?: string;
  usageInstructions?: string;
}

export interface CartItem {
  medicine: Medicine;
  quantity: number;
}

export interface Order {
  id: number;
  userId: number;
  orderItems: OrderItem[];
  totalAmount: number;
  status: OrderStatus;
  shippingAddress: Address;
  prescriptionUrl?: string;
  orderDate: string;
  deliveryDate?: string;
  paymentMethod: string;
  paymentStatus: string;
}

export interface OrderItem {
  id: number;
  medicine: Medicine;
  quantity: number;
  price: number;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export type OrderStatus = 
  | 'PENDING'
  | 'CONFIRMED'
  | 'PROCESSING'
  | 'SHIPPED'
  | 'DELIVERED'
  | 'CANCELLED';

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
}

export interface ErrorResponse {
  status: number;
  message: string;
  timestamp: string;
  errors?: Record<string, string>;
}

export interface Reminder {
  id: number;
  medicineId: number;
  medicineName: string;
  dosage: string;
  frequency: string;
  startDate: string;
  endDate?: string;
  reminderTimes: string[];
  isActive: boolean;
}

export interface Statistics {
  totalUsers: number;
  activeUsers: number;
  verifiedUsers: number;
  customers: number;
  admins: number;
  totalMedicines?: number;
  totalOrders?: number;
  pendingOrders?: number;
  completedOrders?: number;
}

export interface SearchFilters {
  name?: string;
  category?: string;
  manufacturer?: string;
  minPrice?: number;
  maxPrice?: number;
  requiresPrescription?: boolean;
  inStock?: boolean;
}