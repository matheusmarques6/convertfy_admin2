'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Search,
  Bell,
  Plus,
  Calendar,
} from 'lucide-react';

interface HeaderProps {
  sidebarCollapsed: boolean;
}

export const Header: React.FC<HeaderProps> = ({ sidebarCollapsed }) => {
  const [notifications] = React.useState(3); // Mock notifications count

  return (
    <header
      className={cn(
        'fixed top-0 right-0 h-16 bg-background-secondary/80 backdrop-blur-md border-b border-border z-40 flex items-center justify-between px-6 transition-all duration-300',
        sidebarCollapsed ? 'left-[72px]' : 'left-[240px]'
      )}
    >
      {/* Search */}
      <div className="flex-1 max-w-md">
        <Input
          placeholder="Buscar clientes, deals, métricas..."
          leftIcon={<Search className="w-4 h-4" />}
          className="bg-surface border-border"
        />
      </div>

      {/* Right side actions */}
      <div className="flex items-center gap-3">
        {/* Date filter */}
        <Button variant="secondary" size="sm" leftIcon={<Calendar className="w-4 h-4" />}>
          Este mês
        </Button>

        {/* Notifications */}
        <button className="relative p-2 rounded-lg hover:bg-surface transition-colors text-text-secondary hover:text-text-primary">
          <Bell className="w-5 h-5" />
          {notifications > 0 && (
            <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-error text-white text-xs font-medium rounded-full flex items-center justify-center">
              {notifications}
            </span>
          )}
        </button>

        {/* Quick action */}
        <Button size="sm" leftIcon={<Plus className="w-4 h-4" />}>
          Novo Cliente
        </Button>
      </div>
    </header>
  );
};
