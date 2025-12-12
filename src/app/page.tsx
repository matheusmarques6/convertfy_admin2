'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import {
  LayoutDashboard,
  Users,
  BarChart3,
  Kanban,
  Zap,
  Wrench,
  Settings,
  Search,
  Bell,
  RefreshCw,
  DollarSign,
  TrendingUp,
  TrendingDown,
  ShoppingCart,
  Target,
  Percent,
  Package,
  CreditCard,
  AlertTriangle,
  Clock,
  FileText,
  Calendar,
  ChevronRight,
  MoreHorizontal,
} from 'lucide-react';

// ============================================
// SIDEBAR COMPONENT
// ============================================
const navItems = [
  { label: 'Dashboard', href: '/', icon: LayoutDashboard },
  { label: 'Clientes', href: '/clients', icon: Users },
  { label: 'Métricas', href: '/metrics', icon: BarChart3 },
  { label: 'Pipeline', href: '/pipeline', icon: Kanban },
  { label: 'Automações', href: '/automations', icon: Zap },
  { label: 'Hub', href: '/hub', icon: Wrench },
  { label: 'Configurações', href: '/settings', icon: Settings },
];

function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-screen w-[72px] bg-[#111114] border-r border-[#1F1F23] flex flex-col z-50">
      {/* Logo */}
      <div className="h-16 flex items-center justify-center border-b border-[#1F1F23]">
        <div className="relative w-10 h-10">
          <Image src="/logo.png" alt="Convertfy" fill className="object-contain" />
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 px-3 flex flex-col gap-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`group relative w-12 h-12 mx-auto rounded-xl flex items-center justify-center transition-all ${
                isActive
                  ? 'bg-gradient-to-br from-purple-500/20 to-cyan-500/10 text-purple-400'
                  : 'text-zinc-500 hover:text-zinc-300 hover:bg-[#1F1F23]'
              }`}
            >
              {isActive && (
                <div className="absolute left-[-12px] top-1/2 -translate-y-1/2 w-[3px] h-6 bg-gradient-to-b from-purple-500 to-cyan-500 rounded-r" />
              )}
              <item.icon className="w-5 h-5" />
              {/* Tooltip */}
              <div className="absolute left-full ml-3 px-3 py-1.5 bg-[#1F1F23] border border-[#3F3F46] rounded-lg text-sm text-white opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50">
                {item.label}
              </div>
            </Link>
          );
        })}
      </nav>

      {/* User */}
      <div className="p-3 border-t border-[#1F1F23]">
        <div className="w-10 h-10 mx-auto rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center text-white font-semibold text-sm cursor-pointer">
          AD
        </div>
      </div>
    </aside>
  );
}

// ============================================
// HEADER COMPONENT
// ============================================
function Header() {
  const [activePeriod, setActivePeriod] = React.useState('month');
  const periods = [
    { id: 'today', label: 'Hoje' },
    { id: 'yesterday', label: 'Ontem' },
    { id: 'week', label: '7 Dias' },
    { id: 'month', label: 'Este mês' },
  ];

  return (
    <header className="fixed top-0 left-[72px] right-0 h-16 bg-[#0C0C0E]/80 backdrop-blur-xl border-b border-[#1F1F23] flex items-center justify-between px-6 z-40">
      {/* Search */}
      <div className="relative max-w-md flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
        <input
          type="text"
          placeholder="Buscar clientes, deals..."
          className="w-full h-10 pl-10 pr-4 bg-[#18181B] border border-[#27272A] rounded-xl text-white text-sm placeholder:text-zinc-600 focus:outline-none focus:border-zinc-600 transition-colors"
        />
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        {/* Period Filter */}
        <div className="flex bg-[#18181B] border border-[#27272A] rounded-lg p-1 gap-0.5">
          {periods.map((p) => (
            <button
              key={p.id}
              onClick={() => setActivePeriod(p.id)}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                activePeriod === p.id
                  ? 'bg-[#27272A] text-white'
                  : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>

        <button className="p-2 rounded-lg hover:bg-[#1F1F23] text-zinc-500 hover:text-white transition-colors">
          <RefreshCw className="w-5 h-5" />
        </button>

        <button className="relative p-2 rounded-lg hover:bg-[#1F1F23] text-zinc-500 hover:text-white transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
            3
          </span>
        </button>
      </div>
    </header>
  );
}

// ============================================
// METRIC CARD COMPONENT
// ============================================
interface MetricCardProps {
  title: string;
  value: string;
  trend?: number;
  icon: React.ElementType;
  iconColor: string;
  iconBg: string;
  highlighted?: boolean;
}

function MetricCard({ title, value, trend, icon: Icon, iconColor, iconBg, highlighted }: MetricCardProps) {
  const isPositive = trend && trend > 0;
  const isNegative = trend && trend < 0;

  if (highlighted) {
    return (
      <div className="relative overflow-hidden rounded-2xl p-5 bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-lg shadow-emerald-500/20">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-white/80 mb-1">{title}</p>
            <p className="text-3xl font-bold text-white">{value}</p>
            {trend !== undefined && (
              <div className="flex items-center gap-1 mt-2">
                {isNegative ? <TrendingDown className="w-4 h-4 text-white/90" /> : <TrendingUp className="w-4 h-4 text-white/90" />}
                <span className="text-sm font-medium text-white/90">{Math.abs(trend).toFixed(2)}%</span>
              </div>
            )}
          </div>
          <div className="w-11 h-11 rounded-xl bg-white/20 flex items-center justify-center">
            <Icon className="w-5 h-5 text-white" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-2xl p-5 bg-gradient-to-br from-[#18181B] to-[#1F1F23] border border-white/[0.06]">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-zinc-500 mb-1">{title}</p>
          <p className="text-2xl font-bold text-white">{value}</p>
          {trend !== undefined && (
            <div className="flex items-center gap-1 mt-2">
              {isNegative ? (
                <TrendingDown className="w-4 h-4 text-red-400" />
              ) : (
                <TrendingUp className="w-4 h-4 text-emerald-400" />
              )}
              <span className={`text-sm font-medium ${isNegative ? 'text-red-400' : 'text-emerald-400'}`}>
                {isPositive && '+'}{trend.toFixed(2)}%
              </span>
            </div>
          )}
        </div>
        <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${iconBg}`}>
          <Icon className={`w-5 h-5 ${iconColor}`} />
        </div>
      </div>
    </div>
  );
}

// ============================================
// GAUGE COMPONENT
// ============================================
function GaugeCard({ title, value, max, label }: { title: string; value: number; max: number; label: string }) {
  const percentage = Math.min((value / max) * 100, 100);
  const circumference = 2 * Math.PI * 40;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="rounded-2xl p-5 bg-gradient-to-br from-[#18181B] to-[#1F1F23] border border-white/[0.06] text-center">
      <p className="text-sm font-medium text-zinc-500 mb-4">{title}</p>
      <div className="relative w-24 h-24 mx-auto mb-3">
        <svg className="w-full h-full -rotate-90">
          <circle cx="48" cy="48" r="40" fill="none" stroke="#27272A" strokeWidth="8" />
          <circle
            cx="48"
            cy="48"
            r="40"
            fill="none"
            stroke="url(#gaugeGradient)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
          />
          <defs>
            <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10B981" />
              <stop offset="100%" stopColor="#34D399" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold text-emerald-400">{percentage.toFixed(0)}%</span>
        </div>
      </div>
      <p className="text-xs text-zinc-500">{label}</p>
      <p className="text-lg font-semibold text-emerald-400 mt-1">
        R$ {max.toLocaleString('pt-BR')}
      </p>
    </div>
  );
}

// ============================================
// MOCK DATA
// ============================================
const metrics = {
  profit: 290811.97,
  profitChange: -1.77,
  revenue: 2018051.13,
  revenueChange: 110,
  costs: 1727239.15,
  costsChange: 29,
  taxes: 148420.35,
  taxesChange: 104,
  margin: 14.4,
  marginChange: -137,
  adSpend: 933712.80,
  adSpendChange: -2,
  cpa: 25.69,
  cpaChange: -56,
  roi: 16.8,
  roiChange: -160,
  roas: 116.1,
  roasChange: -999,
  productCost: 645106.00,
  productCostChange: 115,
  orders: 36344,
  ordersChange: 120,
  avgTicket: 55.53,
  avgTicketChange: -5,
  unitsSold: 51212,
  unitsSoldChange: 114,
};

const stores = [
  { name: 'Loja de Calçados', emoji: '👟', orders: 25606, revenue: 1447806.48, cost: 567478.90, profit: 880327.58, margin: 60.8 },
  { name: 'Loja de Camisetas', emoji: '👕', orders: 10738, revenue: 570244.65, cost: 1159760.25, profit: -589515.61, margin: -103.38 },
];

const chartData = [
  { name: '16/11', receita: 12500, custo: 4200, lucro: 8300 },
  { name: '17/11', receita: 14200, custo: 5100, lucro: 9100 },
  { name: '18/11', receita: 16800, custo: 6200, lucro: 10600 },
  { name: '19/11', receita: 15400, custo: 5300, lucro: 10100 },
  { name: '20/11', receita: 17200, custo: 5800, lucro: 11400 },
  { name: '21/11', receita: 14800, custo: 4600, lucro: 10200 },
  { name: '22/11', receita: 16100, custo: 5800, lucro: 10300 },
];

const alerts = [
  { type: 'warning', title: 'Reuniões atrasadas', count: 3, icon: Clock },
  { type: 'error', title: 'Cobranças pendentes', count: 5, icon: AlertTriangle },
  { type: 'info', title: 'Relatórios pendentes', count: 5, icon: FileText },
  { type: 'default', title: 'Contratos vencendo', count: 2, icon: Calendar },
];

const formatCurrency = (v: number) => 
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(v);

// ============================================
// MAIN DASHBOARD
// ============================================
export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-[#0C0C0E]">
      <Sidebar />
      <Header />

      <main className="pt-16 pl-[72px]">
        <div className="p-6 space-y-6">
          {/* Row 1 - Main Metrics */}
          <div className="grid grid-cols-5 gap-4">
            <MetricCard
              title="Lucro"
              value={formatCurrency(metrics.profit)}
              trend={metrics.profitChange}
              icon={DollarSign}
              iconColor="text-white"
              iconBg="bg-white/20"
              highlighted
            />
            <MetricCard
              title="Faturamento"
              value={formatCurrency(metrics.revenue)}
              trend={metrics.revenueChange}
              icon={TrendingUp}
              iconColor="text-purple-400"
              iconBg="bg-purple-500/15"
            />
            <MetricCard
              title="Custos Totais"
              value={formatCurrency(metrics.costs)}
              trend={metrics.costsChange}
              icon={CreditCard}
              iconColor="text-red-400"
              iconBg="bg-red-500/15"
            />
            <MetricCard
              title="Taxas"
              value={formatCurrency(metrics.taxes)}
              trend={metrics.taxesChange}
              icon={Percent}
              iconColor="text-amber-400"
              iconBg="bg-amber-500/15"
            />
            <MetricCard
              title="Margem"
              value={`${metrics.margin.toFixed(1)}%`}
              trend={metrics.marginChange}
              icon={BarChart3}
              iconColor="text-cyan-400"
              iconBg="bg-cyan-500/15"
            />
          </div>

          {/* Row 2 - Stores Table + Costs */}
          <div className="grid grid-cols-4 gap-4">
            {/* Stores Table */}
            <div className="col-span-3 rounded-2xl bg-gradient-to-br from-[#18181B] to-[#1F1F23] border border-white/[0.06] overflow-hidden">
              <div className="p-5 border-b border-[#27272A] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold text-white">TODAS AS LOJAS</span>
                  <span className="px-2 py-0.5 bg-blue-500/15 text-blue-400 text-xs font-medium rounded">{stores.length}</span>
                </div>
                <button className="p-1.5 rounded-lg hover:bg-[#27272A] text-zinc-500 hover:text-white transition-colors">
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>
              
              {/* Table Header */}
              <div className="grid grid-cols-6 gap-4 px-5 py-3 text-[11px] font-semibold text-zinc-500 uppercase tracking-wide border-b border-[#27272A]/50">
                <div>Loja</div>
                <div className="text-right">Pedidos</div>
                <div className="text-right">Receita</div>
                <div className="text-right">Custo Total</div>
                <div className="text-right">Lucro</div>
                <div className="text-right">Margem</div>
              </div>

              {/* Table Rows */}
              {stores.map((store, i) => (
                <div key={i} className="grid grid-cols-6 gap-4 px-5 py-4 items-center border-b border-[#27272A]/30 last:border-0 hover:bg-white/[0.02] transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{store.emoji}</span>
                    <span className="font-medium text-white">{store.name}</span>
                  </div>
                  <div className="text-right text-zinc-400">{store.orders.toLocaleString('pt-BR')}</div>
                  <div className="text-right font-medium text-white">{formatCurrency(store.revenue)}</div>
                  <div className="text-right text-zinc-400">{formatCurrency(store.cost)}</div>
                  <div className={`text-right font-semibold ${store.profit >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                    {formatCurrency(store.profit)}
                  </div>
                  <div className="flex items-center justify-end gap-2">
                    <div className="flex-1 max-w-[60px] h-1.5 bg-[#27272A] rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${store.margin >= 0 ? 'bg-gradient-to-r from-emerald-500 to-emerald-400' : 'bg-gradient-to-r from-red-500 to-red-400'}`}
                        style={{ width: `${Math.min(Math.abs(store.margin), 100)}%` }}
                      />
                    </div>
                    <span className={`text-sm font-medium w-16 text-right ${store.margin >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                      {store.margin.toFixed(1)}%
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Additional Costs */}
            <div className="rounded-2xl p-5 bg-gradient-to-br from-[#18181B] to-[#1F1F23] border border-white/[0.06]">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-zinc-500">Custos Adicionais</span>
                <div className="w-10 h-10 rounded-xl bg-purple-500/15 flex items-center justify-center">
                  <Package className="w-5 h-5 text-purple-400" />
                </div>
              </div>
              <p className="text-3xl font-bold text-white mb-5">{formatCurrency(33617.08)}</p>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between"><span className="text-zinc-500">■ Reembolso</span><span className="text-zinc-400">R$ 0,00</span></div>
                <div className="flex justify-between"><span className="text-zinc-500">■ Impostos</span><span className="text-zinc-400">R$ 0,00</span></div>
                <div className="flex justify-between"><span className="text-zinc-500">■ Garantia</span><span className="text-amber-400">Sem Garantia</span></div>
                <div className="flex justify-between"><span className="text-zinc-500">+ Operacional</span><span className="text-emerald-400">{formatCurrency(33617.08)}</span></div>
              </div>
            </div>
          </div>

          {/* Row 3 - Secondary Metrics */}
          <div className="grid grid-cols-5 gap-4">
            <MetricCard title="Anúncios" value={formatCurrency(metrics.adSpend)} trend={metrics.adSpendChange} icon={Target} iconColor="text-blue-400" iconBg="bg-blue-500/15" />
            <MetricCard title="CPA" value={formatCurrency(metrics.cpa)} trend={metrics.cpaChange} icon={Users} iconColor="text-purple-400" iconBg="bg-purple-500/15" />
            <MetricCard title="ROI" value={`${metrics.roi.toFixed(1)}%`} trend={metrics.roiChange} icon={TrendingUp} iconColor="text-emerald-400" iconBg="bg-emerald-500/15" />
            <MetricCard title="ROAS" value={`${metrics.roas.toFixed(1)}%`} trend={metrics.roasChange} icon={BarChart3} iconColor="text-cyan-400" iconBg="bg-cyan-500/15" />
            <GaugeCard title="Metas" value={1652000} max={1652000} label="Meta de Faturamento" />
          </div>

          {/* Row 4 - Third Metrics */}
          <div className="grid grid-cols-4 gap-4">
            <MetricCard title="C. de Produto" value={formatCurrency(metrics.productCost)} trend={metrics.productCostChange} icon={Package} iconColor="text-emerald-400" iconBg="bg-emerald-500/15" />
            <MetricCard title="Pedidos" value={metrics.orders.toLocaleString('pt-BR')} trend={metrics.ordersChange} icon={ShoppingCart} iconColor="text-blue-400" iconBg="bg-blue-500/15" />
            <MetricCard title="Ticket Médio" value={formatCurrency(metrics.avgTicket)} trend={metrics.avgTicketChange} icon={CreditCard} iconColor="text-amber-400" iconBg="bg-amber-500/15" />
            <MetricCard title="Unidades Vendidas" value={metrics.unitsSold.toLocaleString('pt-BR')} trend={metrics.unitsSoldChange} icon={Package} iconColor="text-purple-400" iconBg="bg-purple-500/15" />
          </div>

          {/* Row 5 - Chart + Alerts */}
          <div className="grid grid-cols-3 gap-6">
            {/* Chart */}
            <div className="col-span-2 rounded-2xl p-6 bg-gradient-to-br from-[#18181B] to-[#1F1F23] border border-white/[0.06]">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-white">Resumo Financeiro</h3>
                <div className="flex items-center gap-6 text-xs">
                  <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-emerald-500" /><span className="text-zinc-400">Receita</span></div>
                  <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-amber-500" /><span className="text-zinc-400">Custos</span></div>
                  <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-purple-500" /><span className="text-zinc-400">Lucro</span></div>
                </div>
              </div>
              <div className="h-[280px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} barGap={4}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#27272A" vertical={false} />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#71717A', fontSize: 12 }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#71717A', fontSize: 12 }} tickFormatter={(v) => `${(v/1000).toFixed(0)}K`} />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#1F1F23', border: '1px solid #3F3F46', borderRadius: '12px' }}
                      labelStyle={{ color: '#FAFAFA', fontWeight: 600, marginBottom: 8 }}
                      formatter={(value: number) => [formatCurrency(value), '']}
                    />
                    <Bar dataKey="receita" fill="#10B981" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="custo" fill="#F59E0B" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="lucro" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-3 gap-4 mt-6 pt-5 border-t border-[#27272A]">
                <div><p className="text-xs text-zinc-500 mb-1">Receita Bruta</p><p className="text-lg font-semibold text-white">{formatCurrency(66337.24)}</p></div>
                <div><p className="text-xs text-zinc-500 mb-1">Receita Total</p><p className="text-lg font-semibold text-white">{formatCurrency(45713.53)}</p><p className="text-[10px] text-zinc-600">pela data de aprovação</p></div>
                <div><p className="text-xs text-zinc-500 mb-1">Pedidos pendentes</p><p className="text-lg font-semibold text-white">{formatCurrency(3052.33)} <span className="text-zinc-500 text-sm">(5)</span></p></div>
              </div>
            </div>

            {/* Alerts */}
            <div className="rounded-2xl p-5 bg-gradient-to-br from-[#18181B] to-[#1F1F23] border border-white/[0.06]">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-semibold text-white">Alertas</h3>
                <span className="px-2.5 py-1 bg-red-500/15 text-red-400 text-xs font-medium rounded-md">15 pendentes</span>
              </div>
              <div className="space-y-3">
                {alerts.map((alert, i) => {
                  const Icon = alert.icon;
                  const bgColor = alert.type === 'warning' ? 'bg-amber-500/15' : alert.type === 'error' ? 'bg-red-500/15' : alert.type === 'info' ? 'bg-purple-500/15' : 'bg-blue-500/15';
                  const iconColor = alert.type === 'warning' ? 'text-amber-400' : alert.type === 'error' ? 'text-red-400' : alert.type === 'info' ? 'text-purple-400' : 'text-blue-400';
                  const chipBg = alert.type === 'warning' ? 'bg-amber-500/15 text-amber-400' : alert.type === 'error' ? 'bg-red-500/15 text-red-400' : alert.type === 'info' ? 'bg-purple-500/15 text-purple-400' : 'bg-zinc-700 text-zinc-300';
                  
                  return (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-[#111114] hover:bg-[#1F1F23] cursor-pointer transition-colors group">
                      <div className={`w-10 h-10 rounded-xl ${bgColor} flex items-center justify-center`}>
                        <Icon className={`w-4 h-4 ${iconColor}`} />
                      </div>
                      <span className="flex-1 text-sm font-medium text-white">{alert.title}</span>
                      <span className={`px-2 py-0.5 text-xs font-medium rounded ${chipBg}`}>{alert.count}</span>
                      <ChevronRight className="w-4 h-4 text-zinc-600 group-hover:text-zinc-400 transition-colors" />
                    </div>
                  );
                })}
              </div>

              {/* Net Profit Card */}
              <div className="mt-6 p-4 rounded-xl bg-[#111114]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-zinc-500">Lucro Líquido</span>
                  <span className="px-2 py-0.5 bg-red-500/15 text-red-400 text-xs font-medium rounded">-28.14%</span>
                </div>
                <p className="text-2xl font-bold text-emerald-400">{formatCurrency(2203.35)}</p>
                <p className="text-xs text-zinc-500 mt-1">a menos neste período</p>
                <div className="flex items-end gap-1 mt-4 h-10">
                  {[40, 55, 35, 60, 45, 70, 50, 65].map((h, i) => (
                    <div key={i} className="flex-1 bg-emerald-500/80 rounded-sm hover:bg-emerald-400 transition-colors" style={{ height: `${h}%` }} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
