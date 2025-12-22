import React, { useMemo } from 'react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
  ComposedChart,
} from 'recharts';
import { Calendar } from 'lucide-react';
import { getMonthlyBookingsData } from '../../data/mockData';

export function BookingsChart() {
  const data = useMemo(() => {
    return getMonthlyBookingsData();
  }, []);

  const totalBookings = data.reduce((sum, item) => sum + item.bookings, 0);
  const totalCompleted = data.reduce((sum, item) => sum + item.completed, 0);
  const completionRate = ((totalCompleted / totalBookings) * 100).toFixed(1);

  const formatTooltip = (value: number) => {
    return `${value} agendamentos`;
  };

  const getAreaColor = (value: number) => {
    const percentage = (value - Math.min(...data.map(d => d.bookings))) / 
                      (Math.max(...data.map(d => d.bookings)) - Math.min(...data.map(d => d.bookings)));
    
    if (percentage > 0.7) return '#000000';
    if (percentage > 0.4) return '#525252';
    return '#a3a3a3';
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-6 md:mb-8">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
              <Calendar className="w-6 h-6 text-purple-600 dark:text-purple-300" />
            </div>
            <div>
              <h3 className="text-lg md:text-xl font-semibold">
                Agendamentos do Mês
              </h3>
              <p className="text-xs md:text-sm text-[rgb(var(--color-text-secondary))]">
                Taxa de ocupação e confirmações
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs md:text-sm text-[rgb(var(--color-text-secondary))] mb-1">
              Total de Agendamentos
            </div>
            <div className="text-2xl md:text-3xl font-bold">
              {totalBookings}
            </div>
            <div className="text-xs text-purple-600 dark:text-purple-300">
              {totalCompleted} realizados ({completionRate}%)
            </div>
          </div>
        </div>
      </div>

      {/* Gráfico Combinado - Agendamentos e Realizados */}
      <div className="w-full h-80 md:h-96 mb-8">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={data}
            margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
            <XAxis
              dataKey="day"
              label={{ value: 'Dia do Mês', position: 'insideBottomRight', offset: -10 }}
              tick={{ fontSize: 12 }}
            />
            <YAxis
              label={{ value: 'Agendamentos', angle: -90, position: 'insideLeft' }}
              tick={{ fontSize: 12 }}
            />
            <Tooltip
              formatter={formatTooltip}
              labelFormatter={(label: number) => `Dia ${label}`}
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                border: '1px solid rgba(0, 0, 0, 0.1)',
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
              }}
            />
            <Legend wrapperStyle={{ paddingTop: '20px' }} />
            <Area
              type="monotone"
              dataKey="bookings"
              fill="rgba(0, 0, 0, 0.1)"
              stroke="#000000"
              name="Total Agendado"
              radius={[8, 8, 0, 0]}
              strokeWidth={2}
            />
            <Bar
              dataKey="completed"
              fill="#a3a3a3"
              name="Realizados"
              radius={[4, 4, 0, 0]}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        <div className="p-3 md:p-4 bg-gray-50 dark:bg-slate-700 rounded-lg">
          <div className="text-xs md:text-sm text-[rgb(var(--color-text-secondary))] mb-1">
            Média Diária
          </div>
          <div className="text-lg md:text-2xl font-bold">
            {Math.round(totalBookings / data.length)}
          </div>
          <div className="text-xs text-[rgb(var(--color-text-secondary))]">
            agendamentos/dia
          </div>
        </div>

        <div className="p-3 md:p-4 bg-green-50 dark:bg-slate-700 rounded-lg">
          <div className="text-xs md:text-sm text-[rgb(var(--color-text-secondary))] mb-1">
            Taxa de Realização
          </div>
          <div className="text-lg md:text-2xl font-bold text-green-600 dark:text-green-400">
            {completionRate}%
          </div>
          <div className="text-xs text-green-600 dark:text-green-400">
            do total agendado
          </div>
        </div>

        <div className="p-3 md:p-4 bg-blue-50 dark:bg-slate-700 rounded-lg">
          <div className="text-xs md:text-sm text-[rgb(var(--color-text-secondary))] mb-1">
            Dia com Pico
          </div>
          <div className="text-lg md:text-2xl font-bold">
            Dia {data.reduce((prev, current) =>
              prev.bookings > current.bookings ? prev : current
            ).day}
          </div>
          <div className="text-xs text-blue-600 dark:text-blue-400">
            {data.reduce((prev, current) =>
              prev.bookings > current.bookings ? prev : current
            ).bookings} agendamentos
          </div>
        </div>

        <div className="p-3 md:p-4 bg-yellow-50 dark:bg-slate-700 rounded-lg">
          <div className="text-xs md:text-sm text-[rgb(var(--color-text-secondary))] mb-1">
            Não Realizados
          </div>
          <div className="text-lg md:text-2xl font-bold text-yellow-600 dark:text-yellow-400">
            {totalBookings - totalCompleted}
          </div>
          <div className="text-xs text-yellow-600 dark:text-yellow-400">
            {((( totalBookings - totalCompleted) / totalBookings) * 100).toFixed(0)}% de taxa de falta
          </div>
        </div>
      </div>

      {/* Insights */}
      <div className="mt-6 md:mt-8 p-4 md:p-6 bg-blue-50 dark:bg-slate-700 rounded-lg">
        <h4 className="font-semibold mb-3 text-sm md:text-base">💡 Insights</h4>
        <ul className="text-xs md:text-sm text-[rgb(var(--color-text-secondary))] space-y-2">
          <li>
            • Sua ocupação está em <span className="font-semibold text-blue-600 dark:text-blue-300">{completionRate}%</span> - 
            {parseFloat(completionRate) >= 85 ? 'Excelente taxa de confirmação! 🎯' : 'Há espaço para melhoria'}
          </li>
          <li>
            • Média de <span className="font-semibold">{Math.round(totalBookings / data.length)}</span> agendamentos por dia - 
            considere alocar profissionais conforme a demanda
          </li>
          <li>
            • {totalBookings - totalCompleted} agendamentos não realizados - 
            implemente lembretes para reduzir faltas
          </li>
        </ul>
      </div>
    </div>
  );
}

