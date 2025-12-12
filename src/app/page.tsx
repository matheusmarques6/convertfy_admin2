'use client';

import * as React from 'react';
import { MainLayout } from '@/components/layout';
import { MetricCard } from '@/components/ui/metric-card';
import { AlertCard } from '@/components/dashboard/alert-card';
import { RevenueChart, FunnelChart } from '@/components/dashboard/charts';
import {
  DollarSign,
  TrendingUp,
  Users,
  Calendar,
  FileText,
  Target,
  Repeat,
  AlertCircle,
} from 'lucide-react';

// Mock data - será substituído por dados reais do Supabase
const mockMetrics = {
  revenue: {
    current_month: 85000,
    previous_month: 72000,
    mrr: 78500,
    pending: 12500,
    overdue: 3200,
  },
  clients: {
    total: 47,
    active: 42,
    new_this_month: 5,
    churn_this_month: 1,
  },
  meetings: {
    scheduled: 12,
    completed_this_month: 38,
    delayed: 3,
  },
  reports: {
    pending: 5,
    delivered_this_month: 35,
  },
  pipeline: {
    total_value: 156000,
    deals_count: 23,
    won_this_month: 8,
    conversion_rate: 34.7,
  },
};

const mockAlerts = [
  {
    id: '1',
    type: 'meeting_delayed' as const,
    title: 'Reuniões atrasadas',
    description: '3 clientes sem reunião há mais de 35 dias',
    count: 3,
    href: '/clients?filter=meeting_delayed',
  },
  {
    id: '2',
    type: 'payment_pending' as const,
    title: 'Cobranças pendentes',
    description: 'R$ 12.500 em faturas vencendo',
    count: 5,
    href: '/financeiro?filter=pending',
  },
  {
    id: '3',
    type: 'report_pending' as const,
    title: 'Relatórios pendentes',
    description: '5 relatórios para entregar este mês',
    count: 5,
    href: '/clients?filter=report_pending',
  },
  {
    id: '4',
    type: 'contract_expiring' as const,
    title: 'Contratos vencendo',
    description: '2 contratos vencem nos próximos 30 dias',
    count: 2,
    href: '/clients?filter=contract_expiring',
  },
];

const mockRevenueData = [
  { name: 'Jan', value: 62000, previousValue: 55000 },
  { name: 'Fev', value: 68000, previousValue: 62000 },
  { name: 'Mar', value: 72000, previousValue: 68000 },
  { name: 'Abr', value: 75000, previousValue: 72000 },
  { name: 'Mai', value: 78000, previousValue: 75000 },
  { name: 'Jun', value: 85000, previousValue: 78000 },
];

const mockFunnelData = [
  { name: 'Leads', value: 145 },
  { name: 'Qualificados', value: 89 },
  { name: 'Agendados', value: 52 },
  { name: 'Reunião', value: 38 },
  { name: 'Proposta', value: 23 },
  { name: 'Fechados', value: 8 },
];

export default function DashboardPage() {
  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-text-primary">Dashboard</h1>
            <p className="text-text-secondary mt-1">
              Visão geral da Convertfy
            </p>
          </div>
        </div>

        {/* Financial Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          <MetricCard
            title="Faturamento do Mês"
            value={mockMetrics.revenue.current_month}
            previousValue={mockMetrics.revenue.previous_month}
            format="currency"
            icon={DollarSign}
            highlighted
            subtitle="vs mês anterior"
          />
          <MetricCard
            title="MRR"
            value={mockMetrics.revenue.mrr}
            format="currency"
            icon={Repeat}
            iconColor="text-brand-cyan"
            trend="up"
            trendValue={8.3}
            subtitle="receita recorrente"
          />
          <MetricCard
            title="A Receber"
            value={mockMetrics.revenue.pending}
            format="currency"
            icon={TrendingUp}
            iconColor="text-warning"
            trend="neutral"
            subtitle="este mês"
          />
          <MetricCard
            title="Inadimplência"
            value={mockMetrics.revenue.overdue}
            format="currency"
            icon={AlertCircle}
            iconColor="text-error"
            trend="down"
            trendValue={-15.2}
            subtitle="vs mês anterior"
          />
          <MetricCard
            title="Clientes Ativos"
            value={mockMetrics.clients.active}
            icon={Users}
            iconColor="text-success"
            trend="up"
            trendValue={10.6}
            subtitle={`${mockMetrics.clients.new_this_month} novos`}
          />
        </div>

        {/* Charts and Alerts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <RevenueChart data={mockRevenueData} title="Evolução do Faturamento" />
          </div>
          <div>
            <AlertCard alerts={mockAlerts} />
          </div>
        </div>

        {/* Secondary Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            title="Reuniões Agendadas"
            value={mockMetrics.meetings.scheduled}
            icon={Calendar}
            iconColor="text-info"
            subtitle="próximos 7 dias"
          />
          <MetricCard
            title="Reuniões Realizadas"
            value={mockMetrics.meetings.completed_this_month}
            icon={Calendar}
            iconColor="text-success"
            trend="up"
            trendValue={12}
            subtitle="este mês"
          />
          <MetricCard
            title="Relatórios Entregues"
            value={mockMetrics.reports.delivered_this_month}
            icon={FileText}
            iconColor="text-brand-purple"
            subtitle="este mês"
          />
          <MetricCard
            title="Pipeline Total"
            value={mockMetrics.pipeline.total_value}
            format="currency"
            icon={Target}
            iconColor="text-brand-cyan"
            subtitle={`${mockMetrics.pipeline.deals_count} deals`}
          />
        </div>

        {/* Funnel Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <FunnelChart data={mockFunnelData} title="Funil de Vendas" />
          
          {/* Quick Stats */}
          <div className="bg-surface border border-border rounded-xl p-5">
            <h3 className="text-lg font-semibold text-text-primary mb-4">
              Performance Comercial
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-background-secondary rounded-lg">
                <div>
                  <p className="text-sm text-text-secondary">Taxa de Conversão</p>
                  <p className="text-xl font-bold text-text-primary">
                    {mockMetrics.pipeline.conversion_rate}%
                  </p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-success/20 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-success" />
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-background-secondary rounded-lg">
                <div>
                  <p className="text-sm text-text-secondary">Deals Fechados (mês)</p>
                  <p className="text-xl font-bold text-text-primary">
                    {mockMetrics.pipeline.won_this_month}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-brand-purple/20 flex items-center justify-center">
                  <Target className="w-6 h-6 text-brand-purple" />
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-background-secondary rounded-lg">
                <div>
                  <p className="text-sm text-text-secondary">Novos Clientes (mês)</p>
                  <p className="text-xl font-bold text-text-primary">
                    {mockMetrics.clients.new_this_month}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-brand-cyan/20 flex items-center justify-center">
                  <Users className="w-6 h-6 text-brand-cyan" />
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-background-secondary rounded-lg">
                <div>
                  <p className="text-sm text-text-secondary">Churn (mês)</p>
                  <p className="text-xl font-bold text-text-primary">
                    {mockMetrics.clients.churn_this_month}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-error/20 flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-error" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
