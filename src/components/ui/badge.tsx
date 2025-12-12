'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info' | 'purple' | 'cyan';
  size?: 'sm' | 'md';
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'default', size = 'md', ...props }, ref) => {
    const variants = {
      default: 'bg-surface text-text-secondary border-border',
      success: 'bg-success/20 text-success border-success/30',
      warning: 'bg-warning/20 text-warning border-warning/30',
      error: 'bg-error/20 text-error border-error/30',
      info: 'bg-info/20 text-info border-info/30',
      purple: 'bg-brand-purple/20 text-brand-purple border-brand-purple/30',
      cyan: 'bg-brand-cyan/20 text-brand-cyan border-brand-cyan/30',
    };

    const sizes = {
      sm: 'px-2 py-0.5 text-xs',
      md: 'px-2.5 py-1 text-xs',
    };

    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center font-medium rounded-full border',
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      />
    );
  }
);

Badge.displayName = 'Badge';

// Status Badge específico para status de clientes
interface StatusBadgeProps {
  status: 'active' | 'paused' | 'cancelled' | 'trial' | 'on_track' | 'delayed' | 'scheduled' | 'pending' | 'paid' | 'overdue';
}

const statusConfig: Record<string, { label: string; variant: BadgeProps['variant'] }> = {
  active: { label: 'Ativo', variant: 'success' },
  paused: { label: 'Pausado', variant: 'warning' },
  cancelled: { label: 'Cancelado', variant: 'error' },
  trial: { label: 'Trial', variant: 'info' },
  on_track: { label: 'Em dia', variant: 'success' },
  delayed: { label: 'Atrasado', variant: 'error' },
  scheduled: { label: 'Agendado', variant: 'info' },
  pending: { label: 'Pendente', variant: 'warning' },
  paid: { label: 'Pago', variant: 'success' },
  overdue: { label: 'Vencido', variant: 'error' },
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const config = statusConfig[status] || { label: status, variant: 'default' as const };
  return <Badge variant={config.variant}>{config.label}</Badge>;
};

// Health Score Badge
interface HealthBadgeProps {
  score: 'healthy' | 'warning' | 'critical';
}

const healthConfig: Record<string, { emoji: string; label: string; variant: BadgeProps['variant'] }> = {
  healthy: { emoji: '🟢', label: 'Saudável', variant: 'success' },
  warning: { emoji: '🟡', label: 'Atenção', variant: 'warning' },
  critical: { emoji: '🔴', label: 'Crítico', variant: 'error' },
};

export const HealthBadge: React.FC<HealthBadgeProps> = ({ score }) => {
  const config = healthConfig[score];
  return (
    <Badge variant={config.variant}>
      <span className="mr-1">{config.emoji}</span>
      {config.label}
    </Badge>
  );
};
