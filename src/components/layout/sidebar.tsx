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
  Bell,
  HelpCircle,
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
];

const bottomNavItems: NavItem[] = [
  { label: 'Configurações', href: '/settings', icon: Settings },
];

export const Sidebar: React.FC<{ collapsed: boolean; onToggle: () => void }> = ({ collapsed }) => {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 h-screen bg-background-secondary z-50 flex flex-col transition-all duration-300 border-r border-border',
        collapsed ? 'w-[72px]' : 'w-[72px]'
      )}
    >
      {/* Logo */}
      <div className="h-16 flex items-center justify-center border-b border-border">
        <Link href="/" className="flex items-center justify-center">
          <div className="relative w-10 h-10">
            <Image
              src="/logo.png"
              alt="Convertfy"
              fill
              className="object-contain"
            />
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-3 flex flex-col gap-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href || 
            (item.href !== '/' && pathname.startsWith(item.href));
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'group relative flex items-center justify-center w-[48px] h-[48px] mx-auto rounded-xl transition-all duration-200',
                isActive
                  ? 'bg-gradient-to-br from-brand-purple/20 to-brand-cyan/20 text-brand-purple'
                  : 'text-text-muted hover:text-text-primary hover:bg-surface'
              )}
            >
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 w-1 h-6 bg-gradient-to-b from-brand-purple to-brand-cyan rounded-r-full" />
              )}
              
              <item.icon className="w-5 h-5" />

              {/* Tooltip */}
              <div className="absolute left-full ml-3 px-3 py-1.5 bg-surface border border-border rounded-lg text-sm font-medium text-text-primary opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50 shadow-lg">
                {item.label}
                <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-surface" />
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Bottom Navigation */}
      <div className="py-4 px-3 border-t border-border flex flex-col gap-1">
        {bottomNavItems.map((item) => {
          const isActive = pathname === item.href;
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'group relative flex items-center justify-center w-[48px] h-[48px] mx-auto rounded-xl transition-all duration-200',
                isActive
                  ? 'bg-surface text-text-primary'
                  : 'text-text-muted hover:text-text-primary hover:bg-surface'
              )}
            >
              <item.icon className="w-5 h-5" />

              <div className="absolute left-full ml-3 px-3 py-1.5 bg-surface border border-border rounded-lg text-sm font-medium text-text-primary opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50 shadow-lg">
                {item.label}
              </div>
            </Link>
          );
        })}

        {/* User Avatar */}
        <div className="mt-2 flex items-center justify-center">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-purple to-brand-cyan flex items-center justify-center text-white font-semibold text-sm cursor-pointer hover:opacity-90 transition-opacity">
            AD
          </div>
        </div>
      </div>
    </aside>
  );
};
