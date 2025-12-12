'use client';

import * as React from 'react';
import { MainLayout } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';
import { Tabs, TabPanel } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import {
  Users,
  Shield,
  Tags,
  FileText,
  Link2,
  Mail,
  MessageSquare,
  Target,
  Settings2,
  Plus,
  Edit,
  Trash2,
  Check,
  X,
  ExternalLink,
  RefreshCw,
} from 'lucide-react';

const tabs = [
  { id: 'users', label: 'Usuários', icon: <Users className="w-4 h-4" /> },
  { id: 'integrations', label: 'Integrações', icon: <Link2 className="w-4 h-4" /> },
  { id: 'templates', label: 'Templates', icon: <Mail className="w-4 h-4" /> },
  { id: 'tags', label: 'Tags', icon: <Tags className="w-4 h-4" /> },
  { id: 'plans', label: 'Planos', icon: <FileText className="w-4 h-4" /> },
  { id: 'goals', label: 'Metas', icon: <Target className="w-4 h-4" /> },
];

const mockUsers = [
  { id: '1', name: 'Admin Master', email: 'admin@convertfy.com', role: 'admin', status: 'active' },
  { id: '2', name: 'João SDR', email: 'joao@convertfy.com', role: 'sdr', status: 'active' },
  { id: '3', name: 'Carlos Closer', email: 'carlos@convertfy.com', role: 'closer', status: 'active' },
  { id: '4', name: 'Maria CS', email: 'maria@convertfy.com', role: 'cs', status: 'active' },
  { id: '5', name: 'Ana Financeiro', email: 'ana@convertfy.com', role: 'finance', status: 'inactive' },
];

const mockIntegrations = [
  { id: 'asaas', name: 'Asaas', description: 'Cobranças e pagamentos', icon: '💳', connected: true, lastSync: '2024-01-15T10:30:00Z' },
  { id: 'meta', name: 'Meta Ads', description: 'Facebook e Instagram Ads', icon: '📱', connected: true, lastSync: '2024-01-15T09:00:00Z' },
  { id: 'google', name: 'Google Ads', description: 'Campanhas do Google', icon: '🔍', connected: false },
  { id: 'klaviyo', name: 'Klaviyo', description: 'Email marketing', icon: '📧', connected: true, lastSync: '2024-01-15T08:00:00Z' },
  { id: 'shopify', name: 'Shopify', description: 'Dados das lojas', icon: '🛒', connected: true, lastSync: '2024-01-15T10:00:00Z' },
  { id: 'whatsapp', name: 'WhatsApp Business', description: 'Mensagens automáticas', icon: '💬', connected: true },
  { id: 'calendar', name: 'Google Calendar', description: 'Agendamento de reuniões', icon: '📅', connected: false },
];

const mockTags = [
  { id: '1', name: 'Premium', color: '#8B5CF6', count: 12 },
  { id: '2', name: 'Enterprise', color: '#06B6D4', count: 5 },
  { id: '3', name: 'Shopify', color: '#22C55E', count: 28 },
  { id: '4', name: 'Dropshipping', color: '#F59E0B', count: 15 },
  { id: '5', name: 'Ecommerce', color: '#3B82F6', count: 35 },
  { id: '6', name: 'Inbound', color: '#EC4899', count: 8 },
];

const mockPlans = [
  { id: '1', name: 'Basic', value: 2000, features: ['1 loja', 'Relatório mensal', 'Suporte email'] },
  { id: '2', name: 'Standard', value: 3500, features: ['2 lojas', 'Relatório quinzenal', 'Suporte WhatsApp'] },
  { id: '3', name: 'Premium', value: 5000, features: ['3 lojas', 'Relatório semanal', 'Suporte prioritário', 'Reunião mensal'] },
  { id: '4', name: 'Enterprise', value: 8000, features: ['Lojas ilimitadas', 'Relatório sob demanda', 'Gerente dedicado', 'Reunião semanal'] },
];

const roleLabels: Record<string, string> = {
  admin: 'Administrador',
  manager: 'Gestor',
  sdr: 'SDR',
  closer: 'Closer',
  cs: 'Customer Success',
  finance: 'Financeiro',
};

const roleColors: Record<string, 'purple' | 'cyan' | 'success' | 'warning' | 'error' | 'info'> = {
  admin: 'purple',
  manager: 'cyan',
  sdr: 'info',
  closer: 'success',
  cs: 'warning',
  finance: 'error',
};

export default function SettingsPage() {
  const [activeTab, setActiveTab] = React.useState('users');

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Configurações</h1>
          <p className="text-text-secondary mt-1">
            Gerencie usuários, integrações e preferências do sistema
          </p>
        </div>

        {/* Tabs */}
        <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Users Tab */}
        <TabPanel isActive={activeTab === 'users'}>
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Usuários do Sistema</CardTitle>
                <Button size="sm" leftIcon={<Plus className="w-4 h-4" />}>
                  Novo Usuário
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockUsers.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center justify-between p-4 bg-background-secondary rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <Avatar name={user.name} size="md" />
                      <div>
                        <p className="font-medium text-text-primary">{user.name}</p>
                        <p className="text-sm text-text-muted">{user.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant={roleColors[user.role]}>
                        {roleLabels[user.role]}
                      </Badge>
                      <Badge variant={user.status === 'active' ? 'success' : 'error'}>
                        {user.status === 'active' ? 'Ativo' : 'Inativo'}
                      </Badge>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="w-4 h-4 text-error" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabPanel>

        {/* Integrations Tab */}
        <TabPanel isActive={activeTab === 'integrations'}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mockIntegrations.map((integration) => (
              <Card key={integration.id} className="p-5">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-surface-hover flex items-center justify-center text-2xl">
                      {integration.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-text-primary">{integration.name}</h3>
                      <p className="text-sm text-text-muted">{integration.description}</p>
                    </div>
                  </div>
                  <div className={cn(
                    'w-3 h-3 rounded-full',
                    integration.connected ? 'bg-success' : 'bg-error'
                  )} />
                </div>
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                  {integration.connected ? (
                    <>
                      <span className="text-xs text-text-muted">
                        Última sync: {integration.lastSync ? new Date(integration.lastSync).toLocaleString('pt-BR') : 'N/A'}
                      </span>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" leftIcon={<RefreshCw className="w-3 h-3" />}>
                          Sincronizar
                        </Button>
                        <Button variant="ghost" size="sm" leftIcon={<Settings2 className="w-3 h-3" />}>
                          Configurar
                        </Button>
                      </div>
                    </>
                  ) : (
                    <>
                      <span className="text-xs text-text-muted">Não conectado</span>
                      <Button size="sm" leftIcon={<Link2 className="w-3 h-3" />}>
                        Conectar
                      </Button>
                    </>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </TabPanel>

        {/* Templates Tab */}
        <TabPanel isActive={activeTab === 'templates'}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Mail className="w-5 h-5" />
                    Templates de Email
                  </CardTitle>
                  <Button size="sm" leftIcon={<Plus className="w-4 h-4" />}>
                    Novo
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {['Boas-vindas', 'Lembrete de Reunião', 'Cobrança', 'Relatório Mensal'].map((template) => (
                    <div
                      key={template}
                      className="flex items-center justify-between p-3 bg-background-secondary rounded-lg"
                    >
                      <span className="text-sm text-text-primary">{template}</span>
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="w-5 h-5" />
                    Templates de WhatsApp
                  </CardTitle>
                  <Button size="sm" leftIcon={<Plus className="w-4 h-4" />}>
                    Novo
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {['Boas-vindas', 'Confirmação de Reunião', 'Lembrete de Pagamento'].map((template) => (
                    <div
                      key={template}
                      className="flex items-center justify-between p-3 bg-background-secondary rounded-lg"
                    >
                      <span className="text-sm text-text-primary">{template}</span>
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabPanel>

        {/* Tags Tab */}
        <TabPanel isActive={activeTab === 'tags'}>
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Tags de Clientes</CardTitle>
                <Button size="sm" leftIcon={<Plus className="w-4 h-4" />}>
                  Nova Tag
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                {mockTags.map((tag) => (
                  <div
                    key={tag.id}
                    className="flex items-center gap-2 px-3 py-2 bg-background-secondary rounded-lg group"
                  >
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: tag.color }}
                    />
                    <span className="text-sm text-text-primary">{tag.name}</span>
                    <span className="text-xs text-text-muted">({tag.count})</span>
                    <button className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <X className="w-3 h-3 text-text-muted hover:text-error" />
                    </button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabPanel>

        {/* Plans Tab */}
        <TabPanel isActive={activeTab === 'plans'}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {mockPlans.map((plan) => (
              <Card key={plan.id} className="p-5">
                <h3 className="font-semibold text-text-primary text-lg">{plan.name}</h3>
                <p className="text-2xl font-bold text-brand-purple mt-2">
                  R$ {plan.value.toLocaleString('pt-BR')}
                  <span className="text-sm text-text-muted font-normal">/mês</span>
                </p>
                <ul className="mt-4 space-y-2">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm text-text-secondary">
                      <Check className="w-4 h-4 text-success" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button variant="secondary" className="w-full mt-4" size="sm">
                  Editar Plano
                </Button>
              </Card>
            ))}
          </div>
        </TabPanel>

        {/* Goals Tab */}
        <TabPanel isActive={activeTab === 'goals'}>
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Metas Mensais</CardTitle>
                <Button size="sm" leftIcon={<Edit className="w-4 h-4" />}>
                  Editar Metas
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: 'Faturamento', value: 'R$ 100.000', current: 85000, target: 100000 },
                  { label: 'Novos Clientes', value: '8', current: 5, target: 8 },
                  { label: 'Leads Gerados', value: '200', current: 145, target: 200 },
                  { label: 'Taxa de Conversão', value: '35%', current: 34.7, target: 35 },
                ].map((goal, index) => (
                  <div key={index} className="p-4 bg-background-secondary rounded-lg">
                    <p className="text-sm text-text-muted">{goal.label}</p>
                    <p className="text-xl font-bold text-text-primary mt-1">{goal.value}</p>
                    <div className="mt-3">
                      <div className="flex items-center justify-between text-xs text-text-muted mb-1">
                        <span>{Math.round((goal.current / goal.target) * 100)}%</span>
                        <span>Meta</span>
                      </div>
                      <div className="w-full h-2 bg-surface rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-brand-purple to-brand-cyan rounded-full"
                          style={{ width: `${Math.min((goal.current / goal.target) * 100, 100)}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabPanel>
      </div>
    </MainLayout>
  );
}
