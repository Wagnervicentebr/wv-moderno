import React, { useMemo } from 'react';
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
  LineChart,
  Line,
} from 'recharts';
import { ShoppingBag } from 'lucide-react';
import { getProductSalesData } from '../../data/mockData';

export function ProductSalesChart() {
  const data = useMemo(() => {
    return getProductSalesData();
  }, []);

  const totalSales = data.reduce((sum, item) => sum + item.sales, 0);
  const totalRevenue = data.reduce((sum, item) => sum + item.revenue, 0);
  const topProduct = data.reduce((prev, current) =>
    prev.revenue > current.revenue ? prev : current
  );

  const formatCurrency = (value: number) => {
    return `R$ ${(value / 1000).toFixed(0)}k`;
  };

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
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <ShoppingBag className="w-6 h-6 text-blue-600 dark:text-blue-300" />
            </div>
            <div>
              <h3 className="text-lg md:text-xl font-semibold">
                Vendas de Produtos
              </h3>
              <p className="text-xs md:text-sm text-[rgb(var(--color-text-secondary))]">
                Performance mensal por produto
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs md:text-sm text-[rgb(var(--color-text-secondary))] mb-1">
              Total de Vendas
            </div>
            <div className="text-2xl md:text-3xl font-bold">
              {totalSales}
            </div>
            <div className="text-xs text-blue-600 dark:text-blue-300">
              R$ {(totalRevenue / 1000).toFixed(1)}k
            </div>
          </div>
        </div>
      </div>

      {/* Gráfico de Barras - Vendas */}
      <div className="mb-8">
        <h4 className="text-sm md:text-base font-semibold mb-4">Unidades Vendidas</h4>
        <div className="w-full h-80 md:h-96">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
              <XAxis
                dataKey="name"
                angle={-45}
                textAnchor="end"
                height={100}
                tick={{ fontSize: 12 }}
              />
              <YAxis
                label={{ value: 'Unidades', angle: -90, position: 'insideLeft' }}
                tick={{ fontSize: 12 }}
              />
              <Tooltip
                formatter={(value: number) => `${value} unidades`}
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: '1px solid rgba(0, 0, 0, 0.1)',
                  borderRadius: '8px',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
                }}
              />
              <Bar
                dataKey="sales"
                fill="#000000"
                radius={[8, 8, 0, 0]}
                name="Vendas"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getBarColor(entry.sales * 200)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Gráfico de Barras - Receita */}
      <div className="mb-8">
        <h4 className="text-sm md:text-base font-semibold mb-4">Receita por Produto</h4>
        <div className="w-full h-80 md:h-96">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
              <XAxis
                dataKey="name"
                angle={-45}
                textAnchor="end"
                height={100}
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
                name="Receita"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getBarColor(entry.revenue)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 md:p-6 bg-green-50 dark:bg-slate-700 rounded-lg">
          <div className="text-xs md:text-sm text-[rgb(var(--color-text-secondary))] mb-2">
            🏆 Produto Mais Vendido
          </div>
          <div className="text-base md:text-lg font-bold mb-1">
            {topProduct.name}
          </div>
          <div className="text-sm text-green-600 dark:text-green-400">
            {topProduct.sales} unidades • R$ {topProduct.revenue.toLocaleString('pt-BR', { maximumFractionDigits: 0 })}
          </div>
        </div>

        <div className="p-4 md:p-6 bg-blue-50 dark:bg-slate-700 rounded-lg">
          <div className="text-xs md:text-sm text-[rgb(var(--color-text-secondary))] mb-2">
            📊 Ticket Médio
          </div>
          <div className="text-base md:text-lg font-bold mb-1">
            R$ {Math.round(totalRevenue / totalSales).toLocaleString('pt-BR')}
          </div>
          <div className="text-sm text-blue-600 dark:text-blue-400">
            por unidade vendida
          </div>
        </div>
      </div>
    </div>
  );
}

