import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { CartProvider, useCart } from './contexts/CartContext';
import { BookingProvider } from './contexts/BookingContext';
import { OrderProvider } from './contexts/OrderContext';
import { LoginScreen } from './components/LoginScreen';
import { Navigation } from './components/Navigation';
import { HomeScreen } from './components/HomeScreen';
import { BookingFlow } from './components/BookingFlow';
import { ProductsScreen } from './components/ProductsScreen';
import { CartScreen } from './components/CartScreen';
import { ProfileScreen } from './components/ProfileScreen';
import './styles/globals.css';

type View = 'home' | 'booking' | 'products' | 'cart' | 'profile';

function AppContent() {
  const { user, loading } = useAuth();
  const { itemCount } = useCart();
  const [currentView, setCurrentView] = useState<View>('home');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Scroll to top whenever the view changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView]);

  const handleSignOut = async () => {
    setIsAuthenticated(false);
    setCurrentView('home');
  };

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    // Scroll to top after successful login
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-black/20 border-t-black rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[rgb(var(--color-text-secondary))]">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!user && !isAuthenticated) {
    return <LoginScreen onSuccess={handleLoginSuccess} />;
  }

  return (
    <>
      <Navigation currentView={currentView} onNavigate={setCurrentView} itemCount={itemCount} />
      
      {currentView === 'home' && <HomeScreen onNavigate={setCurrentView} />}
      {currentView === 'booking' && <BookingFlow onNavigate={setCurrentView} />}
      {currentView === 'products' && <ProductsScreen />}
      {currentView === 'cart' && <CartScreen />}
      {currentView === 'profile' && <ProfileScreen onSignOut={handleSignOut} />}
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BookingProvider>
        <OrderProvider>
          <CartProvider>
            <AppContent />
          </CartProvider>
        </OrderProvider>
      </BookingProvider>
    </AuthProvider>
  );
}