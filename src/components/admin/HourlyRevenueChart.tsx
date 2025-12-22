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
import { getHourlyRevenueData } from '../../data/mockData';

export function HourlyRevenueChart() {
  const data = useMemo(() => {
    return getHourlyRevenueData();
  }, []);

  const totalRevenue = data.reduce((sum, item) => sum + item.revenue, 0);
  const peakHour = data.reduce((prev, current) =>
    prev.revenue > current.revenue ? prev : current
  );
  const peakIndex = data.findIndex(item => item.hour === peakHour.hour);

  const formatCurrency = (value: number) => {
    return `R$ ${value}`;
  };

  // Color bars - highlight peak hours
  const getBarColor = (hour: string) => {
    if (hour === peakHour.hour) return '#000000';
    if (['11:00', '15:00', '18:00'].includes(hour)) return '#525252';
    return '#d4d4d8';
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-6 md:mb-8">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg md:text-xl font-semibold mb-1 md:mb-2">
              Distribuição por Hora
            </h3>
            <p className="text-xs md:text-sm text-[rgb(var(--color-text-secondary))]">
              Horário de funcionamento: 9:00 às 19:00
            </p>
          </div>
          <div className="text-right">
            <div className="text-xs md:text-sm text-[rgb(var(--color-text-secondary))] mb-1">
              Pico
            </div>
            <div className="text-xl md:text-2xl font-bold">
              {peakHour.hour}
            </div>
            <div className="text-xs md:text-sm text-[rgb(var(--color-text-secondary))]">
              R$ {peakHour.revenue.toLocaleString('pt-BR')}
            </div>
          </div>
        </div>
      </div>

      {/* Gráfico */}
      <div className="w-full h-80 md:h-96">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
            <XAxis
              dataKey="hour"
              label={{ value: 'Horário', position: 'insideBottomRight', offset: -10 }}
              tick={{ fontSize: 12 }}
            />
            <YAxis
              tickFormatter={formatCurrency}
              label={{ value: 'Receita (R$)', angle: -90, position: 'insideLeft' }}
              tick={{ fontSize: 12 }}
            />
            <Tooltip
              formatter={(value: number) => `R$ ${value.toLocaleString('pt-BR')}`}
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
              name="Receita"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getBarColor(entry.hour)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Stats */}
      <div className="mt-6 md:mt-8 space-y-3 md:space-y-4">
        <div className="p-3 md:p-4 bg-gray-50 dark:bg-slate-700 rounded-lg">
          <div className="text-xs md:text-sm text-[rgb(var(--color-text-secondary))] mb-1">
            Receita Total Diária
          </div>
          <div className="text-2xl md:text-3xl font-bold">
            R$ {totalRevenue.toLocaleString('pt-BR', { maximumFractionDigits: 0 })}
          </div>
        </div>

        <div className="p-3 md:p-4 bg-blue-50 dark:bg-slate-700 rounded-lg">
          <div className="text-xs md:text-sm text-[rgb(var(--color-text-secondary))] mb-2">
            📊 Horários de Pico
          </div>
          <div className="text-sm text-[rgb(var(--color-text-secondary))]">
            As melhores horas para agendamentos são:
          </div>
          <div className="mt-2 space-y-1">
            {data
              .sort((a, b) => b.revenue - a.revenue)
              .slice(0, 3)
              .map((item, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <span className="text-sm font-medium">{item.hour}</span>
                  <span className="text-xs text-[rgb(var(--color-text-secondary))]">
                    R$ {item.revenue.toLocaleString('pt-BR')}
                  </span>
                </div>
              ))}
          </div>
        </div>

        <div className="p-3 md:p-4 bg-yellow-50 dark:bg-slate-700 rounded-lg">
          <div className="text-xs md:text-sm text-[rgb(var(--color-text-secondary))] mb-2">
            💡 Dica
          </div>
          <div className="text-xs md:text-sm text-[rgb(var(--color-text-secondary))]">
            A receita média por hora é de <span className="font-semibold">R$ {Math.round(totalRevenue / data.length).toLocaleString('pt-BR')}</span>. Considere alocar mais profissionais nos horários de pico.
          </div>
        </div>
      </div>
    </div>
  );
}

