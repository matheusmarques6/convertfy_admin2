'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { LucideIcon, AlertTriangle, Clock, FileText, Calendar, ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface Alert {
  id: string;
  type: 'meeting_delayed' | 'payment_pending' | 'contract_expiring' | 'report_pending';
  title: string;
  description: string;
  count?: number;
  href: string;
}

interface AlertCardProps {
  alerts: Alert[];
}

const alertConfig: Record<Alert['type'], { icon: LucideIcon; color: string; bgColor: string }> = {
  meeting_delayed: { 
    icon: Clock, 
    color: 'text-error', 
    bgColor: 'bg-error/10' 
  },
  payment_pending: { 
    icon: AlertTriangle, 
    color: 'text-warning', 
    bgColor: 'bg-warning/10' 
  },
  contract_expiring: { 
    icon: Calendar, 
    color: 'text-info', 
    bgColor: 'bg-info/10' 
  },
  report_pending: { 
    icon: FileText, 
    color: 'text-brand-purple', 
    bgColor: 'bg-brand-purple/10' 
  },
};

export const AlertCard: React.FC<AlertCardProps> = ({ alerts }) => {
  if (alerts.length === 0) {
    return (
      <div className="bg-surface border border-border rounded-xl p-5">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Alertas</h3>
        <div className="flex items-center justify-center py-8 text-text-muted">
          <p>Nenhum alerta no momento 🎉</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-surface border border-border rounded-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-text-primary">Alertas</h3>
        <span className="px-2 py-1 text-xs font-medium rounded-full bg-error/20 text-error">
          {alerts.length} pendentes
        </span>
      </div>
      
      <div className="space-y-3">
        {alerts.map((alert) => {
          const config = alertConfig[alert.type];
          const Icon = config.icon;
          
          return (
            <Link
              key={alert.id}
              href={alert.href}
              className="flex items-center gap-3 p-3 rounded-lg bg-background-secondary hover:bg-background-tertiary transition-colors group"
            >
              <div className={cn('p-2 rounded-lg', config.bgColor)}>
                <Icon className={cn('w-4 h-4', config.color)} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-text-primary truncate">
                  {alert.title}
                </p>
                <p className="text-xs text-text-muted truncate">
                  {alert.description}
                </p>
              </div>
              {alert.count && (
                <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-surface text-text-secondary">
                  {alert.count}
                </span>
              )}
              <ChevronRight className="w-4 h-4 text-text-muted group-hover:text-text-primary transition-colors" />
            </Link>
          );
        })}
      </div>
    </div>
  );
};
