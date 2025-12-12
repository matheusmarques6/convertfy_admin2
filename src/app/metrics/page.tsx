'use client';

import * as React from 'react';
import { MainLayout } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { cn, formatCurrency, formatNumber } from '@/lib/utils';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  ShoppingCart,
  Users,
  Target,
  MousePointer,
  Eye,
  Mail,
  RefreshCw,
  Facebook,
  Instagram,
  ChevronDown,
} from 'lucide-react';

const revenueData = [
  { date: '16/11', receita: 12500, custos: 8200, marketing: 2100, impostos: 580 },
  { date: '17/11', receita: 14200, custos: 9100, marketing: 2400, impostos: 620 },
  { date: '18/11', receita: 16800, custos: 11200, marketing: 2800, impostos: 710 },
  { date: '19/11', receita: 15400, custos: 10300, marketing: 2600, impostos: 680 },
  { date: '20/11', receita: 17200, custos: 11800, marketing: 2900, impostos: 740 },
  { date: '21/11', receita: 14800, custos: 9600, marketing: 2300, impostos: 650 },
  { date: '22/11', receita: 16100, custos: 10800, marketing: 2700, impostos: 700 },
];

const channelData = [
  { name: 'Meta Ads', value: 58, color: '#8B5CF6' },
  { name: 'Google Ads', value: 22, color: '#3B82F6' },
  { name: 'Email', value: 12, color: '#06B6D4' },
  { name: 'Orgânico', value: 8, color: '#10B981' },
];

interface MetricBoxProps {
  title: string;
  value: string | number;
  change?: number;
  icon: React.ReactNode;
  iconBg: string;
  highlighted?: boolean;
  subtitle?: string;
}

const MetricBox: React.FC<MetricBoxProps> = ({ title, value, change, icon, iconBg, highlighted, subtitle }) => (
  <div className={cn(
    'rounded-2xl p-5 transition-all',
    highlighted 
      ? 'bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-lg shadow-emerald-500/20' 
      : 'bg-gradient-to-br from-[#18181B] to-[#1F1F23] border border-white/[0.04]'
  )}>
    <div className="flex items-start justify-between">
      <div className="flex-1">
        <p className={cn('text-sm mb-1', highlighted ? 'text-white/80' : 'text-zinc-500')}>{title}</p>
        <p className={cn('text-2xl font-bold', highlighted ? 'text-white' : 'text-white')}>
          {typeof value === 'number' ? formatCurrency(value) : value}
        </p>
        {change !== undefined && (
          <div className={cn(
            'flex items-center gap-1 mt-1.5 text-sm font-medium',
            highlighted 
              ? 'text-white/90' 
              : change >= 0 ? 'text-emerald-400' : 'text-red-400'
          )}>
            {change >= 0 ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
            {Math.abs(change)}%
          </div>
        )}
        {subtitle && (
          <p className={cn('text-xs mt-1', highlighted ? 'text-white/60' : 'text-zinc-600')}>{subtitle}</p>
        )}
      </div>
      <div className={cn(
        'w-11 h-11 rounded-xl flex items-center justify-center',
        highlighted ? 'bg-white/20' : iconBg
      )}>
        {icon}
      </div>
    </div>
  </div>
);

export default function MetricsPage() {
  const [period, setPeriod] = React.useState('month');
  const [selectedClient, setSelectedClient] = React.useState('all');

  return (
    <MainLayout>
      <div className="space-y-6 animate-fade-in-up">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-text-primary">Métricas</h1>
            <p className="text-text-muted mt-1">Performance consolidada dos clientes</p>
          </div>
          <div className="flex items-center gap-3">
            <select
              value={selectedClient}
              onChange={(e) => setSelectedClient(e.target.value)}
              className="h-10 px-4 bg-surface border border-border rounded-xl text-text-primary text-sm focus:outline-none focus:border-brand-purple/50 appearance-none cursor-pointer pr-10 bg-no-repeat bg-[right_12px_center]"
              style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%2371717A' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")` }}
            >
              <option value="all">Todos os clientes</option>
              <option value="1">Tech Store Brasil</option>
              <option value="2">Fashion Hub</option>
              <option value="3">Suplementos Pro</option>
            </select>
            
            <div className="period-filter">
              {['today', 'week', 'month', 'year'].map((p) => (
                <button
                  key={p}
                  onClick={() => setPeriod(p)}
                  className={cn('period-btn', period === p && 'active')}
                >
                  {p === 'today' ? 'Hoje' : p === 'week' ? '7 Dias' : p === 'month' ? 'Este mês' : 'Ano'}
                </button>
              ))}
            </div>
            
            <Button variant="secondary" leftIcon={<RefreshCw className="w-4 h-4" />}>
              Atualizar
            </Button>
          </div>
        </div>

        {/* Main Metrics Row */}
        <div className="grid grid-cols-4 gap-4">
          <MetricBox
            title="Receita Líquida"
            value={107310.52}
            change={15.7}
            icon={<DollarSign className="w-5 h-5 text-emerald-400" />}
            iconBg="bg-emerald-500/15"
            highlighted
          />
          <MetricBox
            title="Custo dos Produtos"
            value={42699.58}
            change={12.5}
            icon={<ShoppingCart className="w-5 h-5 text-purple-400" />}
            iconBg="bg-purple-500/15"
          />
          <MetricBox
            title="Marketing"
            value={22070.51}
            change={294.9}
            icon={<Target className="w-5 h-5 text-blue-400" />}
            iconBg="bg-blue-500/15"
            subtitle="Atualizado há 10 minutos"
          />
          <MetricBox
            title="Taxas e Impostos"
            value={4437.08}
            change={5.9}
            icon={<DollarSign className="w-5 h-5 text-amber-400" />}
            iconBg="bg-amber-500/15"
          />
        </div>

        {/* Chart and Profit Section */}
        <div className="grid grid-cols-3 gap-6">
          {/* Revenue Chart */}
          <div className="col-span-2 card-dark p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-text-primary">Resumo Financeiro</h3>
              <div className="flex items-center gap-4 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-emerald-500" />
                  <span className="text-text-muted">Receita</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-amber-500" />
                  <span className="text-text-muted">Custos</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-purple-500" />
                  <span className="text-text-muted">Marketing</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-cyan-500" />
                  <span className="text-text-muted">Impostos</span>
                </div>
              </div>
            </div>
            
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueData} barGap={2} barSize={24}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#27272A" vertical={false} />
                  <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: '#71717A', fontSize: 11 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#71717A', fontSize: 11 }} tickFormatter={(v) => `${(v/1000).toFixed(0)}K`} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1F1F23', border: '1px solid #3F3F46', borderRadius: '12px' }}
                    labelStyle={{ color: '#FAFAFA', fontWeight: 600 }}
                    formatter={(value: number) => [formatCurrency(value), '']}
                  />
                  <Bar dataKey="receita" fill="#10B981" radius={[4, 4, 0, 0]} stackId="stack" />
                  <Bar dataKey="custos" fill="#F59E0B" radius={[0, 0, 0, 0]} stackId="stack" />
                  <Bar dataKey="marketing" fill="#8B5CF6" radius={[0, 0, 0, 0]} stackId="stack" />
                  <Bar dataKey="impostos" fill="#06B6D4" radius={[0, 0, 4, 4]} stackId="stack" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Summary Stats */}
            <div className="grid grid-cols-4 gap-4 mt-4 pt-4 border-t border-border">
              <div>
                <p className="text-xs text-text-muted">Receita Bruta</p>
                <p className="text-lg font-semibold text-text-primary">{formatCurrency(166337.24)}</p>
              </div>
              <div>
                <p className="text-xs text-text-muted">Pedidos</p>
                <p className="text-lg font-semibold text-text-primary">847</p>
              </div>
              <div>
                <p className="text-xs text-text-muted">Ticket Médio</p>
                <p className="text-lg font-semibold text-text-primary">{formatCurrency(196.33)}</p>
              </div>
              <div>
                <p className="text-xs text-text-muted">Custo/Aquisição</p>
                <p className="text-lg font-semibold text-text-primary">{formatCurrency(26.05)}</p>
              </div>
            </div>
          </div>

          {/* Profit Card */}
          <div className="space-y-4">
            <div className="card-dark p-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-text-muted">Lucro Líquido</span>
                <span className="chip chip-error">-28.14%</span>
              </div>
              <p className="text-3xl font-bold text-success">{formatCurrency(38103.35)}</p>
              <p className="text-xs text-text-muted mt-1">a menos neste período</p>
              
              {/* Mini bar chart */}
              <div className="flex items-end gap-1 mt-6 h-16">
                {[40, 55, 35, 60, 45, 70, 50, 65, 55, 48, 62, 58].map((height, i) => (
                  <div
                    key={i}
                    className="flex-1 bg-emerald-500 rounded-sm transition-all hover:bg-emerald-400"
                    style={{ height: `${height}%` }}
                  />
                ))}
              </div>
            </div>

            {/* Channel Distribution */}
            <div className="card-dark p-5">
              <h3 className="font-semibold text-text-primary mb-4">Canais de Aquisição</h3>
              <div className="h-[140px] relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={channelData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={60}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {channelData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-2 mt-4">
                {channelData.map((channel) => (
                  <div key={channel.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: channel.color }} />
                      <span className="text-sm text-text-secondary">{channel.name}</span>
                    </div>
                    <span className="text-sm font-semibold text-text-primary">{channel.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Second Row Metrics */}
        <div className="grid grid-cols-5 gap-4">
          <MetricBox
            title="Anúncios"
            value={93712.80}
            change={-2}
            icon={<Target className="w-5 h-5 text-blue-400" />}
            iconBg="bg-blue-500/15"
          />
          <MetricBox
            title="CPA"
            value="R$ 25,69"
            change={-56}
            icon={<Users className="w-5 h-5 text-purple-400" />}
            iconBg="bg-purple-500/15"
          />
          <MetricBox
            title="ROI"
            value="16,8%"
            change={-160}
            icon={<TrendingUp className="w-5 h-5 text-emerald-400" />}
            iconBg="bg-emerald-500/15"
          />
          <MetricBox
            title="ROAS"
            value="116,1%"
            change={-999}
            icon={<TrendingUp className="w-5 h-5 text-cyan-400" />}
            iconBg="bg-cyan-500/15"
          />
          <MetricBox
            title="CTR"
            value="3,76%"
            change={12}
            icon={<MousePointer className="w-5 h-5 text-amber-400" />}
            iconBg="bg-amber-500/15"
          />
        </div>

        {/* Third Row Metrics */}
        <div className="grid grid-cols-4 gap-4">
          <MetricBox
            title="C. de Produto"
            value={45106.00}
            change={115}
            icon={<ShoppingCart className="w-5 h-5 text-emerald-400" />}
            iconBg="bg-emerald-500/15"
          />
          <MetricBox
            title="Pedidos"
            value="36.344"
            change={120}
            icon={<ShoppingCart className="w-5 h-5 text-blue-400" />}
            iconBg="bg-blue-500/15"
          />
          <MetricBox
            title="Ticket Médio"
            value="R$ 55,53"
            change={-5}
            icon={<DollarSign className="w-5 h-5 text-amber-400" />}
            iconBg="bg-amber-500/15"
          />
          <MetricBox
            title="Unidades Vendidas"
            value="51.212"
            change={114}
            icon={<ShoppingCart className="w-5 h-5 text-purple-400" />}
            iconBg="bg-purple-500/15"
          />
        </div>
      </div>
    </MainLayout>
  );
}
