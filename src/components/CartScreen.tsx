import React, { useState, useEffect } from 'react';
import { ShoppingCart, Trash2, Plus, Minus, ArrowRight, CreditCard, MapPin, Package, CheckCircle } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useOrder } from '../contexts/OrderContext';

type CheckoutStep = 'cart' | 'address' | 'payment' | 'confirmation';

export function CartScreen() {
  const { items, removeItem, updateQuantity, clearCart, total } = useCart();
  const { addOrder } = useOrder();
  const [step, setStep] = useState<CheckoutStep>('cart');
  const [orderId, setOrderId] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'pix'>('card');
  const [formData, setFormData] = useState({
    name: 'João Silva',
    cpf: '123.456.789-10',
    email: 'joao@example.com',
    cep: '01310-100',
    address: 'Avenida Paulista',
    number: '1000',
    complement: 'Apto 1501',
    city: 'São Paulo',
    state: 'SP',
  });

  // Scroll to top whenever the checkout step changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step]);

  const formatPrice = (price: number) => {
    if (price === undefined || price === null || isNaN(price)) {
      return 'R$ 0,00';
    }
    return 'R$ ' + price.toFixed(2).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  const shippingCost = 0; // Frete grátis
  const finalTotal = total + shippingCost;

  const handleCheckout = () => {
    if (items.length === 0) return;
    setStep('address');
  };

  const handleConfirmAddress = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
  };

  const handleConfirmOrder = () => {
    const newOrderId = addOrder({
      items,
      total: finalTotal,
      shippingCost,
      status: 'processing',
      shippingAddress: formData,
    });
    setOrderId(newOrderId);
    clearCart();
    setStep('confirmation');
  };

  // Cart View
  if (step === 'cart') {
    return (
      <div className="min-h-screen pt-14 pb-20 md:pt-20 md:pb-8 bg-[#F5F5F5]">
        <div className="max-w-4xl mx-auto px-4 py-4 md:py-8">
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-2">
              <ShoppingCart className="w-6 h-6 md:w-10 md:h-10" />
              <h1 className="text-2xl md:text-4xl">Carrinho</h1>
            </div>
            <p className="text-sm md:text-base text-[rgb(var(--color-text-secondary))] pl-9 md:pl-14">
              {items.length} {items.length === 1 ? 'item' : 'itens'}
            </p>
          </div>

          {items.length === 0 ? (
            <div className="card p-8 md:p-12 text-center">
              <ShoppingCart className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-3 md:mb-4 text-[rgb(var(--color-text-secondary))]" />
              <h3 className="text-lg md:text-2xl mb-2">Seu carrinho está vazio</h3>
              <p className="text-sm md:text-base text-[rgb(var(--color-text-secondary))]">
                Adicione produtos para continuar
              </p>
            </div>
          ) : (
            <>
              {/* Cart Items */}
              <div className="space-y-3 md:space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.id} className="card p-4 md:p-6">
                    <div className="flex gap-3 md:gap-6">
                      {/* Product Image */}
                      <div className="w-20 h-20 md:w-24 md:h-24 card-image flex-shrink-0 overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between gap-2 mb-3">
                          <h3 className="text-base md:text-xl line-clamp-2">{item.name}</h3>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-[rgb(var(--color-text-secondary))] hover:text-red-600 transition-colors flex-shrink-0 p-1 touch-manipulation"
                          >
                            <Trash2 className="w-4 h-4 md:w-5 md:h-5" />
                          </button>
                        </div>

                        <div className="flex items-center justify-between">
                          {/* Quantity Controls */}
                          <div className="flex items-center gap-2">
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

                          {/* Price */}
                          <div className="text-right">
                            <div className="text-xs md:text-sm text-[rgb(var(--color-text-secondary))] mb-0.5">
                              {formatPrice(item.price)} cada
                            </div>
                            <div className="text-base md:text-xl font-semibold">
                              {formatPrice(item.price * item.quantity)}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary - Sticky on Mobile */}
              <div className="sticky bottom-20 md:static z-10">
                <div className="card p-4 md:p-6 mb-4 md:mb-6 shadow-xl md:shadow-none">
                  <h3 className="text-base md:text-xl mb-3 md:mb-4">Resumo do Pedido</h3>
                  <div className="space-y-2 md:space-y-3 mb-3 md:mb-4">
                    <div className="flex justify-between text-sm md:text-base text-[rgb(var(--color-text-secondary))]">
                      <span>Subtotal</span>
                      <span>{formatPrice(total)}</span>
                    </div>
                    <div className="flex justify-between text-sm md:text-base text-[rgb(var(--color-text-secondary))]">
                      <span>Frete</span>
                      <span className="text-green-600 font-medium">Grátis</span>
                    </div>
                    <div className="h-px bg-black/10"></div>
                    <div className="flex justify-between text-lg md:text-xl font-semibold">
                      <span>Total</span>
                      <span>{formatPrice(finalTotal)}</span>
                    </div>
                  </div>

                  {/* Checkout Button */}
                  <button
                    onClick={handleCheckout}
                    className="btn-primary w-full flex items-center justify-center gap-2 text-sm md:text-base"
                  >
                    Finalizar Compra
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

  // Address Step
  if (step === 'address') {
    return (
      <div className="min-h-screen pt-14 pb-20 md:pt-20 md:pb-8 bg-[#F5F5F5]">
        <div className="max-w-2xl mx-auto px-4 py-4 md:px-6 md:py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-2 md:gap-3 mb-2">
              <MapPin className="w-5 h-5 md:w-8 md:h-8" />
              <h1 className="text-2xl md:text-4xl">Endereço de Entrega</h1>
            </div>
            <p className="text-sm md:text-base text-[rgb(var(--color-text-secondary))] pl-9 md:pl-11 mt-2">
              Preencha seus dados para continuar o pedido
            </p>
          </div>

          <form onSubmit={handleConfirmAddress} className="card p-6 md:p-8 mb-6">
            <div className="space-y-5 md:space-y-6">
              {/* Full Name */}
              <div>
                <label className="block text-sm md:text-base mb-2 font-medium text-[rgb(var(--color-text-primary))]">
                  Nome Completo <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="input-primary text-sm md:text-base"
                  placeholder="Seu nome completo"
                />
              </div>

              {/* CPF and Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div>
                  <label className="block text-sm md:text-base mb-2 font-medium text-[rgb(var(--color-text-primary))]">
                    CPF <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.cpf}
                    onChange={(e) => setFormData({ ...formData, cpf: e.target.value })}
                    className="input-primary text-sm md:text-base"
                    placeholder="000.000.000-00"
                  />
                </div>

                <div>
                  <label className="block text-sm md:text-base mb-2 font-medium text-[rgb(var(--color-text-primary))]">
                    E-mail <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="input-primary text-sm md:text-base"
                    placeholder="seu@email.com"
                  />
                </div>
              </div>

              {/* CEP */}
              <div>
                <label className="block text-sm md:text-base mb-2 font-medium text-[rgb(var(--color-text-primary))]">
                  CEP <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.cep}
                  onChange={(e) => setFormData({ ...formData, cep: e.target.value })}
                  className="input-primary text-sm md:text-base"
                  placeholder="00000-000"
                />
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm md:text-base mb-2 font-medium text-[rgb(var(--color-text-primary))]">
                  Endereço <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="input-primary text-sm md:text-base"
                  placeholder="Rua, Avenida, Alameda..."
                />
              </div>

              {/* Number and Complement */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div>
                  <label className="block text-sm md:text-base mb-2 font-medium text-[rgb(var(--color-text-primary))]">
                    Número <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.number}
                    onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                    className="input-primary text-sm md:text-base"
                    placeholder="123"
                  />
                </div>

                <div>
                  <label className="block text-sm md:text-base mb-2 font-medium text-[rgb(var(--color-text-primary))]">
                    Complemento
                  </label>
                  <input
                    type="text"
                    value={formData.complement}
                    onChange={(e) => setFormData({ ...formData, complement: e.target.value })}
                    className="input-primary text-sm md:text-base"
                    placeholder="Apto, bloco, sala..."
                  />
                </div>
              </div>

              {/* City and State */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div>
                  <label className="block text-sm md:text-base mb-2 font-medium text-[rgb(var(--color-text-primary))]">
                    Cidade <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="input-primary text-sm md:text-base"
                    placeholder="São Paulo"
                  />
                </div>

                <div>
                  <label className="block text-sm md:text-base mb-2 font-medium text-[rgb(var(--color-text-primary))]">
                    Estado <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="input-primary text-sm md:text-base uppercase"
                    placeholder="SP"
                    maxLength={2}
                  />
                </div>
              </div>
            </div>
          </form>

          {/* Sticky buttons on mobile */}
          <div className="bottom-20 md:static">
            <div className="flex gap-3 md:gap-4">
              <button
                type="button"
                onClick={() => setStep('cart')}
                className="btn-secondary flex-1 text-sm md:text-base py-3 md:py-4 rounded-xl"
              >
                Voltar
              </button>
              <button 
                onClick={handleConfirmAddress}
                className="btn-primary flex-1 flex items-center justify-center gap-2 text-sm md:text-base py-3 md:py-4 rounded-xl"
              >
                Continuar
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Payment Step
  if (step === 'payment') {
    return (
      <div className="min-h-screen pt-14 pb-20 md:pt-20 md:pb-8 bg-[#F5F5F5]">
        <div className="max-w-2xl mx-auto px-4 py-4 md:px-6 md:py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-2 md:gap-3 mb-2">
              <CreditCard className="w-5 h-5 md:w-8 md:h-8" />
              <h1 className="text-2xl md:text-4xl">Pagamento</h1>
            </div>
            <p className="text-sm md:text-base text-[rgb(var(--color-text-secondary))] pl-9 md:pl-11 mt-2">
              Escolha seu método de pagamento
            </p>
          </div>

          {/* Order Summary */}
          <div className="card p-6 md:p-8 mb-8">
            <h3 className="text-lg md:text-xl mb-4 md:mb-5 font-semibold">Resumo do Pedido</h3>
            <div className="space-y-3 mb-4 md:mb-5">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm md:text-base">
                  <span className="line-clamp-1 flex-1 mr-2 text-[rgb(var(--color-text-primary))]">
                    {item.quantity}x {item.name}
                  </span>
                  <span className="font-medium text-[rgb(var(--color-text-primary))] flex-shrink-0">{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>
            <div className="h-px bg-black/10 my-4"></div>
            <div className="flex justify-between text-lg md:text-xl font-semibold">
              <span>Total</span>
              <span className="text-[rgb(var(--color-accent))]">{formatPrice(finalTotal)}</span>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="mb-8">
            <h3 className="text-sm md:text-base font-semibold mb-4 text-[rgb(var(--color-text-primary))]">
              Método de Pagamento
            </h3>
            <div className="space-y-3 md:space-y-4">
              <button
                onClick={() => setPaymentMethod('card')}
                className={`card-hover w-full text-left p-5 md:p-6 touch-manipulation transition-all ${
                  paymentMethod === 'card' ? 'ring-2 ring-[rgb(var(--color-accent))] bg-[rgb(var(--color-tertiary))]/30' : 'hover:bg-[#F5F5F5]'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-6 h-6 md:w-7 md:h-7 rounded-full border-2 flex items-center justify-center transition-colors ${
                    paymentMethod === 'card' 
                      ? 'border-[rgb(var(--color-accent))]' 
                      : 'border-black/30'
                  }`}>
                    {paymentMethod === 'card' && (
                      <div className="w-3 h-3 bg-[rgb(var(--color-accent))] rounded-full"></div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="text-base md:text-lg font-semibold text-[rgb(var(--color-text-primary))]">
                      Cartão de Crédito
                    </div>
                    <div className="text-sm md:text-base text-[rgb(var(--color-text-secondary))] mt-0.5">
                      Visa, Mastercard, Elo
                    </div>
                  </div>
                  <CreditCard className="w-5 h-5 md:w-6 md:h-6 text-[rgb(var(--color-accent))]" />
                </div>
              </button>

              <button
                onClick={() => setPaymentMethod('pix')}
                className={`card-hover w-full text-left p-5 md:p-6 touch-manipulation transition-all ${
                  paymentMethod === 'pix' ? 'ring-2 ring-[rgb(var(--color-accent))] bg-[rgb(var(--color-tertiary))]/30' : 'hover:bg-[#F5F5F5]'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-6 h-6 md:w-7 md:h-7 rounded-full border-2 flex items-center justify-center transition-colors ${
                    paymentMethod === 'pix' 
                      ? 'border-[rgb(var(--color-accent))]' 
                      : 'border-black/30'
                  }`}>
                    {paymentMethod === 'pix' && (
                      <div className="w-3 h-3 bg-[rgb(var(--color-accent))] rounded-full"></div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="text-base md:text-lg font-semibold text-[rgb(var(--color-text-primary))]">
                      PIX
                    </div>
                    <div className="text-sm md:text-base text-[rgb(var(--color-text-secondary))] mt-0.5">
                      Aprovação instantânea, seguro e rápido
                    </div>
                  </div>
                  <div className="w-5 h-5 md:w-6 md:h-6 bg-black text-white rounded flex items-center justify-center text-[10px] md:text-xs font-bold">
                    PIX
                  </div>
                </div>
              </button>
            </div>
          </div>

          <div className="card bg-gradient-to-r from-[rgb(var(--color-luxury))]/10 to-[rgb(var(--color-accent))]/10 border border-[rgb(var(--color-accent))]/30 p-4 md:p-5 mb-8 text-sm md:text-base">
            <span className="font-medium text-[rgb(var(--color-text-primary))]">
              💡 Modo demonstração:
            </span>
            <span className="text-[rgb(var(--color-text-secondary))] ml-2">
              O pagamento será simulado para fins de teste
            </span>
          </div>

          {/* Sticky buttons on mobile */}
          <div className="md:static">
            <div className="flex gap-3 md:gap-4">
              <button
                onClick={() => setStep('address')}
                className="btn-secondary flex-1 text-sm md:text-base py-3 md:py-4"
              >
                Voltar
              </button>
              <button
                onClick={handleConfirmOrder}
                className="btn-primary flex-1 flex items-center justify-center gap-2 text-sm md:text-base py-3 md:py-4"
              >
                Confirmar Pedido
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Confirmation Step
  return (
    <div className="min-h-screen pt-14 pb-20 md:pt-20 md:pb-8 bg-[#F5F5F5]">
      <div className="max-w-2xl mx-auto px-4 py-8 md:px-6">
        <div className="text-center mb-6 md:mb-8">
          <div className="w-16 h-16 md:w-20 md:h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
            <CheckCircle className="w-10 h-10 md:w-12 md:h-12 text-green-600" />
          </div>
          <h1 className="text-2xl md:text-4xl mb-3 md:mb-4">Pedido Confirmado!</h1>
          <p className="text-sm md:text-base text-[rgb(var(--color-text-secondary))]">
            Seu pedido foi realizado com sucesso
          </p>
        </div>

        <div className="card p-6 md:p-8 mb-6">
          <div className="text-center mb-6">
            <div className="text-xs md:text-sm text-[rgb(var(--color-text-secondary))] mb-2">
              Número do Pedido
            </div>
            <div className="text-xl md:text-3xl font-mono tracking-wider">{orderId}</div>
          </div>

          <div className="h-px bg-black/10 mb-6"></div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Package className="w-4 h-4 md:w-5 md:h-5 mt-1 flex-shrink-0" />
              <div>
                <div className="text-sm md:text-base font-medium mb-1">Status do Pedido</div>
                <div className="text-xs md:text-sm text-[rgb(var(--color-text-secondary))]">
                  Em processamento
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 md:w-5 md:h-5 mt-1 flex-shrink-0" />
              <div>
                <div className="text-sm md:text-base font-medium mb-1">Endereço de Entrega</div>
                <div className="text-xs md:text-sm text-[rgb(var(--color-text-secondary))]">
                  {formData.address}, {formData.number}
                  {formData.complement && ` - ${formData.complement}`}
                  <br />
                  {formData.city} - {formData.state}, {formData.cep}
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CreditCard className="w-4 h-4 md:w-5 md:h-5 mt-1 flex-shrink-0" />
              <div>
                <div className="text-sm md:text-base font-medium mb-1">Pagamento</div>
                <div className="text-xs md:text-sm text-[rgb(var(--color-text-secondary))]">
                  {paymentMethod === 'card' ? 'Cartão de Crédito' : 'PIX'}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center text-xs md:text-sm text-[rgb(var(--color-text-secondary))]">
          Enviamos um e-mail de confirmação para {formData.email}
        </div>
      </div>
    </div>
  );
}