import React from 'react';
import { Calendar, ShoppingBag, User, Home, ShoppingCart, TrendingUp } from 'lucide-react';
import { useAdmin } from '../contexts/AdminContext';

interface NavigationProps {
  currentView: string;
  onNavigate: (view: 'home' | 'booking' | 'products' | 'cart' | 'profile' | 'admin') => void;
  itemCount: number;
}

export function Navigation({ currentView, onNavigate, itemCount }: NavigationProps) {
  const { isAdminMode } = useAdmin();

  return (
    <>
      {/* Mobile Top Bar */}
      <nav className="md:hidden fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md border-b border-black/5 z-50 safe-area-top">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <button
              onClick={() => onNavigate('home')}
              className="flex flex-col leading-none"
            >
              <span className="text-lg font-black tracking-tight">WV</span>
              <span className="text-[10px] font-serif italic text-[rgb(var(--color-text-secondary))]">Walter Leal</span>
            </button>
            
            <button
              onClick={() => onNavigate('cart')}
              className="relative p-2"
            >
              <ShoppingCart className="w-6 h-6" />
              {itemCount > 0 && (
                <span className="absolute top-0 right-0 bg-[rgb(var(--color-accent))] text-black text-xs w-5 h-5 rounded-full flex items-center justify-center font-semibold">
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-black/5 z-50 safe-area-bottom">
        <div className="grid grid-cols-4 h-16">
          <button
            onClick={() => onNavigate('home')}
            className={`flex flex-col items-center justify-center gap-1 transition-colors ${
              currentView === 'home' ? 'text-black' : 'text-[rgb(var(--color-text-secondary))]'
            }`}
          >
            <Home className={`w-6 h-6 ${currentView === 'home' ? 'fill-current' : ''}`} />
            <span className="text-xs font-medium">Início</span>
          </button>

          <button
            onClick={() => onNavigate('booking')}
            className={`flex flex-col items-center justify-center gap-1 transition-colors ${
              currentView === 'booking' ? 'text-black' : 'text-[rgb(var(--color-text-secondary))]'
            }`}
          >
            <Calendar className={`w-6 h-6 ${currentView === 'booking' ? 'fill-current' : ''}`} />
            <span className="text-xs font-medium">Agendar</span>
          </button>

          <button
            onClick={() => onNavigate('products')}
            className={`flex flex-col items-center justify-center gap-1 transition-colors ${
              currentView === 'products' ? 'text-black' : 'text-[rgb(var(--color-text-secondary))]'
            }`}
          >
            <ShoppingBag className={`w-6 h-6 ${currentView === 'products' ? 'fill-current' : ''}`} />
            <span className="text-xs font-medium">Produtos</span>
          </button>

          <button
            onClick={() => onNavigate('profile')}
            className={`flex flex-col items-center justify-center gap-1 transition-colors ${
              currentView === 'profile' ? 'text-black' : 'text-[rgb(var(--color-text-secondary))]'
            }`}
          >
            <User className={`w-6 h-6 ${currentView === 'profile' ? 'fill-current' : ''}`} />
            <span className="text-xs font-medium">Perfil</span>
          </button>

          {isAdminMode && (
            <button
              onClick={() => onNavigate('admin')}
              className={`flex flex-col items-center justify-center gap-1 transition-colors ${
                currentView === 'admin' ? 'text-black' : 'text-[rgb(var(--color-text-secondary))]'
              }`}
            >
              <TrendingUp className={`w-6 h-6 ${currentView === 'admin' ? 'fill-current' : ''}`} />
              <span className="text-xs font-medium">Admin</span>
            </button>
          )}
        </div>
      </nav>

      {/* Desktop Navigation */}
      <nav className="hidden md:block fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md border-b border-black/5 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={() => onNavigate('home')}
              className="hover:opacity-80 transition-opacity flex flex-col leading-none"
            >
              <span className="text-2xl font-black tracking-tight">WV</span>
              <span className="text-sm font-serif italic text-[rgb(var(--color-text-secondary))]">Walter Leal</span>
            </button>

            <div className="flex items-center gap-1">
              <button
                onClick={() => onNavigate('home')}
                className={`px-4 py-2 rounded-xl transition-all ${
                  currentView === 'home' 
                    ? 'bg-black text-white' 
                    : 'text-[rgb(var(--color-text-secondary))] hover:bg-gray-100'
                }`}
              >
                Início
              </button>

              <button
                onClick={() => onNavigate('booking')}
                className={`px-4 py-2 rounded-xl transition-all ${
                  currentView === 'booking' 
                    ? 'bg-black text-white' 
                    : 'text-[rgb(var(--color-text-secondary))] hover:bg-gray-100'
                }`}
              >
                Agendar
              </button>

              <button
                onClick={() => onNavigate('products')}
                className={`px-4 py-2 rounded-xl transition-all ${
                  currentView === 'products' 
                    ? 'bg-black text-white' 
                    : 'text-[rgb(var(--color-text-secondary))] hover:bg-gray-100'
                }`}
              >
                Produtos
              </button>

              <button
                onClick={() => onNavigate('cart')}
                className={`px-4 py-2 rounded-xl transition-all relative ${
                  currentView === 'cart' 
                    ? 'bg-black text-white' 
                    : 'text-[rgb(var(--color-text-secondary))] hover:bg-gray-100'
                }`}
              >
                Carrinho
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[rgb(var(--color-accent))] text-black text-xs w-5 h-5 rounded-full flex items-center justify-center font-semibold">
                    {itemCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => onNavigate('profile')}
                className={`px-4 py-2 rounded-xl transition-all ${
                  currentView === 'profile' 
                    ? 'bg-black text-white' 
                    : 'text-[rgb(var(--color-text-secondary))] hover:bg-gray-100'
                }`}
              >
                Perfil
              </button>

              {isAdminMode && (
                <button
                  onClick={() => onNavigate('admin')}
                  className={`px-4 py-2 rounded-xl transition-all ${
                    currentView === 'admin' 
                      ? 'bg-black text-white' 
                      : 'text-[rgb(var(--color-text-secondary))] hover:bg-gray-100'
                  }`}
                >
                  Admin
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}