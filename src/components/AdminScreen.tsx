import React, { useState } from 'react';
import { ArrowLeft, TrendingUp } from 'lucide-react';
import { MonthlyRevenueChart } from './admin/MonthlyRevenueChart';
import { AnnualRevenueChart } from './admin/AnnualRevenueChart';
import { HourlyRevenueChart } from './admin/HourlyRevenueChart';

interface AdminScreenProps {
  onNavigate?: (view: string) => void;
}

export function AdminScreen({ onNavigate }: AdminScreenProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'monthly' | 'annual' | 'hourly'>('overview');

  const handleBack = () => {
    if (onNavigate) {
      onNavigate('profile');
    }
  };

  return (
    <div className="min-h-screen pt-14 pb-20 md:pt-20 md:pb-8 bg-[#F5F5F5] dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 py-4 md:px-6 md:py-8">
        {/* Header */}
        <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-8">
          <button
            onClick={handleBack}
            className="text-[rgb(var(--color-text-secondary))] hover:text-black dark:hover:text-white transition-colors touch-manipulation flex-shrink-0 -mt-1"
          >
            <ArrowLeft className="w-6 h-6 md:w-5 md:h-5" />
          </button>
          <div className="flex-1">
            <h1 className="text-2xl md:text-4xl font-bold mb-1 md:mb-2 flex items-center gap-2">
              <TrendingUp className="w-7 h-7 md:w-9 md:h-9" />
              Painel de Gestão
            </h1>
            <p className="text-xs md:text-sm text-[rgb(var(--color-text-secondary))]">
              Visualize métricas e tendências do seu negócio
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mb-6 md:mb-8">
          <div className="flex gap-2 overflow-x-auto pb-2">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all font-medium flex-shrink-0 ${
                activeTab === 'overview'
                  ? 'bg-black text-white dark:bg-white dark:text-black'
                  : 'bg-white text-black dark:bg-slate-800 dark:text-white hover:bg-gray-100 dark:hover:bg-slate-700'
              }`}
            >
              Visão Geral
            </button>
            <button
              onClick={() => setActiveTab('monthly')}
              className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all font-medium flex-shrink-0 ${
                activeTab === 'monthly'
                  ? 'bg-black text-white dark:bg-white dark:text-black'
                  : 'bg-white text-black dark:bg-slate-800 dark:text-white hover:bg-gray-100 dark:hover:bg-slate-700'
              }`}
            >
              Mensal
            </button>
            <button
              onClick={() => setActiveTab('annual')}
              className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all font-medium flex-shrink-0 ${
                activeTab === 'annual'
                  ? 'bg-black text-white dark:bg-white dark:text-black'
                  : 'bg-white text-black dark:bg-slate-800 dark:text-white hover:bg-gray-100 dark:hover:bg-slate-700'
              }`}
            >
              Anual
            </button>
            <button
              onClick={() => setActiveTab('hourly')}
              className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all font-medium flex-shrink-0 ${
                activeTab === 'hourly'
                  ? 'bg-black text-white dark:bg-white dark:text-black'
                  : 'bg-white text-black dark:bg-slate-800 dark:text-white hover:bg-gray-100 dark:hover:bg-slate-700'
              }`}
            >
              Por Hora
            </button>
          </div>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8">
            {/* Gráfico Mensal */}
            <div className="md:col-span-3">
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 md:p-8 shadow-sm">
                <h2 className="text-lg md:text-2xl font-bold mb-4 md:mb-6">Faturamento Mensal</h2>
                <MonthlyRevenueChart />
              </div>
            </div>

            {/* Gráfico Anual */}
            <div className="md:col-span-2">
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 md:p-8 shadow-sm">
                <h2 className="text-lg md:text-2xl font-bold mb-4 md:mb-6">Faturamento Anual</h2>
                <AnnualRevenueChart />
              </div>
            </div>

            {/* Gráfico Horário */}
            <div className="md:col-span-1">
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 md:p-8 shadow-sm">
                <h2 className="text-lg md:text-2xl font-bold mb-4 md:mb-6">Por Hora</h2>
                <HourlyRevenueChart />
              </div>
            </div>
          </div>
        )}

        {/* Individual Views */}
        {activeTab === 'monthly' && (
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 md:p-8 shadow-sm">
            <h2 className="text-lg md:text-2xl font-bold mb-4 md:mb-6">Faturamento Mensal Detalhado</h2>
            <MonthlyRevenueChart />
          </div>
        )}

        {activeTab === 'annual' && (
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 md:p-8 shadow-sm">
            <h2 className="text-lg md:text-2xl font-bold mb-4 md:mb-6">Faturamento Anual Detalhado</h2>
            <AnnualRevenueChart />
          </div>
        )}

        {activeTab === 'hourly' && (
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 md:p-8 shadow-sm">
            <h2 className="text-lg md:text-2xl font-bold mb-4 md:mb-6">Receita por Hora Detalhado</h2>
            <HourlyRevenueChart />
          </div>
        )}
      </div>
    </div>
  );
}

