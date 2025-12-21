import React, { useState } from 'react';
import { Phone, ArrowRight, Info } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import barberImage from '../assets/walter.png';

interface LoginScreenProps {
  onSuccess: () => void;
}

export function LoginScreen({ onSuccess }: LoginScreenProps) {
  const [step, setStep] = useState<'phone' | 'code'>('phone');
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [canResend, setCanResend] = useState(false);
  const { signIn, verifyCode, demoMode } = useAuth();

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 11) {
      return numbers.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }
    return value;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value);
    setPhone(formatted);
    setError('');
  };

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const cleanPhone = phone.replace(/\D/g, '');
      if (cleanPhone.length !== 11) {
        throw new Error('Número de telefone inválido');
      }

      await signIn(cleanPhone);
      setStep('code');
      
      // Enable resend after 60 seconds
      setTimeout(() => setCanResend(true), 60000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao enviar código');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const cleanPhone = phone.replace(/\D/g, '');
      await verifyCode(cleanPhone, code);
      onSuccess();
    } catch (err) {
      setError('Código inválido ou expirado');
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (!canResend) return;
    
    setCanResend(false);
    setError('');
    
    try {
      const cleanPhone = phone.replace(/\D/g, '');
      await signIn(cleanPhone);
      setTimeout(() => setCanResend(true), 60000);
    } catch (err) {
      setError('Erro ao reenviar código');
    }
  };

  return (
    <>
      {/* MOBILE DESIGN - Background com foto do barbeiro */}
      <div className="md:hidden min-h-screen flex flex-col relative overflow-hidden">
        {/* Background Image com Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={barberImage}
            alt="Walter Leal"
            className="w-full h-full object-cover"
            style={{ objectPosition: '50% 20%' }}
          />
          {/* Gradient Overlay - Mais sutil para mostrar a foto */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-white/80"></div>
        </div>

        {/* Content Container */}
        <div className="relative z-10 flex-1 flex flex-col justify-end pb-4">
          {/* Form Card - Flutua sobre a imagem com transparência */}
          <div className="px-4">
            <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-6 animate-fade-in border border-white/50">
              {/* Phone Step */}
              {step === 'phone' && (
                <form onSubmit={handleSendCode} className="space-y-4">
                  <div className="text-center mb-1">
                    <h2 className="text-2xl font-semibold mb-1 text-gray-900">Bem-vindo</h2>
                    <p className="text-sm text-gray-700">
                      Entre com seu telefone para continuar
                    </p>
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium mb-2 text-gray-900">
                      Número de telefone
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600" />
                      <input
                        id="phone"
                        type="tel"
                        value={phone}
                        onChange={handlePhoneChange}
                        placeholder="(11) 98765-4321"
                        className="input-primary pl-12 text-base bg-white text-gray-900 placeholder:text-gray-400"
                        required
                        autoFocus
                      />
                    </div>
                    <p className="text-xs text-gray-600 mt-2">
                      {demoMode ? 'Use qualquer número para teste' : 'Você receberá um código via SMS'}
                    </p>
                  </div>

                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading || phone.replace(/\D/g, '').length !== 11}
                    className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-base py-4"
                  >
                    {loading ? 'Enviando...' : 'Continuar'}
                    <ArrowRight className="w-5 h-5" />
                  </button>

                  <p className="text-xs text-center text-gray-600 pt-1">
                    Ao continuar, você concorda com nossos{' '}
                    <span className="underline">Termos de Uso</span> e{' '}
                    <span className="underline">Política de Privacidade</span>
                  </p>
                </form>
              )}

              {/* Code Verification Step */}
              {step === 'code' && (
                <form onSubmit={handleVerifyCode} className="space-y-4">
                  <div className="text-center mb-1">
                    <h2 className="text-2xl font-semibold mb-1 text-gray-900">Verificação</h2>
                    <p className="text-sm text-gray-700">
                      Digite o código enviado para<br />
                      <strong className="text-gray-900">{phone}</strong>
                    </p>
                  </div>

                  {demoMode && (
                    <div className="bg-gradient-to-r from-[rgb(var(--color-accent))]/10 to-[rgb(var(--color-luxury))]/10 border border-[rgb(var(--color-accent))]/20 rounded-xl text-center p-4">
                      <div className="text-xs mb-2 text-gray-700">Código de demonstração:</div>
                      <div className="text-3xl font-mono font-bold tracking-widest text-gray-900">123456</div>
                    </div>
                  )}

                  <div>
                    <label htmlFor="code" className="block text-sm font-medium mb-2 text-center text-gray-900">
                      Código de verificação
                    </label>
                    <input
                      id="code"
                      type="text"
                      value={code}
                      onChange={(e) => {
                        setCode(e.target.value.replace(/\D/g, '').slice(0, 6));
                        setError('');
                      }}
                      placeholder="000000"
                      className="input-primary text-center text-2xl tracking-[0.5em] font-mono bg-white text-gray-900 placeholder:text-gray-400"
                      required
                      autoFocus
                      maxLength={6}
                    />
                  </div>

                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading || code.length !== 6}
                    className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed text-base py-4"
                  >
                    {loading ? 'Verificando...' : 'Verificar código'}
                  </button>

                  <div className="text-center flex items-center justify-center gap-3 text-sm pt-1">
                    <button
                      type="button"
                      onClick={() => setStep('phone')}
                      className="text-gray-700 hover:text-gray-900 transition-colors font-medium"
                    >
                      Alterar número
                    </button>
                    {canResend && (
                      <>
                        <span className="text-gray-600">•</span>
                        <button
                          type="button"
                          onClick={handleResendCode}
                          className="text-gray-700 hover:text-gray-900 transition-colors font-medium"
                        >
                          Reenviar código
                        </button>
                      </>
                    )}
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* DESKTOP DESIGN - Design original com gradient */}
      <div className="hidden md:flex min-h-screen flex-col bg-gradient-to-br from-white via-[rgb(var(--color-tertiary))] to-[rgb(var(--color-tertiary-dark))]">
        {/* Main Content */}
        <div className="flex-1 flex flex-col items-center justify-center px-6 pb-12">
          <div className="w-full max-w-md animate-fade-in">
            {/* Brand Hero */}
            <div className="text-center mb-12">
              {/* Brand Name */}
              <div className="mb-4">
                <h1 className="text-6xl font-black tracking-tight mb-2">
                  WV
                </h1>
                <p className="text-3xl font-serif italic text-[rgb(var(--color-text-secondary))]">
                  Walter Leal
                </p>
              </div>

              {/* Tagline */}
              <p className="text-base text-[rgb(var(--color-text-secondary))]">
                Beleza autêntica, conceito premium
              </p>
            </div>

            {/* Form Card */}
            <div className="card bg-white shadow-2xl p-8">
              {/* Phone Step */}
              {step === 'phone' && (
                <form onSubmit={handleSendCode} className="space-y-6">
                  <div className="text-center mb-4">
                    <h2 className="text-2xl font-semibold mb-2">Bem-vindo</h2>
                    <p className="text-sm text-[rgb(var(--color-text-secondary))]">
                      Entre com seu telefone para continuar
                    </p>
                  </div>

                  <div>
                    <label htmlFor="phone-desktop" className="block text-sm font-medium mb-2">
                      Número de telefone
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[rgb(var(--color-text-secondary))]" />
                      <input
                        id="phone-desktop"
                        type="tel"
                        value={phone}
                        onChange={handlePhoneChange}
                        placeholder="(11) 98765-4321"
                        className="input-primary pl-12 text-lg"
                        required
                        autoFocus
                      />
                    </div>
                    <p className="text-xs text-[rgb(var(--color-text-secondary))] mt-2">
                      {demoMode ? 'Use qualquer número para teste' : 'Você receberá um código via SMS'}
                    </p>
                  </div>

                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading || phone.replace(/\D/g, '').length !== 11}
                    className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-lg py-4"
                  >
                    {loading ? 'Enviando...' : 'Continuar'}
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </form>
              )}

              {/* Code Verification Step */}
              {step === 'code' && (
                <form onSubmit={handleVerifyCode} className="space-y-6">
                  <div className="text-center mb-4">
                    <h2 className="text-2xl font-semibold mb-2">Verificação</h2>
                    <p className="text-sm text-[rgb(var(--color-text-secondary))]">
                      Digite o código enviado para<br />
                      <strong className="text-black">{phone}</strong>
                    </p>
                  </div>

                  {demoMode && (
                    <div className="card bg-gradient-to-r from-[rgb(var(--color-accent))]/10 to-[rgb(var(--color-luxury))]/10 border border-[rgb(var(--color-accent))]/20 text-center p-4">
                      <div className="text-xs mb-2 text-[rgb(var(--color-text-secondary))]">Código de demonstração:</div>
                      <div className="text-3xl font-mono font-bold tracking-widest">123456</div>
                    </div>
                  )}

                  <div>
                    <label htmlFor="code-desktop" className="block text-sm font-medium mb-2 text-center">
                      Código de verificação
                    </label>
                    <input
                      id="code-desktop"
                      type="text"
                      value={code}
                      onChange={(e) => {
                        setCode(e.target.value.replace(/\D/g, '').slice(0, 6));
                        setError('');
                      }}
                      placeholder="000000"
                      className="input-primary text-center text-3xl tracking-[0.5em] font-mono"
                      required
                      autoFocus
                      maxLength={6}
                    />
                  </div>

                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading || code.length !== 6}
                    className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed text-lg py-4"
                  >
                    {loading ? 'Verificando...' : 'Verificar código'}
                  </button>

                  <div className="text-center flex items-center justify-center gap-3 text-sm">
                    <button
                      type="button"
                      onClick={() => setStep('phone')}
                      className="text-[rgb(var(--color-text-secondary))] hover:text-black transition-colors"
                    >
                      Alterar número
                    </button>
                    {canResend && (
                      <>
                        <span className="text-[rgb(var(--color-text-secondary))]">•</span>
                        <button
                          type="button"
                          onClick={handleResendCode}
                          className="text-[rgb(var(--color-text-secondary))] hover:text-black transition-colors"
                        >
                          Reenviar código
                        </button>
                      </>
                    )}
                  </div>
                </form>
              )}
            </div>

            {/* Footer */}
            <div className="mt-8 text-center space-y-4">
              {/* Demo Mode Banner */}
              {demoMode && (
                <div className="card p-4 bg-gradient-to-r from-[rgb(var(--color-accent))]/10 to-[rgb(var(--color-luxury))]/10 border border-[rgb(var(--color-accent))]/20">
                  <div className="flex items-start gap-3">
                    <Info className="w-5 h-5 flex-shrink-0 mt-0.5 text-[rgb(var(--color-accent))]" />
                    <div className="text-sm">
                      <div className="font-semibold mb-1">Modo Demonstração</div>
                      <div className="text-xs text-[rgb(var(--color-text-secondary))]">
                        Use qualquer telefone e o código <strong className="text-black">123456</strong> para acessar
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <p className="text-xs text-[rgb(var(--color-text-secondary))]">
                Ao continuar, você concorda com nossos<br />
                <span className="underline">Termos de Uso</span> e <span className="underline">Política de Privacidade</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}