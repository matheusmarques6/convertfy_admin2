'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

interface Tab {
  id: string;
  label: string;
  icon?: React.ReactNode;
  badge?: number;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export const Tabs: React.FC<TabsProps> = ({ tabs, activeTab, onTabChange }) => {
  return (
    <div className="border-b border-border">
      <nav className="flex gap-1 -mb-px" aria-label="Tabs">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                'relative px-4 py-3 text-sm font-medium transition-all duration-200 flex items-center gap-2',
                isActive
                  ? 'text-brand-purple'
                  : 'text-text-secondary hover:text-text-primary'
              )}
            >
              {tab.icon}
              {tab.label}
              {tab.badge !== undefined && tab.badge > 0 && (
                <span
                  className={cn(
                    'px-1.5 py-0.5 text-xs font-medium rounded-full',
                    isActive
                      ? 'bg-brand-purple/20 text-brand-purple'
                      : 'bg-surface text-text-muted'
                  )}
                >
                  {tab.badge}
                </span>
              )}
              {isActive && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-brand-purple to-brand-cyan" />
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
};

interface TabPanelProps {
  children: React.ReactNode;
  isActive: boolean;
}

export const TabPanel: React.FC<TabPanelProps> = ({ children, isActive }) => {
  if (!isActive) return null;
  return <div className="py-6 animate-fade-in">{children}</div>;
};
