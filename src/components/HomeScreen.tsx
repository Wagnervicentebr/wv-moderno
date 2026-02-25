import React from 'react';
import { Calendar, ShoppingBag, Sparkles, Clock, Shield, Award, ChevronRight, Star } from 'lucide-react';

interface HomeScreenProps {
  onNavigate: (view: 'booking' | 'products' | 'cart') => void;
}

export function HomeScreen({ onNavigate }: HomeScreenProps) {
  return (
    <div className="min-h-screen pt-14 pb-20 md:pt-16 md:pb-8 bg-gradient-to-b from-white via-[#F5F5F5] to-[rgb(var(--color-tertiary))]">
      {/* Hero Section - Brand Title */}
      <div className="max-w-7xl mx-auto px-4 pt-6 md:pt-12 pb-4 md:pb-6">
        <div className="text-center animate-fade-in">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-[rgb(var(--color-accent))]" />
            <span className="text-xs md:text-sm font-medium tracking-wider uppercase text-[rgb(var(--color-text-secondary))]">
              Experiência Premium
            </span>
            <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-[rgb(var(--color-accent))]" />
          </div>
          
          <h1 className="text-4xl md:text-7xl mb-4 md:mb-6 leading-tight">
            Beleza é uma<br />
            <span className="italic font-serif">arte premium</span>
          </h1>
          
          <p className="text-base md:text-xl text-[rgb(var(--color-text-secondary))] max-w-2xl mx-auto mb-6 md:mb-8 px-4">
            Agende serviços exclusivos ou adquira produtos profissionais do salão Walter Leal
          </p>

          {/* Stats Bar */}
          <div className="flex items-center justify-center gap-6 md:gap-12 py-4 md:py-6 px-6 bg-white/80 backdrop-blur-sm rounded-2xl max-w-3xl mx-auto shadow-sm">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-semibold mb-1">500+</div>
              <div className="text-xs md:text-sm text-[rgb(var(--color-text-secondary))]">Clientes</div>
            </div>
            <div className="w-px h-10 bg-black/10"></div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-semibold mb-1 flex items-center justify-center gap-1">
                5.0 <Star className="w-4 h-4 md:w-5 md:h-5 fill-[rgb(var(--color-accent))] text-[rgb(var(--color-accent))]" />
              </div>
              <div className="text-xs md:text-sm text-[rgb(var(--color-text-secondary))]">Avaliação</div>
            </div>
            <div className="w-px h-10 bg-black/10"></div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-semibold mb-1">15+</div>
              <div className="text-xs md:text-sm text-[rgb(var(--color-text-secondary))]">Anos</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Action Cards - PRIORITY CTAs */}
      <div className="max-w-7xl mx-auto px-4 py-6 md:py-8">
        <div className="grid md:grid-cols-2 gap-4 md:gap-6 max-w-5xl mx-auto animate-fade-in">
          {/* Booking Card */}
          <button
            onClick={() => onNavigate('booking')}
            className="group relative overflow-hidden rounded-3xl bg-black text-white p-8 md:p-10 text-left transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl"
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[rgb(var(--color-accent))] rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
            </div>

            <div className="relative z-10">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-[rgb(var(--color-luxury))] rounded-2xl flex items-center justify-center mb-6 md:mb-8 group-hover:rotate-12 transition-transform duration-300">
                <Calendar className="w-7 h-7 md:w-8 md:h-8 text-black" />
              </div>

              <h3 className="text-2xl md:text-3xl mb-3 md:mb-4">Agendar Serviço</h3>
              <p className="text-white/80 text-sm md:text-base mb-6 md:mb-8">
                Reserve seu horário com os melhores profissionais. Pagamento antecipado para garantir sua vaga.
              </p>

              <div className="flex items-center gap-3 text-[rgb(var(--color-accent))] font-medium">
                <span className="text-sm md:text-base">Começar agora</span>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </div>
            </div>

            {/* Hover Gradient */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[rgb(var(--color-accent))]/0 to-[rgb(var(--color-accent))]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </button>

          {/* Products Card */}
          <button
            onClick={() => onNavigate('products')}
            className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-white to-[rgb(var(--color-tertiary))] p-8 md:p-10 text-left transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl border border-black/5"
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[rgb(var(--color-accent))] rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
            </div>

            <div className="relative z-10">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-[rgb(var(--color-accent))] to-[rgb(var(--color-luxury))] rounded-2xl flex items-center justify-center mb-6 md:mb-8 group-hover:rotate-12 transition-transform duration-300">
                <ShoppingBag className="w-7 h-7 md:w-8 md:h-8 text-black" />
              </div>

              <h3 className="text-2xl md:text-3xl mb-3 md:mb-4">Produtos Premium</h3>
              <p className="text-[rgb(var(--color-text-secondary))] text-sm md:text-base mb-6 md:mb-8">
                Adquira os mesmos produtos profissionais que usamos no salão. Qualidade garantida.
              </p>

              <div className="flex items-center gap-3 text-black font-medium">
                <span className="text-sm md:text-base">Explorar loja</span>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Featured Services - Carousel Style */}
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        <div className="flex items-center justify-between mb-6 md:mb-8">
          <div>
            <h2 className="text-2xl md:text-4xl mb-2">Serviços em Destaque</h2>
            <p className="text-sm md:text-base text-[rgb(var(--color-text-secondary))]">
              Nossos serviços mais procurados
            </p>
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-4 md:gap-6">
          {/* Service Card 1 */}
          <div 
            onClick={() => onNavigate('booking')}
            className="group cursor-pointer animate-fade-in"
          >
            <div className="relative overflow-hidden rounded-2xl md:rounded-3xl mb-4 aspect-[4/5]">
              <img
                src="https://romconcept.com.br/wp-content/uploads/2024/04/galeria-rom-concept-11-scaled.webp"
                alt="Corte Premium"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
              
              <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 text-white">
                <div className="text-xs md:text-sm font-medium mb-2 text-[rgb(var(--color-accent))]">
                  MAIS POPULAR
                </div>
                <h4 className="text-xl md:text-2xl mb-2">Corte Premium</h4>
                <p className="text-sm text-white/80 mb-3">
                  Corte personalizado com consulta de estilo incluída
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-lg md:text-xl font-semibold">A partir de R$ 800</span>
                  <div className="w-10 h-10 bg-[rgb(var(--color-accent))] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <ChevronRight className="w-5 h-5 text-black" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Service Card 2 */}
          <div 
            onClick={() => onNavigate('booking')}
            className="group cursor-pointer animate-fade-in"
          >
            <div className="relative overflow-hidden rounded-2xl md:rounded-3xl mb-4 aspect-[4/5]">
              <img
                src="https://lgfrnhhlutwahptczwko.supabase.co/storage/v1/object/sign/Feminino/coloracao-completa.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mNjA0NDY4Ny01ZjFhLTQwMDYtOGMzMC0zYTkxYmE5MjRkYmEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJGZW1pbmluby9jb2xvcmFjYW8tY29tcGxldGEucG5nIiwiaWF0IjoxNzcyMDQwMTMwLCJleHAiOjE4MDM1NzYxMzB9.jIQRwfkNK4C6M08QK3LguAOI_G0jnJaDP_xUD2o7Bz4"
                alt="Coloração"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
              
              <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 text-white">
                <div className="text-xs md:text-sm font-medium mb-2 text-[rgb(var(--color-accent))]">
                  EXCLUSIVO
                </div>
                <h4 className="text-xl md:text-2xl mb-2">Coloração Premium</h4>
                <p className="text-sm text-white/80 mb-3">
                  Técnicas avançadas com produtos importados
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-lg md:text-xl font-semibold">A partir de R$ 1.200</span>
                  <div className="w-10 h-10 bg-[rgb(var(--color-accent))] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <ChevronRight className="w-5 h-5 text-black" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Service Card 3 */}
          <div 
            onClick={() => onNavigate('booking')}
            className="group cursor-pointer animate-fade-in"
          >
            <div className="relative overflow-hidden rounded-2xl md:rounded-3xl mb-4 aspect-[4/5]">
              <img
                src="https://lgfrnhhlutwahptczwko.supabase.co/storage/v1/object/sign/Feminino/hidratacao-premium.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mNjA0NDY4Ny01ZjFhLTQwMDYtOGMzMC0zYTkxYmE5MjRkYmEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJGZW1pbmluby9oaWRyYXRhY2FvLXByZW1pdW0ucG5nIiwiaWF0IjoxNzcyMDQwMTUzLCJleHAiOjE4MDM1NzYxNTN9.FXjXBVS_4Ir_EQs72lLbX5tcMeLgOwzVqVNTjoalz94"
                alt="Tratamentos"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
              
              <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 text-white">
                <div className="text-xs md:text-sm font-medium mb-2 text-[rgb(var(--color-accent))]">
                  TRATAMENTO
                </div>
                <h4 className="text-xl md:text-2xl mb-2">Hidratação Profunda</h4>
                <p className="text-sm text-white/80 mb-3">
                  Recuperação intensiva com tecnologia avançada
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-lg md:text-xl font-semibold">A partir de R$ 600</span>
                  <div className="w-10 h-10 bg-[rgb(var(--color-accent))] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <ChevronRight className="w-5 h-5 text-black" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section - Refined */}
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        <h2 className="text-2xl md:text-4xl text-center mb-8 md:mb-12">Por que escolher Walter Leal?</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          <div className="group text-center p-6 md:p-8 rounded-2xl bg-white/50 backdrop-blur-sm hover:bg-white transition-all duration-300 hover:shadow-lg">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-[rgb(var(--color-accent))] to-[rgb(var(--color-luxury))] rounded-3xl flex items-center justify-center mx-auto mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300">
              <Clock className="w-8 h-8 md:w-10 md:h-10 text-black" />
            </div>
            <h4 className="text-lg md:text-xl mb-3">Agendamento Garantido</h4>
            <p className="text-sm md:text-base text-[rgb(var(--color-text-secondary))] leading-relaxed">
              Pagamento antecipado elimina no-shows e garante sua vaga nos melhores horários
            </p>
          </div>

          <div className="group text-center p-6 md:p-8 rounded-2xl bg-white/50 backdrop-blur-sm hover:bg-white transition-all duration-300 hover:shadow-lg">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-[rgb(var(--color-accent))] to-[rgb(var(--color-luxury))] rounded-3xl flex items-center justify-center mx-auto mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300">
              <Shield className="w-8 h-8 md:w-10 md:h-10 text-black" />
            </div>
            <h4 className="text-lg md:text-xl mb-3">Pagamento Seguro</h4>
            <p className="text-sm md:text-base text-[rgb(var(--color-text-secondary))] leading-relaxed">
              Transações 100% protegidas com as melhores tecnologias de segurança
            </p>
          </div>

          <div className="group text-center p-6 md:p-8 rounded-2xl bg-white/50 backdrop-blur-sm hover:bg-white transition-all duration-300 hover:shadow-lg">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-[rgb(var(--color-accent))] to-[rgb(var(--color-luxury))] rounded-3xl flex items-center justify-center mx-auto mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300">
              <Award className="w-8 h-8 md:w-10 md:h-10 text-black" />
            </div>
            <h4 className="text-lg md:text-xl mb-3">Profissionais Elite</h4>
            <p className="text-sm md:text-base text-[rgb(var(--color-text-secondary))] leading-relaxed">
              Equipe altamente qualificada com especialização internacional
            </p>
          </div>
        </div>
      </div>

      {/* Bottom CTA Section */}
      <div className="max-w-5xl mx-auto px-4 py-8 md:py-12">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-black to-[rgb(var(--color-luxury))] p-8 md:p-12 text-center text-white">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[rgb(var(--color-accent))] rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          </div>

          <div className="relative z-10">
            <Sparkles className="w-8 h-8 md:w-10 md:h-10 text-[rgb(var(--color-accent))] mx-auto mb-4 md:mb-6" />
            <h2 className="text-2xl md:text-4xl mb-3 md:mb-4">Pronto para transformar seu visual?</h2>
            <p className="text-base md:text-lg text-white/80 mb-6 md:mb-8 max-w-2xl mx-auto">
              Agende agora e garanta seu horário com os melhores profissionais de São Paulo
            </p>
            <button 
              onClick={() => onNavigate('booking')}
              className="btn-luxury inline-flex items-center gap-3 text-base md:text-lg px-8 py-4 bg-[rgb(var(--color-accent))] text-black hover:scale-105 transition-transform"
            >
              Agendar Agora
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}