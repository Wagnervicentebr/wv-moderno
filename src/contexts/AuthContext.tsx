import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { createClient } from '../utils/supabase/client';

interface User {
  id: string;
  phone: string;
  name?: string;
  email?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (phone: string) => Promise<void>;
  verifyCode: (phone: string, code: string) => Promise<void>;
  signOut: () => Promise<void>;
  demoMode: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Demo mode - aceita qualquer código
const DEMO_MODE = true;
const DEMO_CODE = '123456';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    // Check for existing session
    checkSession();
  }, []);

  const checkSession = async () => {
    try {
      // Check localStorage for demo session
      const demoUser = localStorage.getItem('demo_user');
      if (demoUser) {
        setUser(JSON.parse(demoUser));
        setLoading(false);
        return;
      }

      if (!DEMO_MODE) {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          setUser({
            id: session.user.id,
            phone: session.user.phone || '',
            email: session.user.email,
          });
        }
      }
    } catch (error) {
      console.error('Error checking session:', error);
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (phone: string) => {
    if (DEMO_MODE) {
      // Demo mode - apenas simula envio
      console.log(`[DEMO] Código enviado para ${phone}: ${DEMO_CODE}`);
      return;
    }

    // Format phone number to E.164 format (+55...)
    const formattedPhone = phone.startsWith('+') ? phone : `+55${phone.replace(/\D/g, '')}`;
    
    const { error } = await supabase.auth.signInWithOtp({
      phone: formattedPhone,
    });

    if (error) {
      throw new Error(error.message);
    }
  };

  const verifyCode = async (phone: string, code: string) => {
    if (DEMO_MODE) {
      // Demo mode - aceita código padrão ou qualquer código de 6 dígitos
      if (code.length !== 6) {
        throw new Error('Código deve ter 6 dígitos');
      }

      const demoUser = {
        id: 'demo-user-' + Date.now(),
        phone: phone,
        name: 'Usuário Demo',
        email: 'demo@salon.com',
      };

      setUser(demoUser);
      localStorage.setItem('demo_user', JSON.stringify(demoUser));
      return;
    }

    const formattedPhone = phone.startsWith('+') ? phone : `+55${phone.replace(/\D/g, '')}`;
    
    const { data, error } = await supabase.auth.verifyOtp({
      phone: formattedPhone,
      token: code,
      type: 'sms',
    });

    if (error) {
      throw new Error(error.message);
    }

    if (data.user) {
      setUser({
        id: data.user.id,
        phone: data.user.phone || '',
        email: data.user.email,
      });
    }
  };

  const signOut = async () => {
    if (DEMO_MODE) {
      localStorage.removeItem('demo_user');
      setUser(null);
      return;
    }

    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, verifyCode, signOut, demoMode: DEMO_MODE }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}