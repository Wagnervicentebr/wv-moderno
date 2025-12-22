import React, { useState, useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getMonthlyRevenueData } from '../../data/mockData';

export function MonthlyRevenueChart() {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const data = useMemo(() => {
    return getMonthlyRevenueData();
  }, []);

  const monthName = currentMonth.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
  
  // Calculate totals
  const totalRevenue = data.reduce((sum, item) => sum + item.revenue, 0);
  const previousTotalRevenue = data.reduce((sum, item) => sum + (item.previousMonthRevenue || 0), 0);
  const percentageChange = ((totalRevenue - previousTotalRevenue) / previousTotalRevenue) * 100;

  const handlePreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const formatCurrency = (value: number) => {
    return `R$ ${(value / 1000).toFixed(1)}k`;
  };

  const colors = {
    current: 'rgb(0, 0, 0)',
    previous: 'rgb(229, 231, 235)',
  };

  return (
    <div className="w-full">
      {/* Header com navegação */}
      <div className="mb-6 md:mb-8">
        <div className="flex items-center justify-between mb-3 md:mb-4">
          <div className="flex items-center gap-2 md:gap-4">
            <button
              onClick={handlePreviousMonth}
              className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors touch-manipulation"
              aria-label="Mês anterior"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h3 className="text-lg md:text-xl font-semibold capitalize min-w-[180px]">
              {monthName}
            </h3>
            <button
              onClick={handleNextMonth}
              className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors touch-manipulation"
              aria-label="Próximo mês"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
          <div className="text-right">
            <div className="text-xs md:text-sm text-[rgb(var(--color-text-secondary))] mb-1">
              Total do mês
            </div>
            <div className="text-xl md:text-3xl font-bold">
              R$ {(totalRevenue / 1000).toFixed(1)}k
            </div>
            <div className={`text-xs md:text-sm ${percentageChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {percentageChange >= 0 ? '+' : ''}{percentageChange.toFixed(1)}% vs anterior
            </div>
          </div>
        </div>
      </div>

      {/* Gráfico */}
      <div className="w-full" style={{ height: '400px', minHeight: '400px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
            <XAxis
              dataKey="day"
              label={{ value: 'Dia do Mês', position: 'insideBottomRight', offset: -10 }}
              tick={{ fontSize: 12 }}
            />
            <YAxis
              tickFormatter={formatCurrency}
              label={{ value: 'Receita (R$)', angle: -90, position: 'insideLeft' }}
              tick={{ fontSize: 12 }}
            />
            <Tooltip
              formatter={(value: number) => `R$ ${value.toLocaleString('pt-BR', { maximumFractionDigits: 0 })}`}
              labelFormatter={(label: number) => `Dia ${label}`}
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                border: '1px solid rgba(0, 0, 0, 0.1)',
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
              }}
            />
            <Legend wrapperStyle={{ paddingTop: '20px' }} />
            <Bar
              dataKey="revenue"
              fill={colors.current}
              name="Receita Atual"
              radius={[8, 8, 0, 0]}
            />
            <Bar
              dataKey="previousMonthRevenue"
              fill={colors.previous}
              name="Mês Anterior"
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Footer com insights */}
      <div className="mt-6 md:mt-8 p-4 md:p-6 bg-blue-50 dark:bg-slate-700 rounded-lg">
        <h4 className="font-semibold mb-2 md:mb-3 text-sm md:text-base">💡 Insights</h4>
        <ul className="text-xs md:text-sm text-[rgb(var(--color-text-secondary))] space-y-1 md:space-y-2">
          <li>• Receita média por dia: R$ {(totalRevenue / data.length).toLocaleString('pt-BR', { maximumFractionDigits: 0 })}</li>
          <li>• Maior receita do mês: R$ {Math.max(...data.map(d => d.revenue)).toLocaleString('pt-BR', { maximumFractionDigits: 0 })}</li>
          <li>• Menor receita do mês: R$ {Math.min(...data.map(d => d.revenue)).toLocaleString('pt-BR', { maximumFractionDigits: 0 })}</li>
        </ul>
      </div>
    </div>
  );
}

