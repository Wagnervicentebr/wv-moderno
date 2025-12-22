import React, { useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { getAnnualRevenueData } from '../../data/mockData';

export function AnnualRevenueChart() {
  const data = useMemo(() => {
    return getAnnualRevenueData();
  }, []);

  const totalRevenue = data.reduce((sum, item) => sum + item.revenue, 0);
  const maxMonth = data.reduce((prev, current) =>
    prev.revenue > current.revenue ? prev : current
  );
  const minMonth = data.reduce((prev, current) =>
    prev.revenue < current.revenue ? prev : current
  );

  const formatCurrency = (value: number) => {
    return `R$ ${(value / 1000).toFixed(0)}k`;
  };

  // Color bars based on revenue (higher = darker)
  const getBarColor = (value: number) => {
    const percentage = (value - Math.min(...data.map(d => d.revenue))) / 
                      (Math.max(...data.map(d => d.revenue)) - Math.min(...data.map(d => d.revenue)));
    
    if (percentage > 0.7) return '#000000';
    if (percentage > 0.4) return '#525252';
    return '#a3a3a3';
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-6 md:mb-8">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg md:text-xl font-semibold mb-1 md:mb-2">
              Últimos 12 Meses
            </h3>
            <p className="text-xs md:text-sm text-[rgb(var(--color-text-secondary))]">
              Tendência anual de faturamento
            </p>
          </div>
          <div className="text-right">
            <div className="text-xs md:text-sm text-[rgb(var(--color-text-secondary))] mb-1">
              Total Anual
            </div>
            <div className="text-2xl md:text-3xl font-bold">
              R$ {(totalRevenue / 1000).toFixed(1)}k
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
              dataKey="month"
              label={{ value: 'Mês', position: 'insideBottomRight', offset: -10 }}
              tick={{ fontSize: 12 }}
            />
            <YAxis
              tickFormatter={formatCurrency}
              label={{ value: 'Receita (R$)', angle: -90, position: 'insideLeft' }}
              tick={{ fontSize: 12 }}
            />
            <Tooltip
              formatter={(value: number) => `R$ ${value.toLocaleString('pt-BR', { maximumFractionDigits: 0 })}`}
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                border: '1px solid rgba(0, 0, 0, 0.1)',
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
              }}
            />
            <Bar
              dataKey="revenue"
              fill="#000000"
              radius={[8, 8, 0, 0]}
              name="Faturamento"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getBarColor(entry.revenue)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Stats */}
      <div className="mt-6 md:mt-8 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        <div className="p-3 md:p-4 bg-gray-50 dark:bg-slate-700 rounded-lg">
          <div className="text-xs md:text-sm text-[rgb(var(--color-text-secondary))] mb-1">
            Média Mensal
          </div>
          <div className="text-lg md:text-2xl font-bold">
            R$ {(totalRevenue / 12 / 1000).toFixed(1)}k
          </div>
        </div>
        <div className="p-3 md:p-4 bg-green-50 dark:bg-slate-700 rounded-lg">
          <div className="text-xs md:text-sm text-[rgb(var(--color-text-secondary))] mb-1">
            Melhor Mês
          </div>
          <div className="text-lg md:text-2xl font-bold">
            {maxMonth.month}
          </div>
          <div className="text-xs text-green-600">
            R$ {(maxMonth.revenue / 1000).toFixed(1)}k
          </div>
        </div>
        <div className="p-3 md:p-4 bg-red-50 dark:bg-slate-700 rounded-lg">
          <div className="text-xs md:text-sm text-[rgb(var(--color-text-secondary))] mb-1">
            Pior Mês
          </div>
          <div className="text-lg md:text-2xl font-bold">
            {minMonth.month}
          </div>
          <div className="text-xs text-red-600">
            R$ {(minMonth.revenue / 1000).toFixed(1)}k
          </div>
        </div>
        <div className="p-3 md:p-4 bg-blue-50 dark:bg-slate-700 rounded-lg">
          <div className="text-xs md:text-sm text-[rgb(var(--color-text-secondary))] mb-1">
            Crescimento
          </div>
          <div className="text-lg md:text-2xl font-bold text-blue-600">
            {((maxMonth.revenue - minMonth.revenue) / minMonth.revenue * 100).toFixed(0)}%
          </div>
        </div>
      </div>
    </div>
  );
}

