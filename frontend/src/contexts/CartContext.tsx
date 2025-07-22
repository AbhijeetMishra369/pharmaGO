import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CartItem, Medicine } from '../types';

interface CartContextType {
  items: CartItem[];
  totalItems: number;
  totalAmount: number;
  addToCart: (medicine: Medicine, quantity?: number) => void;
  removeFromCart: (medicineId: number) => void;
  updateQuantity: (medicineId: number, quantity: number) => void;
  clearCart: () => void;
  isInCart: (medicineId: number) => boolean;
  getItemQuantity: (medicineId: number) => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const totalItems = items.reduce((total, item) => total + item.quantity, 0);
  const totalAmount = items.reduce((total, item) => total + (item.medicine.price * item.quantity), 0);

  const addToCart = (medicine: Medicine, quantity: number = 1) => {
    setItems(prevItems => {
      const existingItem = prevItems.find(item => item.medicine.id === medicine.id);
      
      if (existingItem) {
        // Update quantity if item already exists
        return prevItems.map(item =>
          item.medicine.id === medicine.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // Add new item
        return [...prevItems, { medicine, quantity }];
      }
    });
  };

  const removeFromCart = (medicineId: number) => {
    setItems(prevItems => prevItems.filter(item => item.medicine.id !== medicineId));
  };

  const updateQuantity = (medicineId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(medicineId);
      return;
    }

    setItems(prevItems =>
      prevItems.map(item =>
        item.medicine.id === medicineId
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const isInCart = (medicineId: number): boolean => {
    return items.some(item => item.medicine.id === medicineId);
  };

  const getItemQuantity = (medicineId: number): number => {
    const item = items.find(item => item.medicine.id === medicineId);
    return item ? item.quantity : 0;
  };

  const value: CartContextType = {
    items,
    totalItems,
    totalAmount,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    isInCart,
    getItemQuantity,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};