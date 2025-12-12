'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { MainLayout } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DataTable } from '@/components/ui/data-table';
import { Badge, StatusBadge, HealthBadge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';
import { formatCurrency, formatDate } from '@/lib/utils';
import type { Client } from '@/types';
import {
  Plus,
  Search,
  Filter,
  Download,
  MoreHorizontal,
  Building2,
  Store,
  Calendar,
} from 'lucide-react';

// Mock data - será substituído por dados do Supabase
const mockClients: Client[] = [
  {
    id: '1',
    name: 'Carlos Silva',
    company_name: 'Tech Store Brasil',
    email: 'carlos@techstore.com.br',
    phone: '(11) 99999-1234',
    whatsapp: '5511999991234',
    status: 'active',
    health_score: 'healthy',
    contract_type: 'Premium',
    monthly_value: 5000,
    total_paid: 60000,
    stores_count: 2,
    meeting_frequency: 'monthly',
    last_meeting_date: '2024-01-10',
    next_meeting_date: '2024-02-10',
    meeting_status: 'on_track',
    contract_start_date: '2023-01-01',
    contract_end_date: '2024-12-31',
    tags: ['ecommerce', 'shopify'],
    created_at: '2023-01-01T00:00:00Z',
    updated_at: '2024-01-15T00:00:00Z',
  },
  {
    id: '2',
    name: 'Maria Santos',
    company_name: 'Fashion Hub',
    email: 'maria@fashionhub.com.br',
    phone: '(21) 98888-5678',
    status: 'active',
    health_score: 'warning',
    contract_type: 'Standard',
    monthly_value: 3000,
    total_paid: 24000,
    stores_count: 1,
    meeting_frequency: 'biweekly',
    last_meeting_date: '2024-01-05',
    next_meeting_date: '2024-01-19',
    meeting_status: 'delayed',
    tags: ['moda', 'dropshipping'],
    created_at: '2023-03-15T00:00:00Z',
    updated_at: '2024-01-12T00:00:00Z',
  },
  {
    id: '3',
    name: 'João Oliveira',
    company_name: 'Suplementos Pro',
    email: 'joao@suplementospro.com.br',
    status: 'active',
    health_score: 'healthy',
    contract_type: 'Premium',
    monthly_value: 4500,
    total_paid: 45000,
    stores_count: 3,
    meeting_frequency: 'monthly',
    last_meeting_date: '2024-01-08',
    meeting_status: 'on_track',
    tags: ['suplementos', 'fitness'],
    created_at: '2023-02-01T00:00:00Z',
    updated_at: '2024-01-10T00:00:00Z',
  },
  {
    id: '4',
    name: 'Ana Costa',
    company_name: 'Pet World',
    email: 'ana@petworld.com.br',
    status: 'paused',
    health_score: 'critical',
    contract_type: 'Basic',
    monthly_value: 2000,
    total_paid: 12000,
    stores_count: 1,
    meeting_frequency: 'monthly',
    meeting_status: 'delayed',
    tags: ['pet', 'ecommerce'],
    created_at: '2023-06-01T00:00:00Z',
    updated_at: '2024-01-05T00:00:00Z',
  },
  {
    id: '5',
    name: 'Pedro Mendes',
    company_name: 'Eletrônicos Plus',
    email: 'pedro@eletronicosplus.com.br',
    status: 'active',
    health_score: 'healthy',
    contract_type: 'Enterprise',
    monthly_value: 8000,
    total_paid: 96000,
    stores_count: 5,
    meeting_frequency: 'weekly',
    last_meeting_date: '2024-01-12',
    next_meeting_date: '2024-01-19',
    meeting_status: 'scheduled',
    tags: ['eletrônicos', 'marketplace'],
    created_at: '2022-12-01T00:00:00Z',
    updated_at: '2024-01-14T00:00:00Z',
  },
];

export default function ClientsPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState<string>('all');

  const filteredClients = React.useMemo(() => {
    return mockClients.filter((client) => {
      const matchesSearch =
        client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        client.company_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        client.email.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        statusFilter === 'all' || client.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [searchQuery, statusFilter]);

  const columns = [
    {
      key: 'name',
      header: 'Cliente',
      sortable: true,
      render: (client: Client) => (
        <div className="flex items-center gap-3">
          <Avatar name={client.name} size="sm" />
          <div>
            <p className="font-medium text-text-primary">{client.name}</p>
            <p className="text-xs text-text-muted flex items-center gap-1">
              <Building2 className="w-3 h-3" />
              {client.company_name}
            </p>
          </div>
        </div>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      render: (client: Client) => <StatusBadge status={client.status} />,
    },
    {
      key: 'health_score',
      header: 'Saúde',
      sortable: true,
      render: (client: Client) => <HealthBadge score={client.health_score} />,
    },
    {
      key: 'contract_type',
      header: 'Plano',
      sortable: true,
      render: (client: Client) => (
        <Badge variant="purple">{client.contract_type}</Badge>
      ),
    },
    {
      key: 'monthly_value',
      header: 'Mensalidade',
      sortable: true,
      render: (client: Client) => (
        <span className="font-medium">{formatCurrency(client.monthly_value)}</span>
      ),
    },
    {
      key: 'stores_count',
      header: 'Lojas',
      sortable: true,
      render: (client: Client) => (
        <div className="flex items-center gap-1 text-text-secondary">
          <Store className="w-4 h-4" />
          {client.stores_count}
        </div>
      ),
    },
    {
      key: 'meeting_status',
      header: 'Reunião',
      sortable: true,
      render: (client: Client) => (
        <div className="flex items-center gap-2">
          <StatusBadge status={client.meeting_status} />
          {client.next_meeting_date && (
            <span className="text-xs text-text-muted flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {formatDate(client.next_meeting_date)}
            </span>
          )}
        </div>
      ),
    },
    {
      key: 'total_paid',
      header: 'Total Pago',
      sortable: true,
      render: (client: Client) => (
        <span className="text-success font-medium">
          {formatCurrency(client.total_paid)}
        </span>
      ),
    },
    {
      key: 'actions',
      header: '',
      width: 'w-12',
      render: () => (
        <button className="p-1 rounded hover:bg-surface-hover transition-colors">
          <MoreHorizontal className="w-4 h-4 text-text-muted" />
        </button>
      ),
    },
  ];

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-text-primary">Clientes</h1>
            <p className="text-text-secondary mt-1">
              Gerencie todos os clientes da Convertfy
            </p>
          </div>
          <Button leftIcon={<Plus className="w-4 h-4" />}>
            Novo Cliente
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-surface border border-border rounded-xl p-4">
            <p className="text-sm text-text-secondary">Total de Clientes</p>
            <p className="text-2xl font-bold text-text-primary mt-1">
              {mockClients.length}
            </p>
          </div>
          <div className="bg-surface border border-border rounded-xl p-4">
            <p className="text-sm text-text-secondary">Clientes Ativos</p>
            <p className="text-2xl font-bold text-success mt-1">
              {mockClients.filter((c) => c.status === 'active').length}
            </p>
          </div>
          <div className="bg-surface border border-border rounded-xl p-4">
            <p className="text-sm text-text-secondary">Reuniões Atrasadas</p>
            <p className="text-2xl font-bold text-error mt-1">
              {mockClients.filter((c) => c.meeting_status === 'delayed').length}
            </p>
          </div>
          <div className="bg-surface border border-border rounded-xl p-4">
            <p className="text-sm text-text-secondary">MRR Total</p>
            <p className="text-2xl font-bold text-brand-purple mt-1">
              {formatCurrency(
                mockClients
                  .filter((c) => c.status === 'active')
                  .reduce((acc, c) => acc + c.monthly_value, 0)
              )}
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-4">
          <div className="flex-1 max-w-md">
            <Input
              placeholder="Buscar por nome, empresa ou email..."
              leftIcon={<Search className="w-4 h-4" />}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="h-10 px-3 bg-surface border border-border rounded-lg text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-brand-purple/50"
            >
              <option value="all">Todos os status</option>
              <option value="active">Ativos</option>
              <option value="paused">Pausados</option>
              <option value="cancelled">Cancelados</option>
              <option value="trial">Trial</option>
            </select>
            <Button variant="secondary" leftIcon={<Filter className="w-4 h-4" />}>
              Filtros
            </Button>
            <Button variant="secondary" leftIcon={<Download className="w-4 h-4" />}>
              Exportar
            </Button>
          </div>
        </div>

        {/* Data Table */}
        <DataTable
          columns={columns}
          data={filteredClients}
          onRowClick={(client) => router.push(`/clients/${client.id}`)}
          emptyMessage="Nenhum cliente encontrado"
        />
      </div>
    </MainLayout>
  );
}
