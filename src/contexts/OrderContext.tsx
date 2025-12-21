import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { CartItem } from './CartContext';

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  shippingCost: number;
  status: 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: Date;
  estimatedDelivery: Date;
  shippingAddress: {
    name: string;
    cpf: string;
    email: string;
    cep: string;
    address: string;
    number: string;
    complement?: string;
    city: string;
    state: string;
  };
  trackingCode?: string;
}

interface OrderContextType {
  orders: Order[];
  addOrder: (order: Omit<Order, 'id' | 'createdAt' | 'trackingCode' | 'estimatedDelivery'>) => string;
  getOrder: (id: string) => Order | undefined;
  cancelOrder: (id: string) => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export function OrderProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([]);

  // Load orders from localStorage on mount
  useEffect(() => {
    const savedOrders = localStorage.getItem('orders');
    if (savedOrders) {
      try {
        const parsed = JSON.parse(savedOrders);
        // Convert date strings back to Date objects
        const ordersWithDates = parsed.map((o: any) => ({
          ...o,
          createdAt: new Date(o.createdAt),
          estimatedDelivery: new Date(o.estimatedDelivery),
        }));
        setOrders(ordersWithDates);
      } catch (error) {
        console.error('Error loading orders:', error);
      }
    }
  }, []);

  // Save orders to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

  const addOrder = (orderData: Omit<Order, 'id' | 'createdAt' | 'trackingCode' | 'estimatedDelivery'>) => {
    const createdAt = new Date();
    const estimatedDelivery = new Date();
    estimatedDelivery.setDate(estimatedDelivery.getDate() + 7); // 7 days from now

    const orderId = 'ORD-' + Date.now().toString(36).toUpperCase();
    const trackingCode = 'BR' + Math.random().toString(36).substr(2, 9).toUpperCase();

    const newOrder: Order = {
      ...orderData,
      id: orderId,
      createdAt,
      estimatedDelivery,
      trackingCode,
    };

    setOrders((prev) => [...prev, newOrder]);
    return orderId;
  };

  const getOrder = (id: string) => {
    return orders.find((o) => o.id === id);
  };

  const cancelOrder = (id: string) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status: 'cancelled' as const } : o))
    );
  };

  return (
    <OrderContext.Provider value={{ orders, addOrder, getOrder, cancelOrder }}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrder() {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrder must be used within an OrderProvider');
  }
  return context;
}
