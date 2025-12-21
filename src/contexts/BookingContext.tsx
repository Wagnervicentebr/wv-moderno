import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Service, Professional } from '../data/mockData';

export interface Booking {
  id: string;
  service: Service;
  professional: Professional;
  date: Date;
  timeSlot: string;
  status: 'confirmed' | 'completed' | 'cancelled';
  createdAt: Date;
  totalPaid: number;
}

interface BookingContextType {
  bookings: Booking[];
  addBooking: (booking: Omit<Booking, 'id' | 'createdAt' | 'status'>) => void;
  cancelBooking: (id: string) => void;
  getUpcomingBookings: () => Booking[];
  getPastBookings: () => Booking[];
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [bookings, setBookings] = useState<Booking[]>([]);

  // Load bookings from localStorage on mount
  useEffect(() => {
    const savedBookings = localStorage.getItem('bookings');
    if (savedBookings) {
      try {
        const parsed = JSON.parse(savedBookings);
        // Convert date strings back to Date objects
        const bookingsWithDates = parsed.map((b: any) => ({
          ...b,
          date: new Date(b.date),
          createdAt: new Date(b.createdAt),
        }));
        setBookings(bookingsWithDates);
      } catch (error) {
        console.error('Error loading bookings:', error);
      }
    }
  }, []);

  // Save bookings to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('bookings', JSON.stringify(bookings));
  }, [bookings]);

  const addBooking = (bookingData: Omit<Booking, 'id' | 'createdAt' | 'status'>) => {
    const newBooking: Booking = {
      ...bookingData,
      id: 'booking-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9),
      createdAt: new Date(),
      status: 'confirmed',
    };
    setBookings((prev) => [...prev, newBooking]);
  };

  const cancelBooking = (id: string) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: 'cancelled' as const } : b))
    );
  };

  const getUpcomingBookings = () => {
    const now = new Date();
    return bookings
      .filter((b) => {
        const bookingDate = new Date(b.date);
        return bookingDate >= now && b.status === 'confirmed';
      })
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  };

  const getPastBookings = () => {
    const now = new Date();
    return bookings
      .filter((b) => {
        const bookingDate = new Date(b.date);
        return bookingDate < now || b.status !== 'confirmed';
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  };

  return (
    <BookingContext.Provider
      value={{ bookings, addBooking, cancelBooking, getUpcomingBookings, getPastBookings }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
}
