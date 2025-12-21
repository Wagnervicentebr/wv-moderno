import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Clock, DollarSign, Check, Calendar as CalendarIcon, CreditCard } from 'lucide-react';
import { services, generateTimeSlots, Service, TimeSlot } from '../data/mockData';
import { useBooking } from '../contexts/BookingContext';

type BookingStep = 'service' | 'datetime' | 'review' | 'payment' | 'confirmation';

interface BookingData {
  service?: Service;
  date?: Date;
  timeSlot?: string;
}

interface BookingFlowProps {
  onNavigate: (view: 'home' | 'booking' | 'products' | 'cart' | 'profile') => void;
}

// Walter Leal como profissional fixo
const WALTER_LEAL_PROFESSIONAL = {
  id: 'walter',
  name: 'Walter Leal',
  specialties: ['Coloração', 'Cortes Premium', 'Tratamentos'],
  image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYW58ZW58MXx8fHwxNzM0NzE5NjQzfDA&ixlib=rb-4.1.0&q=80&w=1080',
  services: [], // Atende todos os serviços
};

export function BookingFlow({ onNavigate }: BookingFlowProps) {
  const [step, setStep] = useState<BookingStep>('service');
  const [bookingData, setBookingData] = useState<BookingData>({});
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'pix'>('card');
  const [processing, setProcessing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const { addBooking } = useBooking();

  // Categories for filtering
  const categories = ['all', 'masculino', 'feminino', 'manicure', 'maquiagem'];

  // Filter services by category
  const filteredServices = selectedCategory === 'all'
    ? services
    : services.filter(s => s.category === selectedCategory);

  const handleServiceSelect = (service: Service) => {
    setBookingData({ ...bookingData, service });
    setTimeSlots(generateTimeSlots(selectedDate));
    setStep('datetime');
  };

  const handleDateTimeSelect = (timeSlot: string) => {
    setBookingData({ ...bookingData, date: selectedDate, timeSlot });
    setStep('review');
  };

  const handleBack = (targetStep: BookingStep) => {
    // Clear data from steps ahead when going back
    if (targetStep === 'service') {
      setBookingData({});
      setTimeSlots([]);
    } else if (targetStep === 'datetime') {
      setBookingData({ 
        service: bookingData.service 
      });
    } else if (targetStep === 'review') {
      setBookingData({ 
        service: bookingData.service,
        date: bookingData.date,
        timeSlot: bookingData.timeSlot
      });
    }
    setStep(targetStep);
  };

  const handlePayment = async () => {
    setProcessing(true);
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Save booking with Walter Leal as professional
    if (bookingData.service && bookingData.date && bookingData.timeSlot) {
      addBooking({
        service: bookingData.service,
        professional: WALTER_LEAL_PROFESSIONAL,
        date: bookingData.date,
        timeSlot: bookingData.timeSlot,
        totalPaid: bookingData.service.price,
      });
    }
    
    setProcessing(false);
    setStep('confirmation');
  };

  const formatDate = (date: Date) => {
    const days = ['domingo', 'segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado'];
    const months = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];
    
    const dayOfWeek = days[date.getDay()];
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    
    return `${dayOfWeek}, ${day} de ${month} de ${year}`;
  };

  const formatPrice = (price: number) => {
    return 'R$ ' + price.toFixed(2).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  return (
    <div className="min-h-screen pt-14 pb-20 md:pt-16 md:pb-8 bg-[#F5F5F5]">
      <div className="max-w-5xl mx-auto px-4 py-6 md:py-8">
        {/* Progress Indicator */}
        {step !== 'confirmation' && (
          <div className="mb-6 md:mb-8">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs md:text-sm font-medium text-[rgb(var(--color-text-secondary))]">
                {step === 'service' && 'Passo 1 de 4 - Serviço'}
                {step === 'datetime' && 'Passo 2 de 4 - Data e Hora'}
                {step === 'review' && 'Passo 3 de 4 - Revisão'}
                {step === 'payment' && 'Finalizando pagamento'}
              </span>
            </div>
            <div className="h-2 bg-white rounded-full overflow-hidden shadow-inner">
              <div 
                className="h-full bg-gradient-to-r from-[rgb(var(--color-accent))] to-[rgb(var(--color-luxury))] transition-all duration-500 ease-out"
                style={{ 
                  width: step === 'service' ? '25%' : 
                         step === 'datetime' ? '50%' : 
                         step === 'review' ? '75%' : '100%' 
                }}
              />
            </div>
          </div>
        )}

        {/* Service Selection */}
        {step === 'service' && (
          <div>
            <h1 className="text-2xl md:text-4xl mb-3 md:mb-4">Escolha seu serviço</h1>
            <p className="text-sm md:text-base text-[rgb(var(--color-text-secondary))] mb-6">
              Selecione o serviço que deseja realizar
            </p>

            {/* Category Filter */}
            <div className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide -mx-4 px-4">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-xl whitespace-nowrap transition-all text-sm font-medium flex-shrink-0 touch-manipulation ${
                    selectedCategory === category 
                      ? 'bg-black text-white' 
                      : 'bg-white text-[rgb(var(--color-text-secondary))] hover:bg-gray-50'
                  }`}
                >
                  {category === 'all' ? 'Todos' : category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-4 md:gap-6">
              {filteredServices.map((service) => (
                <button
                  key={service.id}
                  onClick={() => handleServiceSelect(service)}
                  className="card-hover text-left overflow-hidden p-0"
                >
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4 md:p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs px-2 py-1 bg-[rgb(var(--color-accent))]/20 rounded-lg text-[rgb(var(--color-text-secondary))] uppercase tracking-wide">
                        {service.category}
                      </span>
                    </div>
                    <h3 className="text-lg md:text-xl mb-2">{service.name}</h3>
                    <p className="text-xs md:text-sm text-[rgb(var(--color-text-secondary))] mb-4 line-clamp-2">
                      {service.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs md:text-sm text-[rgb(var(--color-text-secondary))]">
                        <Clock className="w-4 h-4" />
                        {service.duration} min
                      </div>
                      <div className="text-lg md:text-xl font-semibold">{formatPrice(service.price)}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Date & Time Selection */}
        {step === 'datetime' && bookingData.service && (
          <div>
            <button
              onClick={() => handleBack('service')}
              className="flex items-center gap-2 text-[rgb(var(--color-text-secondary))] hover:text-black mb-6 transition-colors touch-manipulation"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="text-sm md:text-base">Voltar</span>
            </button>

            <h1 className="text-2xl md:text-4xl mb-3 md:mb-4">Escolha data e horário</h1>
            <p className="text-sm md:text-base text-[rgb(var(--color-text-secondary))] mb-6 md:mb-8">
              Selecione o melhor horário para você
            </p>

            {/* Simple Date Selector */}
            <div className="card mb-4 md:mb-6 p-4 md:p-6">
              <div className="flex items-center gap-2 mb-4">
                <CalendarIcon className="w-5 h-5" />
                <h3 className="text-lg md:text-xl">Data</h3>
              </div>
              <div className="flex gap-2 md:gap-4 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
                {Array.from({ length: 7 }).map((_, idx) => {
                  const date = new Date();
                  date.setDate(date.getDate() + idx);
                  const isSelected = selectedDate.toDateString() === date.toDateString();
                  
                  return (
                    <button
                      key={idx}
                      onClick={() => {
                        setSelectedDate(date);
                        setTimeSlots(generateTimeSlots(date));
                      }}
                      className={`flex-shrink-0 p-3 md:p-4 min-w-[80px] md:min-w-[100px] rounded-xl border-2 transition-all touch-manipulation ${
                        isSelected 
                          ? 'border-black bg-black text-white' 
                          : 'border-gray-200 hover:border-black bg-white'
                      }`}
                    >
                      <div className="text-xs md:text-sm mb-1">
                        {date.toLocaleDateString('pt-BR', { weekday: 'short' })}
                      </div>
                      <div className="text-xl md:text-2xl font-semibold">
                        {date.getDate()}
                      </div>
                      <div className="text-xs md:text-sm">
                        {date.toLocaleDateString('pt-BR', { month: 'short' })}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Time Slots */}
            <div className="card p-4 md:p-6">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-5 h-5" />
                <h3 className="text-lg md:text-xl">Horário</h3>
              </div>
              <div className="grid grid-cols-3 md:grid-cols-4 gap-2 md:gap-3">
                {timeSlots.map((slot) => (
                  <button
                    key={slot.time}
                    onClick={() => slot.available && handleDateTimeSelect(slot.time)}
                    disabled={!slot.available}
                    className={`p-3 md:p-4 rounded-xl border-2 transition-all text-sm md:text-base font-medium touch-manipulation ${
                      slot.available
                        ? 'border-gray-200 hover:border-black hover:bg-black hover:text-white bg-white'
                        : 'border-gray-100 text-[rgb(var(--color-text-secondary))] opacity-40 cursor-not-allowed bg-gray-50'
                    }`}
                  >
                    {slot.time}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Review */}
        {step === 'review' && (
          <div>
            <button
              onClick={() => handleBack('datetime')}
              className="flex items-center gap-2 text-[rgb(var(--color-text-secondary))] hover:text-black mb-6 transition-colors touch-manipulation"
            >
              <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
              <span className="text-sm md:text-base">Voltar</span>
            </button>

            {/* Header */}
            <div className="mb-6">
              <h1 className="text-2xl md:text-4xl mb-2">Revise seu agendamento</h1>
              <p className="text-sm md:text-base text-[rgb(var(--color-text-secondary))]">
                Confirme os detalhes antes de prosseguir para o pagamento
              </p>
            </div>

            {/* Service Card */}
            <div className="card p-4 md:p-6 mb-3 md:mb-4">
              <div className="flex gap-3 md:gap-4">
                {/* Service Image */}
                <div className="w-24 h-24 md:w-28 md:h-28 card-image flex-shrink-0 overflow-hidden">
                  <img
                    src={bookingData.service?.image}
                    alt={bookingData.service?.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Service Info */}
                <div className="flex-1 min-w-0">
                  <div className="text-xs md:text-sm text-[rgb(var(--color-text-secondary))] mb-1 font-medium uppercase tracking-wide">
                    Serviço
                  </div>
                  <h3 className="text-base md:text-xl mb-2 line-clamp-2">{bookingData.service?.name}</h3>
                  <div className="flex items-center gap-4 text-xs md:text-sm text-[rgb(var(--color-text-secondary))]">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3 md:w-4 md:h-4" />
                      <span>{bookingData.service?.duration} min</span>
                    </div>
                    <div className="text-base md:text-lg font-semibold text-black">
                      {formatPrice(bookingData.service?.price || 0)}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Professional Card */}
            <div className="card p-4 md:p-6 mb-3 md:mb-4">
              <div className="text-xs md:text-sm text-[rgb(var(--color-text-secondary))] mb-3 font-medium uppercase tracking-wide">
                Profissional
              </div>
              <div className="flex items-center gap-3">
                <img
                  src={WALTER_LEAL_PROFESSIONAL.image}
                  alt={WALTER_LEAL_PROFESSIONAL.name}
                  className="w-12 h-12 md:w-14 md:h-14 rounded-full object-cover flex-shrink-0 border-2 border-[rgb(var(--color-accent))]"
                />
                <div>
                  <div className="text-base md:text-lg font-semibold">{WALTER_LEAL_PROFESSIONAL.name}</div>
                  <div className="text-xs md:text-sm text-[rgb(var(--color-text-secondary))]">
                    {WALTER_LEAL_PROFESSIONAL.specialties.join(' • ')}
                  </div>
                </div>
              </div>
            </div>

            {/* Date & Time Card */}
            <div className="card p-4 md:p-6 mb-3 md:mb-4">
              <div className="text-xs md:text-sm text-[rgb(var(--color-text-secondary))] mb-3 font-medium uppercase tracking-wide">
                Data e Horário
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <CalendarIcon className="w-4 h-4 md:w-5 md:h-5 text-[rgb(var(--color-accent))]" />
                  <span className="text-sm md:text-base capitalize">{bookingData.date && formatDate(bookingData.date)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 md:w-5 md:h-5 text-[rgb(var(--color-accent))]" />
                  <span className="text-sm md:text-base font-medium">{bookingData.timeSlot}</span>
                </div>
              </div>
            </div>

            {/* Summary - Sticky on Mobile */}
            <div className="sticky bottom-20 md:static z-10">
              <div className="card p-4 md:p-6 mb-4 md:mb-6 shadow-xl md:shadow-none">
                <h3 className="text-base md:text-xl mb-3 md:mb-4">Resumo do Agendamento</h3>
                <div className="space-y-2 md:space-y-3 mb-3 md:mb-4">
                  <div className="flex justify-between text-sm md:text-base text-[rgb(var(--color-text-secondary))]">
                    <span>Valor do serviço</span>
                    <span>{formatPrice(bookingData.service?.price || 0)}</span>
                  </div>
                  <div className="h-px bg-black/10"></div>
                  <div className="flex justify-between text-lg md:text-xl font-semibold">
                    <span>Total a pagar</span>
                    <span>{formatPrice(bookingData.service?.price || 0)}</span>
                  </div>
                </div>

                {/* Info Box */}
                <div className="bg-gradient-to-br from-[rgb(var(--color-tertiary))] to-[rgb(var(--color-tertiary-dark))] p-3 md:p-4 rounded-xl mb-3 md:mb-4">
                  <p className="text-xs md:text-sm text-[rgb(var(--color-text-secondary))]">
                    💳 <strong className="text-black">Pagamento antecipado obrigatório</strong><br />
                    para confirmar seu agendamento
                  </p>
                </div>

                {/* Checkout Button */}
                <button
                  onClick={() => setStep('payment')}
                  className="btn-primary w-full flex items-center justify-center gap-2 text-sm md:text-base"
                >
                  Continuar para pagamento
                  <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Payment */}
        {step === 'payment' && (
          <div>
            <button
              onClick={() => handleBack('review')}
              className="flex items-center gap-2 text-[rgb(var(--color-text-secondary))] hover:text-black mb-6 transition-colors touch-manipulation"
            >
              <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
              <span className="text-sm md:text-base">Voltar</span>
            </button>

            <h1 className="text-2xl md:text-4xl mb-3 md:mb-4">Pagamento</h1>
            <p className="text-sm md:text-base text-[rgb(var(--color-text-secondary))] mb-6 md:mb-8">
              Escolha a forma de pagamento
            </p>

            {/* Payment Method Selection */}
            <div className="grid md:grid-cols-2 gap-3 md:gap-4 mb-4 md:mb-6">
              <button
                onClick={() => setPaymentMethod('card')}
                className={`card p-5 md:p-6 border-2 transition-all touch-manipulation ${
                  paymentMethod === 'card'
                    ? 'border-black'
                    : 'border-transparent'
                }`}
              >
                <CreditCard className="w-6 h-6 md:w-8 md:h-8 mb-2 md:mb-3" />
                <div className="text-lg md:text-xl mb-1 font-medium">Cartão</div>
                <div className="text-xs md:text-sm text-[rgb(var(--color-text-secondary))]">
                  Crédito ou Débito
                </div>
              </button>

              <button
                onClick={() => setPaymentMethod('pix')}
                className={`card p-5 md:p-6 border-2 transition-all touch-manipulation ${
                  paymentMethod === 'pix'
                    ? 'border-black'
                    : 'border-transparent'
                }`}
              >
                <DollarSign className="w-6 h-6 md:w-8 md:h-8 mb-2 md:mb-3" />
                <div className="text-lg md:text-xl mb-1 font-medium">PIX</div>
                <div className="text-xs md:text-sm text-[rgb(var(--color-text-secondary))]">
                  Pagamento instantâneo
                </div>
              </button>
            </div>

            {/* Payment Form */}
            {paymentMethod === 'card' && (
              <div className="card p-5 md:p-6 mb-4 md:mb-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs md:text-sm mb-2 font-medium">Número do cartão</label>
                    <input
                      type="text"
                      placeholder="0000 0000 0000 0000"
                      className="input-primary text-sm md:text-base"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3 md:gap-4">
                    <div>
                      <label className="block text-xs md:text-sm mb-2 font-medium">Validade</label>
                      <input
                        type="text"
                        placeholder="MM/AA"
                        className="input-primary text-sm md:text-base"
                      />
                    </div>
                    <div>
                      <label className="block text-xs md:text-sm mb-2 font-medium">CVV</label>
                      <input
                        type="text"
                        placeholder="000"
                        className="input-primary text-sm md:text-base"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs md:text-sm mb-2 font-medium">Nome no cartão</label>
                    <input
                      type="text"
                      placeholder="Nome como aparece no cartão"
                      className="input-primary text-sm md:text-base"
                    />
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === 'pix' && (
              <div className="card p-5 md:p-6 mb-4 md:mb-6 text-center">
                <div className="w-40 h-40 md:w-48 md:h-48 bg-white border-2 border-black mx-auto mb-4 flex items-center justify-center rounded-lg">
                  <div className="text-sm">QR Code PIX</div>
                </div>
                <p className="text-xs md:text-sm text-[rgb(var(--color-text-secondary))] mb-4">
                  Escaneie o QR Code com seu aplicativo de banco
                </p>
                <div className="bg-[rgb(var(--color-tertiary-dark))] p-3 md:p-4 text-xs md:text-sm font-mono break-all rounded-lg">
                  00020126580014br.gov.bcb.pix...
                </div>
                <p className="text-[10px] md:text-xs text-[rgb(var(--color-text-secondary))] mt-2">
                  Ou copie e cole o código acima
                </p>
              </div>
            )}

            {/* Total */}
            <div className="card p-5 md:p-6 mb-4 md:mb-6">
              <div className="flex items-center justify-between">
                <div className="text-base md:text-lg font-medium">Total a pagar</div>
                <div className="text-2xl md:text-3xl font-semibold">{formatPrice(bookingData.service?.price || 0)}</div>
              </div>
            </div>

            {/* Sticky button on mobile */}
            <div className="sticky bottom-20 md:static">
              <button
                onClick={handlePayment}
                disabled={processing}
                className="btn-primary w-full disabled:opacity-50 text-sm md:text-base py-3 md:py-4 shadow-xl md:shadow-none"
              >
                {processing ? 'Processando pagamento...' : 'Confirmar pagamento'}
              </button>
            </div>

            <p className="text-[10px] md:text-xs text-center text-[rgb(var(--color-text-secondary))] mt-4">
              Seus dados estão seguros e protegidos
            </p>
          </div>
        )}

        {/* Confirmation */}
        {step === 'confirmation' && (
          <div className="text-center px-4 py-6 md:py-12">
            {/* Success Icon */}
            <div className="relative mb-6 md:mb-8">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto shadow-lg animate-fade-in">
                <Check className="w-8 h-8 md:w-10 md:h-10 text-white" strokeWidth={3} />
              </div>
              <div className="absolute inset-0 w-16 h-16 md:w-20 md:h-20 bg-green-500 rounded-full mx-auto opacity-20 animate-ping"></div>
            </div>
            
            {/* Title & Message */}
            <h1 className="text-2xl md:text-4xl mb-3 md:mb-4 px-4">Agendamento Confirmado!</h1>
            <p className="text-sm md:text-lg text-[rgb(var(--color-text-secondary))] mb-6 md:mb-8 max-w-md mx-auto px-4">
              Seu agendamento foi confirmado com sucesso. Você receberá uma confirmação por SMS.
            </p>

            {/* Booking Details Card */}
            <div className="card p-5 md:p-8 max-w-md mx-auto mb-6 md:mb-8 shadow-lg">
              <div className="space-y-5 md:space-y-6">
                {/* Service */}
                <div className="text-left">
                  <div className="text-xs md:text-sm text-[rgb(var(--color-text-secondary))] mb-2 font-medium uppercase tracking-wide">Serviço</div>
                  <div className="text-base md:text-lg font-semibold">{bookingData.service?.name}</div>
                  <div className="flex items-center gap-2 mt-1 text-xs md:text-sm text-[rgb(var(--color-text-secondary))]">
                    <Clock className="w-3 h-3 md:w-4 md:h-4" />
                    {bookingData.service?.duration} minutos
                    <span className="mx-1">•</span>
                    <DollarSign className="w-3 h-3 md:w-4 md:h-4" />
                    {formatPrice(bookingData.service?.price || 0)}
                  </div>
                </div>

                {/* Professional */}
                <div className="border-t border-black/10 pt-5 md:pt-6 text-left">
                  <div className="text-xs md:text-sm text-[rgb(var(--color-text-secondary))] mb-3 font-medium uppercase tracking-wide">Profissional</div>
                  <div className="flex items-center gap-3">
                    <img
                      src={WALTER_LEAL_PROFESSIONAL.image}
                      alt={WALTER_LEAL_PROFESSIONAL.name}
                      className="w-12 h-12 md:w-14 md:h-14 rounded-full object-cover flex-shrink-0 border-2 border-[rgb(var(--color-accent))]"
                    />
                    <div>
                      <div className="text-base md:text-lg font-semibold">{WALTER_LEAL_PROFESSIONAL.name}</div>
                      <div className="text-xs md:text-sm text-[rgb(var(--color-text-secondary))]">
                        {WALTER_LEAL_PROFESSIONAL.specialties[0]}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Date & Time */}
                <div className="border-t border-black/10 pt-5 md:pt-6 text-left">
                  <div className="text-xs md:text-sm text-[rgb(var(--color-text-secondary))] mb-3 font-medium uppercase tracking-wide">Data e Horário</div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-base md:text-lg">
                      <CalendarIcon className="w-4 h-4 md:w-5 md:h-5 text-[rgb(var(--color-accent))]" />
                      <span className="capitalize font-semibold">{bookingData.date && formatDate(bookingData.date)}</span>
                    </div>
                    <div className="flex items-center gap-2 text-base md:text-lg">
                      <Clock className="w-4 h-4 md:w-5 md:h-5 text-[rgb(var(--color-accent))]" />
                      <span className="font-semibold">{bookingData.timeSlot}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Info Box */}
            <div className="card p-4 md:p-5 max-w-md mx-auto mb-6 md:mb-8 bg-gradient-to-br from-[rgb(var(--color-tertiary))] to-[rgb(var(--color-tertiary-dark))] border border-[rgb(var(--color-accent))]/20">
              <div className="flex items-start gap-3 text-left">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-[rgb(var(--color-accent))] rounded-full flex items-center justify-center flex-shrink-0">
                  <CalendarIcon className="w-4 h-4 md:w-5 md:h-5 text-black" />
                </div>
                <div>
                  <div className="text-sm md:text-base font-semibold mb-1">Lembre-se!</div>
                  <div className="text-xs md:text-sm text-[rgb(var(--color-text-secondary))]">
                    Chegue com 10 minutos de antecedência. Em caso de atraso ou cancelamento, entre em contato conosco.
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3 max-w-md mx-auto">
              <button
                onClick={() => {
                  setStep('service');
                  setBookingData({});
                }}
                className="btn-luxury w-full text-sm md:text-base py-3 md:py-4"
              >
                Fazer novo agendamento
              </button>
              <button
                onClick={() => onNavigate('home')}
                className="btn-secondary w-full text-sm md:text-base py-3 md:py-4"
              >
                Voltar ao início
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}