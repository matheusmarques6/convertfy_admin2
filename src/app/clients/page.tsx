'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
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
  Plus,
  Filter,
  Download,
  MoreHorizontal,
  ChevronRight,
  Phone,
  Mail,
  Calendar,
  TrendingUp,
  TrendingDown,
  Store,
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
      <div className="h-16 flex items-center justify-center border-b border-[#1F1F23]">
        <div className="relative w-10 h-10">
          <Image src="/logo.png" alt="Convertfy" fill className="object-contain" />
        </div>
      </div>
      <nav className="flex-1 py-4 px-3 flex flex-col gap-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`group relative w-12 h-12 mx-auto rounded-xl flex items-center justify-center transition-all ${
                isActive ? 'bg-gradient-to-br from-purple-500/20 to-cyan-500/10 text-purple-400' : 'text-zinc-500 hover:text-zinc-300 hover:bg-[#1F1F23]'
              }`}
            >
              {isActive && <div className="absolute left-[-12px] top-1/2 -translate-y-1/2 w-[3px] h-6 bg-gradient-to-b from-purple-500 to-cyan-500 rounded-r" />}
              <item.icon className="w-5 h-5" />
              <div className="absolute left-full ml-3 px-3 py-1.5 bg-[#1F1F23] border border-[#3F3F46] rounded-lg text-sm text-white opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50">
                {item.label}
              </div>
            </Link>
          );
        })}
      </nav>
      <div className="p-3 border-t border-[#1F1F23]">
        <div className="w-10 h-10 mx-auto rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center text-white font-semibold text-sm">AD</div>
      </div>
    </aside>
  );
}

// ============================================
// HEADER COMPONENT
// ============================================
function Header() {
  return (
    <header className="fixed top-0 left-[72px] right-0 h-16 bg-[#0C0C0E]/80 backdrop-blur-xl border-b border-[#1F1F23] flex items-center justify-between px-6 z-40">
      <div className="relative max-w-md flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
        <input type="text" placeholder="Buscar clientes..." className="w-full h-10 pl-10 pr-4 bg-[#18181B] border border-[#27272A] rounded-xl text-white text-sm placeholder:text-zinc-600 focus:outline-none focus:border-zinc-600" />
      </div>
      <div className="flex items-center gap-3">
        <button className="p-2 rounded-lg hover:bg-[#1F1F23] text-zinc-500 hover:text-white transition-colors">
          <RefreshCw className="w-5 h-5" />
        </button>
        <button className="relative p-2 rounded-lg hover:bg-[#1F1F23] text-zinc-500 hover:text-white transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">3</span>
        </button>
        <button className="h-10 px-4 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white rounded-xl text-sm font-medium flex items-center gap-2 shadow-lg shadow-purple-500/25 transition-all">
          <Plus className="w-4 h-4" />
          Novo Cliente
        </button>
      </div>
    </header>
  );
}

// ============================================
// MOCK DATA
// ============================================
const clients = [
  { id: '1', name: 'Tech Store Brasil', contact: 'Carlos Silva', email: 'carlos@techstore.com', phone: '(11) 99999-1234', status: 'active', health: 'healthy', plan: 'Premium', monthly: 5000, stores: 3, lastMeeting: '2024-01-10', nextMeeting: '2024-01-25', totalPaid: 45000 },
  { id: '2', name: 'Fashion Hub', contact: 'Ana Souza', email: 'ana@fashionhub.com', phone: '(21) 98888-5678', status: 'active', health: 'warning', plan: 'Standard', monthly: 3500, stores: 2, lastMeeting: '2023-12-15', nextMeeting: null, totalPaid: 28000 },
  { id: '3', name: 'Suplementos Pro', contact: 'Pedro Santos', email: 'pedro@suplepro.com', phone: '(31) 97777-9012', status: 'active', health: 'healthy', plan: 'Premium', monthly: 5000, stores: 2, lastMeeting: '2024-01-05', nextMeeting: '2024-01-20', totalPaid: 60000 },
  { id: '4', name: 'Pet World', contact: 'Julia Costa', email: 'julia@petworld.com', phone: '(41) 96666-3456', status: 'trial', health: 'healthy', plan: 'Basic', monthly: 2000, stores: 1, lastMeeting: '2024-01-12', nextMeeting: '2024-01-26', totalPaid: 2000 },
  { id: '5', name: 'Eletrônicos Plus', contact: 'Roberto Lima', email: 'roberto@eletroplus.com', phone: '(51) 95555-7890', status: 'paused', health: 'critical', plan: 'Standard', monthly: 3500, stores: 1, lastMeeting: '2023-11-20', nextMeeting: null, totalPaid: 35000 },
];

const formatCurrency = (v: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(v);

const getStatusBadge = (status: string) => {
  const styles: Record<string, string> = {
    active: 'bg-emerald-500/15 text-emerald-400',
    paused: 'bg-amber-500/15 text-amber-400',
    cancelled: 'bg-red-500/15 text-red-400',
    trial: 'bg-blue-500/15 text-blue-400',
  };
  const labels: Record<string, string> = { active: 'Ativo', paused: 'Pausado', cancelled: 'Cancelado', trial: 'Trial' };
  return <span className={`px-2 py-0.5 rounded text-xs font-medium ${styles[status] || styles.active}`}>{labels[status] || status}</span>;
};

const getHealthBadge = (health: string) => {
  const styles: Record<string, string> = {
    healthy: 'text-emerald-400',
    warning: 'text-amber-400',
    critical: 'text-red-400',
  };
  const icons: Record<string, string> = { healthy: '🟢', warning: '🟡', critical: '🔴' };
  return <span className={styles[health]}>{icons[health]}</span>;
};

// ============================================
// MAIN PAGE
// ============================================
export default function ClientsPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#0C0C0E]">
      <Sidebar />
      <Header />

      <main className="pt-16 pl-[72px]">
        <div className="p-6 space-y-6">
          {/* Page Header */}
          <div>
            <h1 className="text-2xl font-bold text-white">Clientes</h1>
            <p className="text-zinc-500 mt-1">Gerencie sua carteira de clientes</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-4 gap-4">
            <div className="rounded-2xl p-5 bg-gradient-to-br from-[#18181B] to-[#1F1F23] border border-white/[0.06]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-zinc-500 mb-1">Total de Clientes</p>
                  <p className="text-3xl font-bold text-white">{clients.length}</p>
                </div>
                <div className="w-11 h-11 rounded-xl bg-purple-500/15 flex items-center justify-center">
                  <Users className="w-5 h-5 text-purple-400" />
                </div>
              </div>
            </div>
            <div className="rounded-2xl p-5 bg-gradient-to-br from-[#18181B] to-[#1F1F23] border border-white/[0.06]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-zinc-500 mb-1">Clientes Ativos</p>
                  <p className="text-3xl font-bold text-white">{clients.filter(c => c.status === 'active').length}</p>
                </div>
                <div className="w-11 h-11 rounded-xl bg-emerald-500/15 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-emerald-400" />
                </div>
              </div>
            </div>
            <div className="rounded-2xl p-5 bg-gradient-to-br from-[#18181B] to-[#1F1F23] border border-white/[0.06]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-zinc-500 mb-1">Reuniões Atrasadas</p>
                  <p className="text-3xl font-bold text-white">{clients.filter(c => c.health === 'warning' || c.health === 'critical').length}</p>
                </div>
                <div className="w-11 h-11 rounded-xl bg-amber-500/15 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-amber-400" />
                </div>
              </div>
            </div>
            <div className="rounded-2xl p-5 bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-lg shadow-emerald-500/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-white/80 mb-1">MRR Total</p>
                  <p className="text-3xl font-bold text-white">{formatCurrency(clients.reduce((acc, c) => acc + (c.status !== 'cancelled' ? c.monthly : 0), 0))}</p>
                </div>
                <div className="w-11 h-11 rounded-xl bg-white/20 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <input type="text" placeholder="Buscar cliente..." className="h-10 pl-10 pr-4 bg-[#18181B] border border-[#27272A] rounded-xl text-white text-sm placeholder:text-zinc-600 focus:outline-none focus:border-zinc-600 w-64" />
              </div>
              <select className="h-10 px-4 bg-[#18181B] border border-[#27272A] rounded-xl text-white text-sm focus:outline-none focus:border-zinc-600 appearance-none cursor-pointer">
                <option value="">Todos os status</option>
                <option value="active">Ativos</option>
                <option value="paused">Pausados</option>
                <option value="trial">Trial</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <button className="h-10 px-4 bg-[#18181B] border border-[#27272A] rounded-xl text-zinc-400 text-sm font-medium flex items-center gap-2 hover:bg-[#1F1F23] hover:text-white transition-colors">
                <Filter className="w-4 h-4" />
                Filtros
              </button>
              <button className="h-10 px-4 bg-[#18181B] border border-[#27272A] rounded-xl text-zinc-400 text-sm font-medium flex items-center gap-2 hover:bg-[#1F1F23] hover:text-white transition-colors">
                <Download className="w-4 h-4" />
                Exportar
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="rounded-2xl bg-gradient-to-br from-[#18181B] to-[#1F1F23] border border-white/[0.06] overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr_1fr_80px] gap-4 px-6 py-4 text-[11px] font-semibold text-zinc-500 uppercase tracking-wide border-b border-[#27272A]">
              <div>Cliente</div>
              <div>Status</div>
              <div>Saúde</div>
              <div>Plano</div>
              <div className="text-right">Mensalidade</div>
              <div className="text-center">Lojas</div>
              <div className="text-right">Total Pago</div>
              <div></div>
            </div>

            {/* Table Body */}
            {clients.map((client) => (
              <div
                key={client.id}
                onClick={() => router.push(`/clients/${client.id}`)}
                className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr_1fr_80px] gap-4 px-6 py-4 items-center border-b border-[#27272A]/50 last:border-0 hover:bg-white/[0.02] cursor-pointer transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500/20 to-cyan-500/20 flex items-center justify-center text-white font-semibold text-sm">
                    {client.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </div>
                  <div>
                    <p className="font-medium text-white">{client.name}</p>
                    <p className="text-xs text-zinc-500">{client.contact}</p>
                  </div>
                </div>
                <div>{getStatusBadge(client.status)}</div>
                <div>{getHealthBadge(client.health)}</div>
                <div className="text-zinc-400 text-sm">{client.plan}</div>
                <div className="text-right font-medium text-white">{formatCurrency(client.monthly)}</div>
                <div className="text-center">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#27272A] rounded text-xs text-zinc-400">
                    <Store className="w-3 h-3" />
                    {client.stores}
                  </span>
                </div>
                <div className="text-right font-medium text-emerald-400">{formatCurrency(client.totalPaid)}</div>
                <div className="flex items-center justify-end">
                  <button className="p-2 rounded-lg hover:bg-[#27272A] text-zinc-500 hover:text-white transition-colors opacity-0 group-hover:opacity-100">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                  <ChevronRight className="w-4 h-4 text-zinc-600 group-hover:text-zinc-400 transition-colors" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
