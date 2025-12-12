'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { MainLayout } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import {
  ArrowLeft,
  Save,
  Play,
  Plus,
  Zap,
  Mail,
  MessageSquare,
  Bell,
  Clock,
  Users,
  DollarSign,
  Calendar,
  FileText,
  Tag,
  Webhook,
  GitBranch,
  X,
  ChevronDown,
  GripVertical,
} from 'lucide-react';

interface AutomationNode {
  id: string;
  type: 'trigger' | 'condition' | 'action' | 'delay';
  category?: string;
  label: string;
  icon: React.ElementType;
  config: Record<string, unknown>;
  position: { x: number; y: number };
}

const triggerOptions = [
  { id: 'new_client', label: 'Novo cliente cadastrado', icon: Users, category: 'cliente' },
  { id: 'client_status', label: 'Status do cliente alterado', icon: Users, category: 'cliente' },
  { id: 'payment_received', label: 'Pagamento recebido', icon: DollarSign, category: 'financeiro' },
  { id: 'payment_overdue', label: 'Pagamento atrasado', icon: DollarSign, category: 'financeiro' },
  { id: 'meeting_scheduled', label: 'Reunião agendada', icon: Calendar, category: 'reunião' },
  { id: 'meeting_delayed', label: 'Reunião atrasada', icon: Calendar, category: 'reunião' },
  { id: 'report_pending', label: 'Relatório pendente', icon: FileText, category: 'relatório' },
  { id: 'contract_expiring', label: 'Contrato vencendo', icon: FileText, category: 'contrato' },
  { id: 'deal_stage_changed', label: 'Deal mudou de etapa', icon: GitBranch, category: 'pipeline' },
];

const actionOptions = [
  { id: 'send_email', label: 'Enviar Email', icon: Mail, category: 'comunicação' },
  { id: 'send_whatsapp', label: 'Enviar WhatsApp', icon: MessageSquare, category: 'comunicação' },
  { id: 'send_notification', label: 'Criar Notificação', icon: Bell, category: 'sistema' },
  { id: 'add_tag', label: 'Adicionar Tag', icon: Tag, category: 'sistema' },
  { id: 'remove_tag', label: 'Remover Tag', icon: Tag, category: 'sistema' },
  { id: 'create_task', label: 'Criar Tarefa', icon: FileText, category: 'sistema' },
  { id: 'webhook', label: 'Webhook Externo', icon: Webhook, category: 'integração' },
  { id: 'delay', label: 'Aguardar', icon: Clock, category: 'controle' },
  { id: 'condition', label: 'Condição', icon: GitBranch, category: 'controle' },
];

export default function NewAutomationPage() {
  const router = useRouter();
  const [automationName, setAutomationName] = React.useState('Nova Automação');
  const [nodes, setNodes] = React.useState<AutomationNode[]>([]);
  const [selectedTrigger, setSelectedTrigger] = React.useState<string | null>(null);
  const [showTriggerPanel, setShowTriggerPanel] = React.useState(true);
  const [showActionPanel, setShowActionPanel] = React.useState(false);

  const handleSelectTrigger = (triggerId: string) => {
    const trigger = triggerOptions.find((t) => t.id === triggerId);
    if (trigger) {
      setNodes([
        {
          id: 'trigger-1',
          type: 'trigger',
          label: trigger.label,
          icon: trigger.icon,
          config: { triggerId },
          position: { x: 100, y: 100 },
        },
      ]);
      setSelectedTrigger(triggerId);
      setShowTriggerPanel(false);
      setShowActionPanel(true);
    }
  };

  const handleAddAction = (actionId: string) => {
    const action = actionOptions.find((a) => a.id === actionId);
    if (action) {
      const newNode: AutomationNode = {
        id: `action-${nodes.length + 1}`,
        type: actionId === 'condition' ? 'condition' : actionId === 'delay' ? 'delay' : 'action',
        label: action.label,
        icon: action.icon,
        config: { actionId },
        position: { x: 100, y: 100 + nodes.length * 120 },
      };
      setNodes([...nodes, newNode]);
    }
  };

  const removeNode = (nodeId: string) => {
    if (nodeId.startsWith('trigger')) {
      setNodes([]);
      setSelectedTrigger(null);
      setShowTriggerPanel(true);
      setShowActionPanel(false);
    } else {
      setNodes(nodes.filter((n) => n.id !== nodeId));
    }
  };

  return (
    <MainLayout>
      <div className="h-[calc(100vh-120px)] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              leftIcon={<ArrowLeft className="w-4 h-4" />}
              onClick={() => router.back()}
            >
              Voltar
            </Button>
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-brand-purple" />
              <Input
                value={automationName}
                onChange={(e) => setAutomationName(e.target.value)}
                className="bg-transparent border-none text-lg font-semibold w-64 focus:ring-0"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="secondary" leftIcon={<Play className="w-4 h-4" />}>
              Testar
            </Button>
            <Button leftIcon={<Save className="w-4 h-4" />}>
              Salvar
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex gap-4 overflow-hidden">
          {/* Left Panel - Toolbox */}
          <div className="w-72 bg-surface border border-border rounded-xl p-4 overflow-y-auto">
            {showTriggerPanel && (
              <>
                <h3 className="font-semibold text-text-primary mb-3 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-brand-purple" />
                  Escolha o Gatilho
                </h3>
                <p className="text-xs text-text-muted mb-4">
                  O gatilho define quando a automação será executada
                </p>
                <div className="space-y-2">
                  {triggerOptions.map((trigger) => {
                    const Icon = trigger.icon;
                    return (
                      <button
                        key={trigger.id}
                        onClick={() => handleSelectTrigger(trigger.id)}
                        className="w-full flex items-center gap-3 p-3 bg-background-secondary hover:bg-background-tertiary rounded-lg transition-colors text-left group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-brand-purple/20 flex items-center justify-center group-hover:bg-brand-purple/30 transition-colors">
                          <Icon className="w-4 h-4 text-brand-purple" />
                        </div>
                        <span className="text-sm text-text-primary">{trigger.label}</span>
                      </button>
                    );
                  })}
                </div>
              </>
            )}

            {showActionPanel && (
              <>
                <h3 className="font-semibold text-text-primary mb-3">Ações Disponíveis</h3>
                <p className="text-xs text-text-muted mb-4">
                  Arraste ou clique para adicionar ao fluxo
                </p>

                {/* Communication */}
                <div className="mb-4">
                  <p className="text-xs font-medium text-text-muted uppercase mb-2">Comunicação</p>
                  <div className="space-y-1">
                    {actionOptions.filter((a) => a.category === 'comunicação').map((action) => {
                      const Icon = action.icon;
                      return (
                        <button
                          key={action.id}
                          onClick={() => handleAddAction(action.id)}
                          className="w-full flex items-center gap-2 p-2 hover:bg-background-secondary rounded-lg transition-colors text-left"
                        >
                          <Icon className="w-4 h-4 text-brand-cyan" />
                          <span className="text-sm text-text-secondary">{action.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* System */}
                <div className="mb-4">
                  <p className="text-xs font-medium text-text-muted uppercase mb-2">Sistema</p>
                  <div className="space-y-1">
                    {actionOptions.filter((a) => a.category === 'sistema').map((action) => {
                      const Icon = action.icon;
                      return (
                        <button
                          key={action.id}
                          onClick={() => handleAddAction(action.id)}
                          className="w-full flex items-center gap-2 p-2 hover:bg-background-secondary rounded-lg transition-colors text-left"
                        >
                          <Icon className="w-4 h-4 text-success" />
                          <span className="text-sm text-text-secondary">{action.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Control */}
                <div className="mb-4">
                  <p className="text-xs font-medium text-text-muted uppercase mb-2">Controle</p>
                  <div className="space-y-1">
                    {actionOptions.filter((a) => a.category === 'controle').map((action) => {
                      const Icon = action.icon;
                      return (
                        <button
                          key={action.id}
                          onClick={() => handleAddAction(action.id)}
                          className="w-full flex items-center gap-2 p-2 hover:bg-background-secondary rounded-lg transition-colors text-left"
                        >
                          <Icon className="w-4 h-4 text-warning" />
                          <span className="text-sm text-text-secondary">{action.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Integration */}
                <div>
                  <p className="text-xs font-medium text-text-muted uppercase mb-2">Integração</p>
                  <div className="space-y-1">
                    {actionOptions.filter((a) => a.category === 'integração').map((action) => {
                      const Icon = action.icon;
                      return (
                        <button
                          key={action.id}
                          onClick={() => handleAddAction(action.id)}
                          className="w-full flex items-center gap-2 p-2 hover:bg-background-secondary rounded-lg transition-colors text-left"
                        >
                          <Icon className="w-4 h-4 text-info" />
                          <span className="text-sm text-text-secondary">{action.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Canvas */}
          <div className="flex-1 bg-background-secondary border border-border rounded-xl overflow-auto relative">
            {/* Grid Pattern */}
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `
                  linear-gradient(to right, #27272A 1px, transparent 1px),
                  linear-gradient(to bottom, #27272A 1px, transparent 1px)
                `,
                backgroundSize: '20px 20px',
              }}
            />

            {/* Nodes */}
            <div className="relative p-8 min-h-full">
              {nodes.length === 0 && showTriggerPanel && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <Zap className="w-16 h-16 text-text-muted mx-auto mb-4 opacity-50" />
                    <p className="text-text-muted text-lg">
                      Selecione um gatilho para começar
                    </p>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                {nodes.map((node, index) => {
                  const Icon = node.icon;
                  const isFirst = index === 0;
                  const isLast = index === nodes.length - 1;
                  
                  return (
                    <div key={node.id} className="relative">
                      {/* Connection Line */}
                      {!isFirst && (
                        <div className="absolute left-1/2 -top-4 w-0.5 h-4 bg-border" />
                      )}
                      
                      {/* Node */}
                      <div
                        className={cn(
                          'relative mx-auto w-80 bg-surface border rounded-xl p-4 shadow-lg',
                          node.type === 'trigger' && 'border-brand-purple',
                          node.type === 'action' && 'border-brand-cyan',
                          node.type === 'condition' && 'border-warning',
                          node.type === 'delay' && 'border-info'
                        )}
                      >
                        {/* Node Header */}
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <div
                              className={cn(
                                'w-8 h-8 rounded-lg flex items-center justify-center',
                                node.type === 'trigger' && 'bg-brand-purple/20',
                                node.type === 'action' && 'bg-brand-cyan/20',
                                node.type === 'condition' && 'bg-warning/20',
                                node.type === 'delay' && 'bg-info/20'
                              )}
                            >
                              <Icon
                                className={cn(
                                  'w-4 h-4',
                                  node.type === 'trigger' && 'text-brand-purple',
                                  node.type === 'action' && 'text-brand-cyan',
                                  node.type === 'condition' && 'text-warning',
                                  node.type === 'delay' && 'text-info'
                                )}
                              />
                            </div>
                            <div>
                              <p
                                className={cn(
                                  'text-xs font-medium uppercase',
                                  node.type === 'trigger' && 'text-brand-purple',
                                  node.type === 'action' && 'text-brand-cyan',
                                  node.type === 'condition' && 'text-warning',
                                  node.type === 'delay' && 'text-info'
                                )}
                              >
                                {node.type === 'trigger' ? 'Gatilho' : 
                                 node.type === 'condition' ? 'Condição' :
                                 node.type === 'delay' ? 'Delay' : 'Ação'}
                              </p>
                              <p className="text-sm font-medium text-text-primary">
                                {node.label}
                              </p>
                            </div>
                          </div>
                          <button
                            onClick={() => removeNode(node.id)}
                            className="p-1 rounded hover:bg-error/20 transition-colors"
                          >
                            <X className="w-4 h-4 text-text-muted hover:text-error" />
                          </button>
                        </div>

                        {/* Node Config */}
                        {node.type === 'action' && node.config.actionId === 'send_email' && (
                          <div className="space-y-2">
                            <select className="w-full h-8 px-2 text-sm bg-background-secondary border border-border rounded-lg text-text-primary">
                              <option>Selecione um template...</option>
                              <option>Boas-vindas</option>
                              <option>Lembrete de Reunião</option>
                              <option>Cobrança</option>
                            </select>
                          </div>
                        )}

                        {node.type === 'action' && node.config.actionId === 'send_whatsapp' && (
                          <div className="space-y-2">
                            <select className="w-full h-8 px-2 text-sm bg-background-secondary border border-border rounded-lg text-text-primary">
                              <option>Selecione um template...</option>
                              <option>Boas-vindas</option>
                              <option>Confirmação</option>
                            </select>
                          </div>
                        )}

                        {node.type === 'delay' && (
                          <div className="flex gap-2">
                            <input
                              type="number"
                              placeholder="1"
                              className="w-20 h-8 px-2 text-sm bg-background-secondary border border-border rounded-lg text-text-primary"
                              defaultValue={1}
                            />
                            <select className="flex-1 h-8 px-2 text-sm bg-background-secondary border border-border rounded-lg text-text-primary">
                              <option>minutos</option>
                              <option>horas</option>
                              <option>dias</option>
                            </select>
                          </div>
                        )}

                        {node.type === 'condition' && (
                          <div className="space-y-2">
                            <select className="w-full h-8 px-2 text-sm bg-background-secondary border border-border rounded-lg text-text-primary">
                              <option>Se campo...</option>
                              <option>Status do cliente</option>
                              <option>Valor da mensalidade</option>
                              <option>Tem tag</option>
                            </select>
                          </div>
                        )}
                      </div>

                      {/* Add Node Button */}
                      {isLast && (
                        <div className="flex justify-center mt-4">
                          <div className="w-0.5 h-4 bg-border" />
                        </div>
                      )}
                    </div>
                  );
                })}

                {/* Add Action Button */}
                {nodes.length > 0 && (
                  <div className="flex justify-center">
                    <button
                      onClick={() => setShowActionPanel(true)}
                      className="w-10 h-10 rounded-full border-2 border-dashed border-border hover:border-brand-purple flex items-center justify-center transition-colors group"
                    >
                      <Plus className="w-5 h-5 text-text-muted group-hover:text-brand-purple" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Panel - Node Config (optional) */}
          {/* This could show detailed configuration for selected node */}
        </div>
      </div>
    </MainLayout>
  );
}
