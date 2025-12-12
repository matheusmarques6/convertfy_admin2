'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { MainLayout } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import {
  Plus,
  Zap,
  Play,
  Pause,
  MoreHorizontal,
  Clock,
  Users,
  DollarSign,
  Calendar,
  FileText,
  Mail,
  MessageSquare,
  Bell,
  ChevronRight,
  Activity,
} from 'lucide-react';

interface Automation {
  id: string;
  name: string;
  description: string;
  trigger_type: string;
  trigger_label: string;
  is_active: boolean;
  executions_count: number;
  last_execution?: string;
  actions_count: number;
}

const mockAutomations: Automation[] = [
  {
    id: '1',
    name: 'Boas-vindas Novo Cliente',
    description: 'Envia email e WhatsApp de boas-vindas quando um novo cliente é cadastrado',
    trigger_type: 'new_client',
    trigger_label: 'Novo cliente cadastrado',
    is_active: true,
    executions_count: 47,
    last_execution: '2024-01-15T10:30:00Z',
    actions_count: 3,
  },
  {
    id: '2',
    name: 'Lembrete de Reunião',
    description: 'Envia lembrete 2 dias e 1 hora antes da reunião agendada',
    trigger_type: 'meeting_scheduled',
    trigger_label: 'Reunião agendada',
    is_active: true,
    executions_count: 156,
    last_execution: '2024-01-15T08:00:00Z',
    actions_count: 2,
  },
  {
    id: '3',
    name: 'Cobrança Atrasada',
    description: 'Sequência de lembretes quando pagamento está atrasado',
    trigger_type: 'payment_overdue',
    trigger_label: 'Pagamento atrasado',
    is_active: true,
    executions_count: 23,
    last_execution: '2024-01-14T14:00:00Z',
    actions_count: 4,
  },
  {
    id: '4',
    name: 'Alerta de Queda',
    description: 'Notifica CS quando faturamento do cliente cai mais de 20%',
    trigger_type: 'revenue_drop',
    trigger_label: 'Faturamento caiu >20%',
    is_active: false,
    executions_count: 8,
    last_execution: '2024-01-10T16:00:00Z',
    actions_count: 2,
  },
  {
    id: '5',
    name: 'Renovação de Contrato',
    description: 'Lembrete 30 dias antes do vencimento do contrato',
    trigger_type: 'contract_expiring',
    trigger_label: 'Contrato vence em 30 dias',
    is_active: true,
    executions_count: 12,
    last_execution: '2024-01-12T09:00:00Z',
    actions_count: 3,
  },
];

const triggerIcons: Record<string, React.ElementType> = {
  new_client: Users,
  meeting_scheduled: Calendar,
  payment_overdue: DollarSign,
  revenue_drop: Activity,
  contract_expiring: FileText,
  report_pending: FileText,
};

export default function AutomationsPage() {
  const router = useRouter();
  const [automations, setAutomations] = React.useState(mockAutomations);

  const toggleAutomation = (id: string) => {
    setAutomations((prev) =>
      prev.map((a) => (a.id === id ? { ...a, is_active: !a.is_active } : a))
    );
  };

  const activeCount = automations.filter((a) => a.is_active).length;
  const totalExecutions = automations.reduce((acc, a) => acc + a.executions_count, 0);

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-text-primary">Automações</h1>
            <p className="text-text-secondary mt-1">
              Crie fluxos automáticos baseados em gatilhos
            </p>
          </div>
          <Button
            leftIcon={<Plus className="w-4 h-4" />}
            onClick={() => router.push('/automations/new')}
          >
            Nova Automação
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-brand-purple/20 flex items-center justify-center">
                <Zap className="w-5 h-5 text-brand-purple" />
              </div>
              <div>
                <p className="text-sm text-text-muted">Total</p>
                <p className="text-xl font-bold text-text-primary">
                  {automations.length}
                </p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-success/20 flex items-center justify-center">
                <Play className="w-5 h-5 text-success" />
              </div>
              <div>
                <p className="text-sm text-text-muted">Ativas</p>
                <p className="text-xl font-bold text-success">{activeCount}</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-warning/20 flex items-center justify-center">
                <Pause className="w-5 h-5 text-warning" />
              </div>
              <div>
                <p className="text-sm text-text-muted">Pausadas</p>
                <p className="text-xl font-bold text-warning">
                  {automations.length - activeCount}
                </p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-brand-cyan/20 flex items-center justify-center">
                <Activity className="w-5 h-5 text-brand-cyan" />
              </div>
              <div>
                <p className="text-sm text-text-muted">Execuções</p>
                <p className="text-xl font-bold text-text-primary">
                  {totalExecutions}
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Automations List */}
        <div className="space-y-4">
          {automations.map((automation) => {
            const TriggerIcon = triggerIcons[automation.trigger_type] || Zap;
            
            return (
              <Card
                key={automation.id}
                className={cn(
                  'p-5 cursor-pointer transition-all hover:border-border-light',
                  !automation.is_active && 'opacity-60'
                )}
                onClick={() => router.push(`/automations/${automation.id}`)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {/* Toggle */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleAutomation(automation.id);
                      }}
                      className={cn(
                        'relative w-12 h-6 rounded-full transition-colors',
                        automation.is_active ? 'bg-success' : 'bg-surface-hover'
                      )}
                    >
                      <div
                        className={cn(
                          'absolute top-1 w-4 h-4 rounded-full bg-white transition-transform',
                          automation.is_active ? 'left-7' : 'left-1'
                        )}
                      />
                    </button>

                    {/* Icon */}
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-purple/20 to-brand-cyan/20 flex items-center justify-center">
                      <TriggerIcon className="w-6 h-6 text-brand-purple" />
                    </div>

                    {/* Info */}
                    <div>
                      <h3 className="font-semibold text-text-primary">
                        {automation.name}
                      </h3>
                      <p className="text-sm text-text-muted mt-0.5">
                        {automation.description}
                      </p>
                      <div className="flex items-center gap-3 mt-2">
                        <Badge variant="purple" size="sm">
                          <Zap className="w-3 h-3 mr-1" />
                          {automation.trigger_label}
                        </Badge>
                        <span className="text-xs text-text-muted">
                          {automation.actions_count} ações
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="text-lg font-semibold text-text-primary">
                        {automation.executions_count}
                      </p>
                      <p className="text-xs text-text-muted">execuções</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-text-muted" />
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Templates Section */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold text-text-primary mb-4">
            Templates Prontos
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                icon: Users,
                name: 'Onboarding de Cliente',
                description: 'Sequência de boas-vindas para novos clientes',
              },
              {
                icon: DollarSign,
                name: 'Cobrança Automática',
                description: 'Lembretes de pagamento em múltiplos canais',
              },
              {
                icon: Calendar,
                name: 'Gestão de Reuniões',
                description: 'Lembretes e follow-ups de reuniões',
              },
            ].map((template, index) => (
              <Card
                key={index}
                className="p-4 cursor-pointer hover:border-brand-purple/50 transition-all group"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-surface-hover group-hover:bg-brand-purple/20 flex items-center justify-center transition-colors">
                    <template.icon className="w-5 h-5 text-text-muted group-hover:text-brand-purple transition-colors" />
                  </div>
                  <div>
                    <h3 className="font-medium text-text-primary">
                      {template.name}
                    </h3>
                    <p className="text-sm text-text-muted mt-1">
                      {template.description}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
