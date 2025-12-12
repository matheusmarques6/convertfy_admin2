'use client';

import * as React from 'react';
import Link from 'next/link';
import { MainLayout } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  Plus,
  Search,
  Zap,
  Users,
  Calendar,
  DollarSign,
  FileText,
  Mail,
  MessageSquare,
  Bell,
  MoreHorizontal,
  Play,
  Pause,
  ChevronRight,
  Activity,
  Clock,
  GitBranch,
  ArrowRight,
} from 'lucide-react';

interface Automation {
  id: string;
  name: string;
  description: string;
  trigger: {
    type: string;
    label: string;
    icon: React.ElementType;
  };
  actionsCount: number;
  isActive: boolean;
  executions: number;
  lastRun?: string;
  successRate: number;
}

const mockAutomations: Automation[] = [
  {
    id: '1',
    name: 'Boas-vindas Novo Cliente',
    description: 'Envia email e WhatsApp quando um novo cliente é cadastrado',
    trigger: { type: 'new_client', label: 'Novo Cliente', icon: Users },
    actionsCount: 3,
    isActive: true,
    executions: 127,
    lastRun: '2024-01-15T10:30:00Z',
    successRate: 98.5,
  },
  {
    id: '2',
    name: 'Lembrete de Reunião',
    description: 'Notifica o cliente 24h antes da reunião agendada',
    trigger: { type: 'meeting_scheduled', label: 'Reunião Agendada', icon: Calendar },
    actionsCount: 2,
    isActive: true,
    executions: 89,
    lastRun: '2024-01-15T08:00:00Z',
    successRate: 100,
  },
  {
    id: '3',
    name: 'Cobrança Atrasada',
    description: 'Envia lembretes progressivos para pagamentos em atraso',
    trigger: { type: 'payment_overdue', label: 'Pagamento Atrasado', icon: DollarSign },
    actionsCount: 5,
    isActive: true,
    executions: 34,
    lastRun: '2024-01-14T14:00:00Z',
    successRate: 94.1,
  },
  {
    id: '4',
    name: 'Alerta de Queda de Receita',
    description: 'Notifica o time quando há queda significativa no faturamento',
    trigger: { type: 'revenue_drop', label: 'Queda de Receita', icon: Activity },
    actionsCount: 2,
    isActive: false,
    executions: 12,
    lastRun: '2024-01-10T09:00:00Z',
    successRate: 100,
  },
  {
    id: '5',
    name: 'Renovação de Contrato',
    description: 'Inicia fluxo de renovação 30 dias antes do vencimento',
    trigger: { type: 'contract_expiring', label: 'Contrato Vencendo', icon: FileText },
    actionsCount: 4,
    isActive: true,
    executions: 8,
    lastRun: '2024-01-12T11:00:00Z',
    successRate: 87.5,
  },
];

const triggerTemplates = [
  { id: 'onboarding', name: 'Onboarding Completo', description: 'Sequência de boas-vindas em 7 dias', icon: Users, color: '#8B5CF6' },
  { id: 'cobranca', name: 'Cobrança Automática', description: 'Lembretes de pagamento progressivos', icon: DollarSign, color: '#F59E0B' },
  { id: 'reuniao', name: 'Gestão de Reuniões', description: 'Confirmação e follow-up automático', icon: Calendar, color: '#3B82F6' },
  { id: 'churn', name: 'Prevenção de Churn', description: 'Alertas e ações para reter clientes', icon: Activity, color: '#EF4444' },
];

export default function AutomationsPage() {
  const [automations, setAutomations] = React.useState(mockAutomations);
  const [search, setSearch] = React.useState('');

  const toggleAutomation = (id: string) => {
    setAutomations(prev =>
      prev.map(a => a.id === id ? { ...a, isActive: !a.isActive } : a)
    );
  };

  const filteredAutomations = automations.filter(a =>
    a.name.toLowerCase().includes(search.toLowerCase()) ||
    a.description.toLowerCase().includes(search.toLowerCase())
  );

  const stats = {
    total: automations.length,
    active: automations.filter(a => a.isActive).length,
    executions: automations.reduce((sum, a) => sum + a.executions, 0),
  };

  return (
    <MainLayout>
      <div className="space-y-6 animate-fade-in-up">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-text-primary">Automações</h1>
            <p className="text-text-muted mt-1">Crie fluxos automáticos para otimizar seu trabalho</p>
          </div>
          <Link href="/automations/new">
            <Button leftIcon={<Plus className="w-4 h-4" />}>
              Nova Automação
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4">
          <div className="card-dark p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-text-muted">Total</p>
                <p className="text-3xl font-bold text-text-primary mt-1">{stats.total}</p>
              </div>
              <div className="icon-circle icon-circle-purple">
                <Zap className="w-5 h-5" />
              </div>
            </div>
          </div>
          <div className="card-dark p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-text-muted">Ativas</p>
                <p className="text-3xl font-bold text-success mt-1">{stats.active}</p>
              </div>
              <div className="icon-circle icon-circle-green">
                <Play className="w-5 h-5" />
              </div>
            </div>
          </div>
          <div className="card-dark p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-text-muted">Pausadas</p>
                <p className="text-3xl font-bold text-warning mt-1">{stats.total - stats.active}</p>
              </div>
              <div className="icon-circle icon-circle-yellow">
                <Pause className="w-5 h-5" />
              </div>
            </div>
          </div>
          <div className="card-dark p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-text-muted">Execuções</p>
                <p className="text-3xl font-bold text-text-primary mt-1">{stats.executions}</p>
              </div>
              <div className="icon-circle icon-circle-cyan">
                <Activity className="w-5 h-5" />
              </div>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
          <input
            type="text"
            placeholder="Buscar automações..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-10 pl-10 pr-4 bg-surface border border-border rounded-xl text-text-primary text-sm placeholder:text-text-muted focus:outline-none focus:border-brand-purple/50 transition-colors"
          />
        </div>

        {/* Automations List */}
        <div className="space-y-3">
          {filteredAutomations.map((automation) => {
            const TriggerIcon = automation.trigger.icon;
            
            return (
              <div
                key={automation.id}
                className="card-dark p-5 hover:border-border-light transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-5">
                  {/* Toggle */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleAutomation(automation.id);
                    }}
                    className={cn(
                      'relative w-12 h-7 rounded-full transition-colors flex-shrink-0',
                      automation.isActive ? 'bg-success' : 'bg-surface-hover'
                    )}
                  >
                    <div className={cn(
                      'absolute top-1 w-5 h-5 rounded-full bg-white shadow-sm transition-all',
                      automation.isActive ? 'left-6' : 'left-1'
                    )} />
                  </button>

                  {/* Trigger Icon */}
                  <div className={cn(
                    'w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0',
                    automation.isActive ? 'icon-circle-purple' : 'bg-surface-hover'
                  )}>
                    <TriggerIcon className={cn(
                      'w-5 h-5',
                      automation.isActive ? 'text-brand-purple' : 'text-text-muted'
                    )} />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-text-primary group-hover:text-brand-purple transition-colors">
                        {automation.name}
                      </h3>
                      <span className="chip chip-info text-[10px]">
                        {automation.trigger.label}
                      </span>
                    </div>
                    <p className="text-sm text-text-muted mt-0.5 truncate">
                      {automation.description}
                    </p>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center gap-6 flex-shrink-0">
                    <div className="text-center">
                      <p className="text-xs text-text-muted">Ações</p>
                      <p className="font-semibold text-text-primary">{automation.actionsCount}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-text-muted">Execuções</p>
                      <p className="font-semibold text-text-primary">{automation.executions}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-text-muted">Taxa</p>
                      <p className={cn(
                        'font-semibold',
                        automation.successRate >= 95 ? 'text-success' :
                        automation.successRate >= 80 ? 'text-warning' : 'text-error'
                      )}>
                        {automation.successRate}%
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button className="p-2 rounded-lg hover:bg-surface transition-colors text-text-muted hover:text-text-primary">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                    <ChevronRight className="w-4 h-4 text-text-muted group-hover:text-brand-purple transition-colors" />
                  </div>
                </div>

                {/* Last Run */}
                {automation.lastRun && (
                  <div className="mt-4 pt-4 border-t border-border flex items-center gap-1 text-xs text-text-muted">
                    <Clock className="w-3 h-3" />
                    Última execução: {new Date(automation.lastRun).toLocaleString('pt-BR')}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Templates Section */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold text-text-primary mb-4">Templates Prontos</h2>
          <div className="grid grid-cols-4 gap-4">
            {triggerTemplates.map((template) => {
              const Icon = template.icon;
              return (
                <div
                  key={template.id}
                  className="card-dark p-5 hover:border-border-light cursor-pointer transition-all group"
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                    style={{ backgroundColor: `${template.color}20` }}
                  >
                    <Icon className="w-6 h-6" style={{ color: template.color }} />
                  </div>
                  <h3 className="font-semibold text-text-primary group-hover:text-brand-purple transition-colors">
                    {template.name}
                  </h3>
                  <p className="text-sm text-text-muted mt-1">{template.description}</p>
                  <div className="mt-4 flex items-center text-sm text-brand-purple font-medium">
                    Usar template
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
