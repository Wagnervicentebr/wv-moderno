import React, { useState } from 'react';
import { User, ShoppingCart, ShoppingBag, Calendar, ArrowRight, Trash2, CreditCard, MapPin, Package, ArrowLeft, Minus, Plus, Settings } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { useBooking } from '../contexts/BookingContext';
import { useOrder } from '../contexts/OrderContext';
import { useAdmin } from '../contexts/AdminContext';
import { Switch } from './ui/switch';

type ProfileView = 'main' | 'cart' | 'checkout' | 'bookings' | 'orders';

interface ProfileScreenProps {
  onSignOut?: () => Promise<void>;
}

export function ProfileScreen({ onSignOut }: ProfileScreenProps) {
  const { user, signOut } = useAuth();
  const { items, removeItem, updateQuantity, clearCart, total } = useCart();
  const { bookings } = useBooking();
  const { orders } = useOrder();
  const { isAdminMode, toggleAdminMode } = useAdmin();
  const [view, setView] = useState<ProfileView>('main');

  const handleSignOut = async () => {
    await signOut();
    if (onSignOut) {
      await onSignOut();
    }
  };
  const [checkoutStep, setCheckoutStep] = useState<'address' | 'payment' | 'confirmation'>('address');
  const [formData, setFormData] = useState({
    name: '',
    cpf: '',
    email: '',
    cep: '',
    address: '',
    number: '',
    complement: '',
    city: '',
    state: '',
  });

  const formatPrice = (price: number) => {
    if (price === undefined || price === null || isNaN(price)) {
      return 'R$ 0,00';
    }
    return 'R$ ' + price.toFixed(2).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  const formatDate = (date: Date | string | undefined) => {
    if (!date) {
      return 'Data não disponível';
    }
    
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    
    if (isNaN(dateObj.getTime())) {
      return 'Data inválida';
    }
    
    const day = String(dateObj.getDate()).padStart(2, '0');
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const year = dateObj.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleCheckout = () => {
    if (items.length === 0) return;
    setView('checkout');
    setCheckoutStep('address');
  };

  const handleConfirmOrder = () => {
    setCheckoutStep('confirmation');
    clearCart();
  };

  // Main Profile View
  if (view === 'main') {
    return (
      <div className="min-h-screen pt-14 pb-20 md:pt-20 md:pb-8 bg-[#F5F5F5]">
        <div className="max-w-4xl mx-auto px-4 py-4 md:px-6 md:py-8">
          <h1 className="text-2xl md:text-4xl mb-6 md:mb-8">Meu Perfil</h1>

          {/* User Info */}
          <div className="card p-5 md:p-8 mb-4 md:mb-6">
            <div className="flex items-start gap-3 md:gap-4">
              <div className="w-14 h-14 md:w-20 md:h-20 bg-[rgb(var(--color-tertiary-dark))] rounded-full flex items-center justify-center flex-shrink-0">
                <User className="w-7 h-7 md:w-10 md:h-10" />
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-lg md:text-2xl mb-1 md:mb-2 truncate">{user?.name || 'Usuário'}</h2>
                <div className="text-sm md:text-base text-[rgb(var(--color-text-secondary))] truncate">{user?.phone}</div>
                {user?.email && (
                  <div className="text-sm md:text-base text-[rgb(var(--color-text-secondary))] truncate">{user.email}</div>
                )}
              </div>
            </div>
          </div>

          {/* Cart Summary */}
          <button
            onClick={() => setView('cart')}
            className="card-hover p-4 md:p-6 w-full text-left mb-3 md:mb-6 touch-manipulation"
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 md:gap-4 flex-1 min-w-0">
                <div className="relative flex-shrink-0">
                  <ShoppingCart className="w-6 h-6 md:w-8 md:h-8" />
                  {items.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-black text-white text-[10px] md:text-xs w-4 h-4 md:w-5 md:h-5 rounded-full flex items-center justify-center font-semibold">
                      {items.length}
                    </span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base md:text-xl mb-0.5 md:mb-1 font-medium">Carrinho de Compras</h3>
                  <p className="text-xs md:text-sm text-[rgb(var(--color-text-secondary))] truncate">
                    {items.length > 0 
                      ? `${items.length} ${items.length === 1 ? 'item' : 'itens'} • ${formatPrice(total)}`
                      : 'Nenhum item no carrinho'}
                  </p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 md:w-6 md:h-6 flex-shrink-0" />
            </div>
          </button>

          {/* Admin Mode Toggle */}
          <div className="card p-4 md:p-6 mb-6 md:mb-8">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 md:gap-4 flex-1 min-w-0">
                <Settings className="w-6 h-6 md:w-8 md:h-8 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <h3 className="text-base md:text-xl mb-0.5 md:mb-1 font-medium">Modo Admin</h3>
                  <p className="text-xs md:text-sm text-[rgb(var(--color-text-secondary))]">
                    Acesso ao painel de gestão
                  </p>
                </div>
              </div>
              <Switch
                checked={isAdminMode}
                onCheckedChange={toggleAdminMode}
                aria-label="Ativar modo admin"
              />
            </div>
          </div>

          {/* Menu Options */}
          <div className="space-y-3 md:space-y-4 mb-6 md:mb-8">
            <button 
              onClick={() => setView('bookings')}
              className="card-hover p-4 md:p-6 w-full text-left touch-manipulation"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 md:gap-4 flex-1 min-w-0">
                  <Calendar className="w-6 h-6 md:w-8 md:h-8 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base md:text-xl mb-0.5 md:mb-1 font-medium">Meus Agendamentos</h3>
                    <p className="text-xs md:text-sm text-[rgb(var(--color-text-secondary))] truncate">
                      Ver histórico e próximos agendamentos
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 md:w-6 md:h-6 flex-shrink-0" />
              </div>
            </button>

            <button 
              onClick={() => setView('orders')}
              className="card-hover p-4 md:p-6 w-full text-left touch-manipulation"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 md:gap-4 flex-1 min-w-0">
                  <Package className="w-6 h-6 md:w-8 md:h-8 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base md:text-xl mb-0.5 md:mb-1 font-medium">Meus Pedidos</h3>
                    <p className="text-xs md:text-sm text-[rgb(var(--color-text-secondary))] truncate">
                      Acompanhar pedidos de produtos
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 md:w-6 md:h-6 flex-shrink-0" />
              </div>
            </button>
          </div>

          {/* Sign Out */}
          <button
            onClick={handleSignOut}
            className="btn-secondary w-full text-sm md:text-base py-3 md:py-4"
          >
            Sair da conta
          </button>
        </div>
      </div>
    );
  }

  // Cart View
  if (view === 'cart') {
    return (
      <div className="min-h-screen pt-20 pb-20 md:pt-24 md:pb-8 bg-[#F5F5F5]">
        <div className="max-w-4xl mx-auto px-4 py-6 md:px-6 md:py-8">
          {/* Header com botão voltar */}
          <div className="flex items-center gap-2 md:gap-4 mb-6 md:mb-8">
            <button
              onClick={() => setView('main')}
              className="text-[rgb(var(--color-text-secondary))] hover:text-black transition-colors touch-manipulation flex-shrink-0 -mt-1"
            >
              <ArrowLeft className="w-6 h-6 md:w-5 md:h-5" />
            </button>
            <h1 className="text-2xl md:text-4xl">Carrinho</h1>
          </div>

          {items.length === 0 ? (
            <div className="card p-8 md:p-12 text-center">
              <ShoppingBag className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-3 md:mb-4 text-[rgb(var(--color-text-secondary))]" />
              <h2 className="text-lg md:text-2xl mb-2">Carrinho vazio</h2>
              <p className="text-sm md:text-base text-[rgb(var(--color-text-secondary))]">
                Adicione produtos para continuar
              </p>
            </div>
          ) : (
            <>
              {/* Cart Items */}
              <div className="space-y-3 md:space-y-4 mb-6 md:mb-8">
                {items.map((item) => (
                  <div key={item.id} className="card p-4 md:p-6">
                    <div className="flex gap-3 md:gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 md:w-24 md:h-24 object-cover rounded-lg bg-[rgb(var(--color-tertiary-dark))] flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between gap-2 mb-2 md:mb-3">
                          <h3 className="text-base md:text-xl line-clamp-2 flex-1">{item.name}</h3>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-[rgb(var(--color-text-secondary))] hover:text-red-600 transition-colors flex-shrink-0 p-1 touch-manipulation"
                          >
                            <Trash2 className="w-4 h-4 md:w-5 md:h-5" />
                          </button>
                        </div>
                        <div className="text-sm md:text-lg font-semibold mb-2 md:mb-3">{formatPrice(item.price)}</div>
                        
                        <div className="flex items-center gap-2 md:gap-3">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 md:w-9 md:h-9 rounded-lg border border-black/20 hover:bg-black hover:text-white transition-colors flex items-center justify-center touch-manipulation"
                          >
                            <Minus className="w-3 h-3 md:w-4 md:h-4" />
                          </button>
                          <span className="w-8 text-center text-sm md:text-base font-medium">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 md:w-9 md:h-9 rounded-lg border border-black/20 hover:bg-black hover:text-white transition-colors flex items-center justify-center touch-manipulation"
                          >
                            <Plus className="w-3 h-3 md:w-4 md:h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Cart Summary - Sticky on mobile */}
              <div className="sticky bottom-20 md:static">
                <div className="card p-5 md:p-8 mb-4 md:mb-6 shadow-xl md:shadow-none">
                  <div className="space-y-2 md:space-y-3 mb-4 md:mb-6">
                    <div className="flex items-center justify-between text-sm md:text-base text-[rgb(var(--color-text-secondary))]">
                      <span>Subtotal</span>
                      <span>{formatPrice(total)}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm md:text-base text-[rgb(var(--color-text-secondary))]">
                      <span>Frete</span>
                      <span>Calcular no checkout</span>
                    </div>
                    <div className="border-t border-black/10 pt-2 md:pt-3">
                      <div className="flex items-center justify-between text-lg md:text-2xl font-semibold">
                        <span>Total</span>
                        <span>{formatPrice(total)}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleCheckout}
                    className="btn-primary w-full flex items-center justify-center gap-2 text-sm md:text-base py-3 md:py-4"
                  >
                    Finalizar compra
                    <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }

  // Checkout View
  if (view === 'checkout') {
    if (checkoutStep === 'confirmation') {
      return (
        <div className="min-h-screen pt-14 pb-20 md:pt-20 md:pb-8 bg-[#F5F5F5]">
          <div className="max-w-4xl mx-auto px-4 py-8 md:px-6">
            <div className="text-center py-6 md:py-12">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
                <Package className="w-8 h-8 md:w-10 md:h-10 text-green-600" />
              </div>
              
              <h1 className="text-2xl md:text-4xl mb-3 md:mb-4">Pedido Confirmado!</h1>
              <p className="text-sm md:text-lg text-[rgb(var(--color-text-secondary))] mb-6 md:mb-8 max-w-md mx-auto px-4">
                Seu pedido foi confirmado com sucesso. Você receberá um e-mail com os detalhes e código de rastreamento.
              </p>

              <div className="card p-6 md:p-8 max-w-md mx-auto mb-6 md:mb-8">
                <div className="space-y-4 text-left">
                  <div>
                    <div className="text-xs md:text-sm text-[rgb(var(--color-text-secondary))]">Pedido</div>
                    <div className="text-base md:text-lg font-mono">#ORD-{Math.random().toString(36).substr(2, 9).toUpperCase()}</div>
                  </div>
                  <div>
                    <div className="text-xs md:text-sm text-[rgb(var(--color-text-secondary))]">Prazo de entrega</div>
                    <div className="text-base md:text-lg">5-10 dias úteis</div>
                  </div>
                  <div>
                    <div className="text-xs md:text-sm text-[rgb(var(--color-text-secondary))]">Total pago</div>
                    <div className="text-xl md:text-2xl font-semibold">{formatPrice(total)}</div>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setView('main')}
                className="btn-secondary text-sm md:text-base py-3 md:py-4 px-6"
              >
                Voltar ao perfil
              </button>
            </div>
          </div>
        </div>
      );
    }
  }

  // Bookings View
  if (view === 'bookings') {
    return (
      <div className="min-h-screen pt-20 pb-20 md:pt-24 md:pb-8 bg-[#F5F5F5]">
        <div className="max-w-4xl mx-auto px-4 py-6 md:px-6 md:py-8">
          {/* Header com botão voltar */}
          <div className="flex items-center gap-2 md:gap-4 mb-6 md:mb-8">
            <button
              onClick={() => setView('main')}
              className="text-[rgb(var(--color-text-secondary))] hover:text-black transition-colors touch-manipulation flex-shrink-0 -mt-1"
            >
              <ArrowLeft className="w-6 h-6 md:w-5 md:h-5" />
            </button>
            <h1 className="text-2xl md:text-4xl">Meus Agendamentos</h1>
          </div>

          {bookings.length === 0 ? (
            <div className="card p-8 md:p-12 text-center">
              <Calendar className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-3 md:mb-4 text-[rgb(var(--color-text-secondary))]" />
              <h2 className="text-lg md:text-2xl mb-2">Nenhum agendamento</h2>
              <p className="text-sm md:text-base text-[rgb(var(--color-text-secondary))]">
                Você ainda não fez nenhum agendamento
              </p>
            </div>
          ) : (
            <div className="space-y-3 md:space-y-4">
              {bookings.map((booking) => (
                <div key={booking.id} className="card p-4 md:p-6">
                  {/* Header com status */}
                  <div className="flex items-start justify-between gap-2 mb-3 md:mb-4">
                    <h3 className="text-base md:text-xl font-semibold line-clamp-2 flex-1">{booking.service.name}</h3>
                    <div className={`text-[10px] md:text-sm px-2 md:px-3 py-1 rounded-full whitespace-nowrap flex-shrink-0 ${
                      booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                      booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {booking.status === 'confirmed' ? 'Confirmado' :
                       booking.status === 'pending' ? 'Pendente' : 'Cancelado'}
                    </div>
                  </div>

                  {/* Informações principais */}
                  <div className="space-y-2 mb-3 md:mb-4">
                    <div className="flex items-center gap-2 text-xs md:text-sm text-[rgb(var(--color-text-secondary))]">
                      <User className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0" />
                      <span className="line-clamp-1">{booking.professional.name}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs md:text-sm text-[rgb(var(--color-text-secondary))]">
                      <Calendar className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0" />
                      <span>{formatDate(booking.date)} às {booking.timeSlot}</span>
                    </div>
                  </div>

                  {/* Preço */}
                  <div className="flex items-center justify-between pt-3 border-t border-black/10">
                    <span className="text-xs md:text-sm text-[rgb(var(--color-text-secondary))]">Total pago</span>
                    <span className="text-lg md:text-2xl font-semibold">{formatPrice(booking.totalPaid)}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Orders View
  if (view === 'orders') {
    return (
      <div className="min-h-screen pt-20 pb-20 md:pt-24 md:pb-8 bg-[#F5F5F5]">
        <div className="max-w-4xl mx-auto px-4 py-6 md:px-6 md:py-8">
          {/* Header com botão voltar */}
          <div className="flex items-center gap-2 md:gap-4 mb-6 md:mb-8">
            <button
              onClick={() => setView('main')}
              className="text-[rgb(var(--color-text-secondary))] hover:text-black transition-colors touch-manipulation flex-shrink-0 -mt-1"
            >
              <ArrowLeft className="w-6 h-6 md:w-5 md:h-5" />
            </button>
            <h1 className="text-2xl md:text-4xl">Meus Pedidos</h1>
          </div>

          {orders.length === 0 ? (
            <div className="card p-8 md:p-12 text-center">
              <Package className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-3 md:mb-4 text-[rgb(var(--color-text-secondary))]" />
              <h2 className="text-lg md:text-2xl mb-2">Nenhum pedido</h2>
              <p className="text-sm md:text-base text-[rgb(var(--color-text-secondary))]">
                Você ainda não fez nenhuma compra
              </p>
            </div>
          ) : (
            <div className="space-y-3 md:space-y-4">
              {orders.map((order) => (
                <div key={order.id} className="card p-4 md:p-6">
                  {/* Header com número do pedido e status */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <Package className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
                      <h3 className="text-sm md:text-xl font-semibold truncate">
                        #{order.id.substring(0, 8).toUpperCase()}
                      </h3>
                    </div>
                    <div className={`text-[10px] md:text-sm px-2 md:px-3 py-1 rounded-full whitespace-nowrap flex-shrink-0 ${
                      order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                      order.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                      order.status === 'shipped' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {order.status === 'delivered' ? 'Entregue' :
                       order.status === 'processing' ? 'Processando' :
                       order.status === 'shipped' ? 'Enviado' : 'Cancelado'}
                    </div>
                  </div>

                  {/* Data do pedido */}
                  <div className="flex items-center gap-2 text-xs md:text-sm text-[rgb(var(--color-text-secondary))] mb-3">
                    <Calendar className="w-3 h-3 md:w-4 md:h-4" />
                    <span>{formatDate(order.date)}</span>
                  </div>

                  {/* Lista de itens */}
                  <div className="space-y-1.5 md:space-y-2 mb-3 md:mb-4 pb-3 md:pb-4 border-b border-black/10">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between gap-2 text-xs md:text-sm">
                        <span className="text-[rgb(var(--color-text-secondary))] line-clamp-1 flex-1">
                          {item.quantity}x {item.name}
                        </span>
                        <span className="font-medium flex-shrink-0">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Total */}
                  <div className="flex items-center justify-between mb-3 md:mb-4">
                    <span className="text-sm md:text-base font-medium">Total</span>
                    <span className="text-lg md:text-2xl font-semibold">{formatPrice(order.total)}</span>
                  </div>

                  {/* Endereço de entrega */}
                  {order.shippingAddress && (
                    <div className="bg-[rgb(var(--color-tertiary-dark))] rounded-lg p-3 md:p-4">
                      <div className="flex items-start gap-2 mb-2">
                        <MapPin className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0 mt-0.5" />
                        <div className="text-xs md:text-sm">
                          <div className="font-medium mb-1">Endereço de entrega</div>
                          <div className="text-[rgb(var(--color-text-secondary))] leading-relaxed">
                            {order.shippingAddress.address}, {order.shippingAddress.number}
                            {order.shippingAddress.complement && ` - ${order.shippingAddress.complement}`}
                            <br />
                            {order.shippingAddress.city} - {order.shippingAddress.state}, {order.shippingAddress.cep}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  return null;
}