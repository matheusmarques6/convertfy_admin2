'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Users,
  BarChart3,
  Kanban,
  Zap,
  Wrench,
  Settings,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import Image from 'next/image';

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
  badge?: number;
}

const navItems: NavItem[] = [
  { label: 'Dashboard', href: '/', icon: LayoutDashboard },
  { label: 'Clientes', href: '/clients', icon: Users },
  { label: 'Métricas', href: '/metrics', icon: BarChart3 },
  { label: 'Pipeline', href: '/pipeline', icon: Kanban },
  { label: 'Automações', href: '/automations', icon: Zap },
  { label: 'Hub', href: '/hub', icon: Wrench },
  { label: 'Configurações', href: '/settings', icon: Settings },
];

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ collapsed, onToggle }) => {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 h-screen bg-background-secondary border-r border-border flex flex-col z-50 transition-all duration-300',
        collapsed ? 'w-[72px]' : 'w-[240px]'
      )}
    >
      {/* Logo */}
      <div className={cn(
        'h-16 flex items-center border-b border-border px-4',
        collapsed ? 'justify-center' : 'justify-between'
      )}>
        <Link href="/" className="flex items-center gap-3">
          <div className="relative w-10 h-10 flex-shrink-0">
            <Image
              src="/logo.png"
              alt="Convertfy"
              fill
              className="object-contain"
            />
          </div>
          {!collapsed && (
            <span className="font-bold text-lg gradient-text">Convertfy</span>
          )}
        </Link>
        {!collapsed && (
          <button
            onClick={onToggle}
            className="p-1.5 rounded-lg hover:bg-surface transition-colors text-text-muted hover:text-text-primary"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href || 
            (item.href !== '/' && pathname.startsWith(item.href));
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group relative',
                isActive
                  ? 'bg-gradient-to-r from-brand-purple/20 to-brand-cyan/20 text-text-primary'
                  : 'text-text-secondary hover:text-text-primary hover:bg-surface',
                collapsed && 'justify-center px-0'
              )}
            >
              {/* Active indicator */}
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-gradient-to-b from-brand-purple to-brand-cyan rounded-r-full" />
              )}
              
              <item.icon className={cn(
                'w-5 h-5 flex-shrink-0',
                isActive && 'text-brand-purple'
              )} />
              
              {!collapsed && (
                <>
                  <span className="font-medium text-sm">{item.label}</span>
                  {item.badge && item.badge > 0 && (
                    <span className="ml-auto px-2 py-0.5 text-xs font-medium rounded-full bg-error text-white">
                      {item.badge}
                    </span>
                  )}
                </>
              )}

              {/* Tooltip for collapsed state */}
              {collapsed && (
                <div className="absolute left-full ml-2 px-2 py-1 bg-surface border border-border rounded-md text-sm font-medium text-text-primary opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50">
                  {item.label}
                </div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Collapse button (when collapsed) */}
      {collapsed && (
        <div className="p-3 border-t border-border">
          <button
            onClick={onToggle}
            className="w-full p-2.5 rounded-lg hover:bg-surface transition-colors text-text-muted hover:text-text-primary flex items-center justify-center"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* User section */}
      {!collapsed && (
        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-surface cursor-pointer transition-colors">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-brand-purple to-brand-cyan flex items-center justify-center text-white font-medium text-sm">
              AD
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-text-primary truncate">Admin</p>
              <p className="text-xs text-text-muted truncate">admin@convertfy.com</p>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};
