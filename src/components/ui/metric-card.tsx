'use client';

import * as React from 'react';
import { cn, formatCurrency, formatNumber, formatPercent } from '@/lib/utils';
import { TrendingUp, TrendingDown, Minus, LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: number;
  previousValue?: number;
  format?: 'currency' | 'number' | 'percent';
  icon?: LucideIcon;
  iconColor?: string;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: number;
  subtitle?: string;
  highlighted?: boolean;
  className?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  previousValue,
  format = 'number',
  icon: Icon,
  iconColor = 'text-brand-purple',
  trend,
  trendValue,
  subtitle,
  highlighted = false,
  className,
}) => {
  // Calcula a tendência automaticamente se não for fornecida
  const calculatedTrend = trend || (previousValue !== undefined
    ? value > previousValue ? 'up' : value < previousValue ? 'down' : 'neutral'
    : 'neutral');

  const calculatedTrendValue = trendValue !== undefined
    ? trendValue
    : previousValue !== undefined && previousValue !== 0
      ? ((value - previousValue) / previousValue) * 100
      : 0;

  const formattedValue = format === 'currency'
    ? formatCurrency(value)
    : format === 'percent'
      ? `${value.toFixed(1)}%`
      : formatNumber(value);

  const TrendIcon = calculatedTrend === 'up'
    ? TrendingUp
    : calculatedTrend === 'down'
      ? TrendingDown
      : Minus;

  const trendColor = calculatedTrend === 'up'
    ? 'text-success'
    : calculatedTrend === 'down'
      ? 'text-error'
      : 'text-text-muted';

  return (
    <div
      className={cn(
        'relative rounded-xl p-5 transition-all duration-200 overflow-hidden',
        highlighted
          ? 'bg-gradient-to-br from-brand-purple to-brand-cyan'
          : 'bg-surface border border-border hover:border-border-light',
        className
      )}
    >
      {/* Background glow effect for highlighted cards */}
      {highlighted && (
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
      )}

      <div className="relative z-10">
        {/* Header with icon */}
        <div className="flex items-center justify-between mb-3">
          <span className={cn(
            'text-sm font-medium',
            highlighted ? 'text-white/80' : 'text-text-secondary'
          )}>
            {title}
          </span>
          {Icon && (
            <div className={cn(
              'w-10 h-10 rounded-lg flex items-center justify-center',
              highlighted ? 'bg-white/20' : 'bg-background-secondary'
            )}>
              <Icon className={cn('w-5 h-5', highlighted ? 'text-white' : iconColor)} />
            </div>
          )}
        </div>

        {/* Value */}
        <div className={cn(
          'text-2xl font-bold mb-1',
          highlighted ? 'text-white' : 'text-text-primary'
        )}>
          {formattedValue}
        </div>

        {/* Trend and subtitle */}
        <div className="flex items-center gap-2">
          {calculatedTrendValue !== 0 && (
            <div className={cn('flex items-center gap-1 text-sm', trendColor)}>
              <TrendIcon className="w-4 h-4" />
              <span>{formatPercent(Math.abs(calculatedTrendValue))}</span>
            </div>
          )}
          {subtitle && (
            <span className={cn(
              'text-sm',
              highlighted ? 'text-white/60' : 'text-text-muted'
            )}>
              {subtitle}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

// Compact version for smaller displays
interface MetricCardCompactProps {
  label: string;
  value: string | number;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: number;
}

export const MetricCardCompact: React.FC<MetricCardCompactProps> = ({
  label,
  value,
  trend = 'neutral',
  trendValue,
}) => {
  const trendColor = trend === 'up'
    ? 'text-success'
    : trend === 'down'
      ? 'text-error'
      : 'text-text-muted';

  return (
    <div className="flex items-center justify-between py-3 border-b border-border last:border-0">
      <span className="text-sm text-text-secondary">{label}</span>
      <div className="flex items-center gap-2">
        <span className="font-semibold text-text-primary">{value}</span>
        {trendValue !== undefined && (
          <span className={cn('text-xs', trendColor)}>
            {formatPercent(trendValue)}
          </span>
        )}
      </div>
    </div>
  );
};
