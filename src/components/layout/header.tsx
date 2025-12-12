'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Search,
  Bell,
  RefreshCw,
} from 'lucide-react';

interface HeaderProps {
  sidebarCollapsed: boolean;
}

export const Header: React.FC<HeaderProps> = ({ sidebarCollapsed }) => {
  const [notifications] = React.useState(3);
  const [activePeriod, setActivePeriod] = React.useState('month');

  const periods = [
    { id: 'today', label: 'Hoje' },
    { id: 'yesterday', label: 'Ontem' },
    { id: 'week', label: '7 Dias' },
    { id: 'month', label: 'Este mês' },
  ];

  return (
    <header
      className={cn(
        'fixed top-0 right-0 h-16 bg-background/80 backdrop-blur-xl border-b border-border z-40 flex items-center justify-between px-6 transition-all duration-300',
        'left-[72px]'
      )}
    >
      {/* Search */}
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
          <input
            type="text"
            placeholder="Buscar clientes, deals..."
            className="w-full h-10 pl-10 pr-4 bg-surface border border-border rounded-xl text-text-primary text-sm placeholder:text-text-muted focus:outline-none focus:border-brand-purple/50 focus:ring-1 focus:ring-brand-purple/20 transition-all"
          />
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        {/* Period Filter */}
        <div className="period-filter">
          {periods.map((period) => (
            <button
              key={period.id}
              onClick={() => setActivePeriod(period.id)}
              className={cn('period-btn', activePeriod === period.id && 'active')}
            >
              {period.label}
            </button>
          ))}
        </div>

        {/* Refresh */}
        <button className="p-2 rounded-lg hover:bg-surface transition-colors text-text-muted hover:text-text-primary">
          <RefreshCw className="w-5 h-5" />
        </button>

        {/* Notifications */}
        <button className="relative p-2 rounded-lg hover:bg-surface transition-colors text-text-muted hover:text-text-primary">
          <Bell className="w-5 h-5" />
          {notifications > 0 && (
            <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-error text-white text-[10px] font-bold rounded-full flex items-center justify-center">
              {notifications}
            </span>
          )}
        </button>
      </div>
    </header>
  );
};
