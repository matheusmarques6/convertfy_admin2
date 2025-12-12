'use client';

import * as React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { MainLayout } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { Badge, StatusBadge, HealthBadge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tabs, TabPanel } from '@/components/ui/tabs';
import { formatCurrency, formatDate } from '@/lib/utils';
import {
  ArrowLeft,
  Edit,
  MoreHorizontal,
  Building2,
  Mail,
  Phone,
  Calendar,
  FileText,
  DollarSign,
  Store,
  MessageSquare,
  Clock,
  TrendingUp,
  ExternalLink,
} from 'lucide-react';

// Mock client data
const mockClient = {
  id: '1',
  name: 'Carlos Silva',
  company_name: 'Tech Store Brasil',
  cnpj: '12.345.678/0001-00',
  email: 'carlos@techstore.com.br',
  phone: '(11) 99999-1234',
  whatsapp: '5511999991234',
  status: 'active' as const,
  health_score: 'healthy' as const,
  contract_type: 'Premium',
  monthly_value: 5000,
  total_paid: 60000,
  stores_count: 2,
  meeting_frequency: 'monthly' as const,
  last_meeting_date: '2024-01-10',
  next_meeting_date: '2024-02-10',
  meeting_status: 'on_track' as const,
  contract_start_date: '2023-01-01',
  contract_end_date: '2024-12-31',
  tags: ['ecommerce', 'shopify', 'premium'],
  created_at: '2023-01-01T00:00:00Z',
  updated_at: '2024-01-15T00:00:00Z',
  stores: [
    { id: '1', name: 'Tech Store Principal', domain: 'techstore.myshopify.com', revenue: 125000 },
    { id: '2', name: 'Tech Store Outlet', domain: 'techstoreoutlet.myshopify.com', revenue: 45000 },
  ],
  invoices: [
    { id: '1', amount: 5000, status: 'paid', due_date: '2024-01-05', paid_date: '2024-01-04' },
    { id: '2', amount: 5000, status: 'paid', due_date: '2023-12-05', paid_date: '2023-12-05' },
    { id: '3', amount: 5000, status: 'paid', due_date: '2023-11-05', paid_date: '2023-11-03' },
  ],
  meetings: [
    { id: '1', date: '2024-01-10', status: 'completed', notes: 'Revisão de resultados Q4' },
    { id: '2', date: '2023-12-08', status: 'completed', notes: 'Planejamento Black Friday' },
    { id: '3', date: '2023-11-10', status: 'completed', notes: 'Alinhamento de estratégia' },
  ],
  timeline: [
    { id: '1', type: 'meeting', title: 'Reunião realizada', date: '2024-01-10' },
    { id: '2', type: 'payment', title: 'Pagamento recebido - R$ 5.000', date: '2024-01-04' },
    { id: '3', type: 'report', title: 'Relatório de Dezembro enviado', date: '2024-01-02' },
    { id: '4', type: 'note', title: 'Cliente solicitou revisão de campanhas', date: '2023-12-20' },
  ],
};

const tabs = [
  { id: 'overview', label: 'Visão Geral', icon: <Building2 className="w-4 h-4" /> },
  { id: 'financial', label: 'Financeiro', icon: <DollarSign className="w-4 h-4" /> },
  { id: 'meetings', label: 'Reuniões', icon: <Calendar className="w-4 h-4" />, badge: 1 },
  { id: 'reports', label: 'Relatórios', icon: <FileText className="w-4 h-4" /> },
  { id: 'metrics', label: 'Métricas', icon: <TrendingUp className="w-4 h-4" /> },
  { id: 'timeline', label: 'Timeline', icon: <Clock className="w-4 h-4" /> },
];

export default function ClientDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = React.useState('overview');

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Back button and header */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            leftIcon={<ArrowLeft className="w-4 h-4" />}
            onClick={() => router.back()}
          >
            Voltar
          </Button>
        </div>

        {/* Client Header */}
        <div className="bg-surface border border-border rounded-xl p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <Avatar name={mockClient.name} size="xl" />
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-2xl font-bold text-text-primary">
                    {mockClient.name}
                  </h1>
                  <StatusBadge status={mockClient.status} />
                  <HealthBadge score={mockClient.health_score} />
                </div>
                <p className="text-text-secondary flex items-center gap-2 mt-1">
                  <Building2 className="w-4 h-4" />
                  {mockClient.company_name}
                </p>
                <div className="flex items-center gap-4 mt-3">
                  <span className="text-sm text-text-muted flex items-center gap-1">
                    <Mail className="w-4 h-4" />
                    {mockClient.email}
                  </span>
                  <span className="text-sm text-text-muted flex items-center gap-1">
                    <Phone className="w-4 h-4" />
                    {mockClient.phone}
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-3">
                  {mockClient.tags.map((tag) => (
                    <Badge key={tag} variant="default" size="sm">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="secondary" leftIcon={<MessageSquare className="w-4 h-4" />}>
                WhatsApp
              </Button>
              <Button variant="secondary" leftIcon={<Edit className="w-4 h-4" />}>
                Editar
              </Button>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-4 gap-4 mt-6 pt-6 border-t border-border">
            <div>
              <p className="text-sm text-text-muted">Plano</p>
              <p className="text-lg font-semibold text-text-primary">
                {mockClient.contract_type}
              </p>
            </div>
            <div>
              <p className="text-sm text-text-muted">Mensalidade</p>
              <p className="text-lg font-semibold text-brand-purple">
                {formatCurrency(mockClient.monthly_value)}
              </p>
            </div>
            <div>
              <p className="text-sm text-text-muted">Total Pago</p>
              <p className="text-lg font-semibold text-success">
                {formatCurrency(mockClient.total_paid)}
              </p>
            </div>
            <div>
              <p className="text-sm text-text-muted">Lojas</p>
              <p className="text-lg font-semibold text-text-primary">
                {mockClient.stores_count} lojas
              </p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Tab Content */}
        <TabPanel isActive={activeTab === 'overview'}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Client Info */}
            <Card>
              <CardHeader>
                <CardTitle>Informações</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-text-muted">CNPJ</p>
                  <p className="text-text-primary">{mockClient.cnpj}</p>
                </div>
                <div>
                  <p className="text-sm text-text-muted">Email</p>
                  <p className="text-text-primary">{mockClient.email}</p>
                </div>
                <div>
                  <p className="text-sm text-text-muted">Telefone</p>
                  <p className="text-text-primary">{mockClient.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-text-muted">Cliente desde</p>
                  <p className="text-text-primary">{formatDate(mockClient.created_at)}</p>
                </div>
              </CardContent>
            </Card>

            {/* Contract Info */}
            <Card>
              <CardHeader>
                <CardTitle>Contrato</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-text-muted">Plano</p>
                  <p className="text-text-primary">{mockClient.contract_type}</p>
                </div>
                <div>
                  <p className="text-sm text-text-muted">Valor Mensal</p>
                  <p className="text-brand-purple font-semibold">
                    {formatCurrency(mockClient.monthly_value)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-text-muted">Início</p>
                  <p className="text-text-primary">
                    {formatDate(mockClient.contract_start_date!)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-text-muted">Vencimento</p>
                  <p className="text-text-primary">
                    {formatDate(mockClient.contract_end_date!)}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Meeting Info */}
            <Card>
              <CardHeader>
                <CardTitle>Reuniões</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-text-muted">Frequência</p>
                  <p className="text-text-primary capitalize">
                    {mockClient.meeting_frequency === 'monthly' ? 'Mensal' : 
                     mockClient.meeting_frequency === 'biweekly' ? 'Quinzenal' : 'Semanal'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-text-muted">Última Reunião</p>
                  <p className="text-text-primary">
                    {mockClient.last_meeting_date ? formatDate(mockClient.last_meeting_date) : '-'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-text-muted">Próxima Reunião</p>
                  <p className="text-text-primary">
                    {mockClient.next_meeting_date ? formatDate(mockClient.next_meeting_date) : '-'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-text-muted">Status</p>
                  <StatusBadge status={mockClient.meeting_status} />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Stores */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Store className="w-5 h-5" />
                Lojas Shopify
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockClient.stores.map((store) => (
                  <div
                    key={store.id}
                    className="flex items-center justify-between p-4 bg-background-secondary rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-success/20 flex items-center justify-center">
                        <Store className="w-5 h-5 text-success" />
                      </div>
                      <div>
                        <p className="font-medium text-text-primary">{store.name}</p>
                        <p className="text-sm text-text-muted">{store.domain}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-text-primary">
                        {formatCurrency(store.revenue)}
                      </p>
                      <p className="text-xs text-text-muted">faturamento</p>
                    </div>
                    <Button variant="ghost" size="sm">
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabPanel>

        <TabPanel isActive={activeTab === 'financial'}>
          <Card>
            <CardHeader>
              <CardTitle>Histórico Financeiro</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockClient.invoices.map((invoice) => (
                  <div
                    key={invoice.id}
                    className="flex items-center justify-between p-4 bg-background-secondary rounded-lg"
                  >
                    <div>
                      <p className="font-medium text-text-primary">
                        {formatCurrency(invoice.amount)}
                      </p>
                      <p className="text-sm text-text-muted">
                        Vencimento: {formatDate(invoice.due_date)}
                      </p>
                    </div>
                    <div className="text-right">
                      <StatusBadge status={invoice.status as 'paid' | 'pending' | 'overdue'} />
                      {invoice.paid_date && (
                        <p className="text-xs text-text-muted mt-1">
                          Pago em {formatDate(invoice.paid_date)}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabPanel>

        <TabPanel isActive={activeTab === 'meetings'}>
          <Card>
            <CardHeader>
              <CardTitle>Histórico de Reuniões</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockClient.meetings.map((meeting) => (
                  <div
                    key={meeting.id}
                    className="flex items-center justify-between p-4 bg-background-secondary rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-brand-purple/20 flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-brand-purple" />
                      </div>
                      <div>
                        <p className="font-medium text-text-primary">
                          {formatDate(meeting.date)}
                        </p>
                        <p className="text-sm text-text-muted">{meeting.notes}</p>
                      </div>
                    </div>
                    <Badge variant="success">Realizada</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabPanel>

        <TabPanel isActive={activeTab === 'timeline'}>
          <Card>
            <CardHeader>
              <CardTitle>Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-px bg-border" />
                <div className="space-y-4">
                  {mockClient.timeline.map((item, index) => (
                    <div key={item.id} className="relative pl-10">
                      <div className="absolute left-2.5 w-3 h-3 rounded-full bg-brand-purple border-2 border-background" />
                      <div className="p-3 bg-background-secondary rounded-lg">
                        <p className="font-medium text-text-primary">{item.title}</p>
                        <p className="text-sm text-text-muted">{formatDate(item.date)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabPanel>

        <TabPanel isActive={activeTab === 'reports'}>
          <div className="flex items-center justify-center py-12 text-text-muted">
            <p>Relatórios em breve...</p>
          </div>
        </TabPanel>

        <TabPanel isActive={activeTab === 'metrics'}>
          <div className="flex items-center justify-center py-12 text-text-muted">
            <p>Métricas das integrações em breve...</p>
          </div>
        </TabPanel>
      </div>
    </MainLayout>
  );
}
