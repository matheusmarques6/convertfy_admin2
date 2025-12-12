'use client';

import * as React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';
import { formatCurrency } from '@/lib/utils';

interface ChartData {
  name: string;
  value: number;
  previousValue?: number;
}

interface RevenueChartProps {
  data: ChartData[];
  title?: string;
}

export const RevenueChart: React.FC<RevenueChartProps> = ({ data, title }) => {
  return (
    <div className="bg-surface border border-border rounded-xl p-5">
      {title && (
        <h3 className="text-lg font-semibold text-text-primary mb-4">{title}</h3>
      )}
      <div className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorPrevious" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#06B6D4" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#27272A" vertical={false} />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#71717A', fontSize: 12 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#71717A', fontSize: 12 }}
              tickFormatter={(value) => `R$${(value / 1000).toFixed(0)}k`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1C1C1F',
                border: '1px solid #27272A',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.3)',
              }}
              labelStyle={{ color: '#FAFAFA', fontWeight: 600 }}
              formatter={(value: number) => [formatCurrency(value), 'Valor']}
            />
            {data[0]?.previousValue !== undefined && (
              <Area
                type="monotone"
                dataKey="previousValue"
                stroke="#06B6D4"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorPrevious)"
                name="Mês anterior"
              />
            )}
            <Area
              type="monotone"
              dataKey="value"
              stroke="#8B5CF6"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorRevenue)"
              name="Este mês"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

interface FunnelChartProps {
  data: Array<{ name: string; value: number; color?: string }>;
  title?: string;
}

export const FunnelChart: React.FC<FunnelChartProps> = ({ data, title }) => {
  return (
    <div className="bg-surface border border-border rounded-xl p-5">
      {title && (
        <h3 className="text-lg font-semibold text-text-primary mb-4">{title}</h3>
      )}
      <div className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ top: 10, right: 10, left: 80, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#27272A" horizontal={false} />
            <XAxis
              type="number"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#71717A', fontSize: 12 }}
            />
            <YAxis
              type="category"
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#A1A1AA', fontSize: 12 }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1C1C1F',
                border: '1px solid #27272A',
                borderRadius: '8px',
              }}
              labelStyle={{ color: '#FAFAFA', fontWeight: 600 }}
            />
            <Bar
              dataKey="value"
              radius={[0, 4, 4, 0]}
              fill="url(#barGradient)"
            />
            <defs>
              <linearGradient id="barGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#8B5CF6" />
                <stop offset="100%" stopColor="#06B6D4" />
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
