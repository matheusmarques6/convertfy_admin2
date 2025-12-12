'use client';

import * as React from 'react';
import { MainLayout } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { MetricCard } from '@/components/ui/metric-card';
import { Tabs, TabPanel } from '@/components/ui/tabs';
import { formatCurrency, formatNumber, formatPercent } from '@/lib/utils';
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
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import {
  Facebook,
  Instagram,
  ShoppingBag,
  Mail,
  TrendingUp,
  DollarSign,
  Users,
  MousePointer,
  Eye,
  Target,
  RefreshCw,
  Calendar,
  Filter,
} from 'lucide-react';

const tabs = [
  { id: 'overview', label: 'Visão Geral', icon: <TrendingUp className="w-4 h-4" /> },
  { id: 'facebook', label: 'Meta Ads', icon: <Facebook className="w-4 h-4" /> },
  { id: 'shopify', label: 'Shopify', icon: <ShoppingBag className="w-4 h-4" /> },
  { id: 'klaviyo', label: 'Klaviyo', icon: <Mail className="w-4 h-4" /> },
  { id: 'instagram', label: 'Instagram', icon: <Instagram className="w-4 h-4" /> },
];

// Mock data
const mockMetaAds = {
  spend: 45000,
  leads: 1250,
  cpl: 36,
  cpa: 85,
  roas: 4.2,
  impressions: 850000,
  clicks: 32000,
  ctr: 3.76,
};

const mockShopify = {
  revenue: 285000,
  orders: 1847,
  average_ticket: 154.3,
  conversion_rate: 2.8,
  abandoned_carts: 423,
  returning_customers: 38,
};

const mockKlaviyo = {
  email_revenue: 42000,
  open_rate: 28.5,
  click_rate: 4.2,
  unsubscribe_rate: 0.3,
  active_flows: 12,
  subscribers: 45000,
};

const revenueData = [
  { name: 'Jan', ads: 38000, email: 12000, organic: 8000 },
  { name: 'Fev', ads: 42000, email: 15000, organic: 9500 },
  { name: 'Mar', ads: 45000, email: 18000, organic: 11000 },
  { name: 'Abr', ads: 48000, email: 20000, organic: 12000 },
  { name: 'Mai', ads: 52000, email: 22000, organic: 13500 },
  { name: 'Jun', ads: 58000, email: 25000, organic: 15000 },
];

const channelData = [
  { name: 'Meta Ads', value: 58, color: '#8B5CF6' },
  { name: 'Email', value: 25, color: '#06B6D4' },
  { name: 'Orgânico', value: 12, color: '#22C55E' },
  { name: 'Direto', value: 5, color: '#F59E0B' },
];

export default function MetricsPage() {
  const [activeTab, setActiveTab] = React.useState('overview');
  const [selectedClient, setSelectedClient] = React.useState('all');

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-text-primary">Métricas</h1>
            <p className="text-text-secondary mt-1">
              Performance consolidada de todos os clientes
            </p>
          </div>
          <div className="flex items-center gap-3">
            <select
              value={selectedClient}
              onChange={(e) => setSelectedClient(e.target.value)}
              className="h-10 px-3 bg-surface border border-border rounded-lg text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-brand-purple/50"
            >
              <option value="all">Todos os clientes</option>
              <option value="1">Tech Store Brasil</option>
              <option value="2">Fashion Hub</option>
              <option value="3">Suplementos Pro</option>
            </select>
            <Button variant="secondary" leftIcon={<Calendar className="w-4 h-4" />}>
              Últimos 30 dias
            </Button>
            <Button variant="secondary" leftIcon={<RefreshCw className="w-4 h-4" />}>
              Atualizar
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Overview Tab */}
        <TabPanel isActive={activeTab === 'overview'}>
          {/* Main Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <MetricCard
              title="Faturamento Total"
              value={mockShopify.revenue}
              format="currency"
              icon={DollarSign}
              highlighted
              trend="up"
              trendValue={18.5}
              subtitle="vs mês anterior"
            />
            <MetricCard
              title="ROAS Médio"
              value={mockMetaAds.roas}
              format="number"
              icon={TrendingUp}
              iconColor="text-success"
              trend="up"
              trendValue={12.3}
              subtitle="4.2x retorno"
            />
            <MetricCard
              title="Investimento Ads"
              value={mockMetaAds.spend}
              format="currency"
              icon={Target}
              iconColor="text-brand-purple"
              trend="up"
              trendValue={8.2}
            />
            <MetricCard
              title="Receita Email"
              value={mockKlaviyo.email_revenue}
              format="currency"
              icon={Mail}
              iconColor="text-brand-cyan"
              trend="up"
              trendValue={22.1}
            />
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Revenue by Channel */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Receita por Canal</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={revenueData}>
                      <defs>
                        <linearGradient id="colorAds" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorEmail" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#06B6D4" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorOrganic" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#22C55E" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#22C55E" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#27272A" vertical={false} />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#71717A', fontSize: 12 }} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fill: '#71717A', fontSize: 12 }} tickFormatter={(v) => `R$${(v/1000)}k`} />
                      <Tooltip
                        contentStyle={{ backgroundColor: '#1C1C1F', border: '1px solid #27272A', borderRadius: '8px' }}
                        labelStyle={{ color: '#FAFAFA' }}
                        formatter={(value: number) => [formatCurrency(value), '']}
                      />
                      <Area type="monotone" dataKey="ads" stroke="#8B5CF6" strokeWidth={2} fill="url(#colorAds)" name="Ads" />
                      <Area type="monotone" dataKey="email" stroke="#06B6D4" strokeWidth={2} fill="url(#colorEmail)" name="Email" />
                      <Area type="monotone" dataKey="organic" stroke="#22C55E" strokeWidth={2} fill="url(#colorOrganic)" name="Orgânico" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Channel Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Distribuição por Canal</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={channelData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {channelData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{ backgroundColor: '#1C1C1F', border: '1px solid #27272A', borderRadius: '8px' }}
                        formatter={(value: number) => [`${value}%`, '']}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-2 mt-4">
                  {channelData.map((channel) => (
                    <div key={channel.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: channel.color }} />
                        <span className="text-sm text-text-secondary">{channel.name}</span>
                      </div>
                      <span className="text-sm font-medium text-text-primary">{channel.value}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Secondary Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard
              title="Pedidos"
              value={mockShopify.orders}
              icon={ShoppingBag}
              iconColor="text-success"
              trend="up"
              trendValue={15.3}
            />
            <MetricCard
              title="Ticket Médio"
              value={mockShopify.average_ticket}
              format="currency"
              icon={DollarSign}
              trend="up"
              trendValue={5.2}
            />
            <MetricCard
              title="Leads Gerados"
              value={mockMetaAds.leads}
              icon={Users}
              iconColor="text-brand-purple"
              trend="up"
              trendValue={22.1}
            />
            <MetricCard
              title="CPL Médio"
              value={mockMetaAds.cpl}
              format="currency"
              icon={Target}
              iconColor="text-warning"
              trend="down"
              trendValue={-8.5}
            />
          </div>
        </TabPanel>

        {/* Meta Ads Tab */}
        <TabPanel isActive={activeTab === 'facebook'}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <MetricCard
              title="Investimento"
              value={mockMetaAds.spend}
              format="currency"
              icon={DollarSign}
              highlighted
            />
            <MetricCard
              title="ROAS"
              value={mockMetaAds.roas}
              format="number"
              icon={TrendingUp}
              iconColor="text-success"
              subtitle="4.2x retorno"
            />
            <MetricCard
              title="CPL"
              value={mockMetaAds.cpl}
              format="currency"
              icon={Target}
              iconColor="text-brand-purple"
            />
            <MetricCard
              title="CPA"
              value={mockMetaAds.cpa}
              format="currency"
              icon={Users}
              iconColor="text-brand-cyan"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard
              title="Impressões"
              value={mockMetaAds.impressions}
              icon={Eye}
              iconColor="text-info"
            />
            <MetricCard
              title="Cliques"
              value={mockMetaAds.clicks}
              icon={MousePointer}
              iconColor="text-warning"
            />
            <MetricCard
              title="CTR"
              value={mockMetaAds.ctr}
              format="percent"
              icon={TrendingUp}
              iconColor="text-success"
            />
            <MetricCard
              title="Leads"
              value={mockMetaAds.leads}
              icon={Users}
              iconColor="text-brand-purple"
            />
          </div>
        </TabPanel>

        {/* Shopify Tab */}
        <TabPanel isActive={activeTab === 'shopify'}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <MetricCard
              title="Faturamento"
              value={mockShopify.revenue}
              format="currency"
              icon={DollarSign}
              highlighted
            />
            <MetricCard
              title="Pedidos"
              value={mockShopify.orders}
              icon={ShoppingBag}
              iconColor="text-success"
            />
            <MetricCard
              title="Ticket Médio"
              value={mockShopify.average_ticket}
              format="currency"
              icon={DollarSign}
              iconColor="text-brand-purple"
            />
            <MetricCard
              title="Taxa de Conversão"
              value={mockShopify.conversion_rate}
              format="percent"
              icon={TrendingUp}
              iconColor="text-brand-cyan"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <MetricCard
              title="Carrinhos Abandonados"
              value={mockShopify.abandoned_carts}
              icon={ShoppingBag}
              iconColor="text-error"
            />
            <MetricCard
              title="Clientes Recorrentes"
              value={mockShopify.returning_customers}
              format="percent"
              icon={Users}
              iconColor="text-success"
            />
          </div>
        </TabPanel>

        {/* Klaviyo Tab */}
        <TabPanel isActive={activeTab === 'klaviyo'}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <MetricCard
              title="Receita de Email"
              value={mockKlaviyo.email_revenue}
              format="currency"
              icon={DollarSign}
              highlighted
            />
            <MetricCard
              title="Taxa de Abertura"
              value={mockKlaviyo.open_rate}
              format="percent"
              icon={Mail}
              iconColor="text-brand-purple"
            />
            <MetricCard
              title="Taxa de Clique"
              value={mockKlaviyo.click_rate}
              format="percent"
              icon={MousePointer}
              iconColor="text-brand-cyan"
            />
            <MetricCard
              title="Fluxos Ativos"
              value={mockKlaviyo.active_flows}
              icon={TrendingUp}
              iconColor="text-success"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <MetricCard
              title="Assinantes"
              value={mockKlaviyo.subscribers}
              icon={Users}
              iconColor="text-info"
            />
            <MetricCard
              title="Taxa de Cancelamento"
              value={mockKlaviyo.unsubscribe_rate}
              format="percent"
              icon={Users}
              iconColor="text-error"
            />
          </div>
        </TabPanel>

        {/* Instagram Tab */}
        <TabPanel isActive={activeTab === 'instagram'}>
          <div className="flex items-center justify-center py-12 text-text-muted">
            <p>Métricas do Instagram em breve...</p>
          </div>
        </TabPanel>
      </div>
    </MainLayout>
  );
}
