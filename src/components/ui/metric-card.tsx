'use client';

import * as React from 'react';
import { cn, formatCurrency, formatNumber, formatPercent } from '@/lib/utils';
import { TrendingUp, TrendingDown, LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: number;
  previousValue?: number;
  format?: 'currency' | 'number' | 'percent';
  icon?: LucideIcon;
  iconColor?: 'green' | 'purple' | 'blue' | 'cyan' | 'yellow' | 'red';
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: number;
  subtitle?: string;
  highlighted?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  previousValue,
  format = 'number',
  icon: Icon,
  iconColor = 'purple',
  trend,
  trendValue,
  subtitle,
  highlighted = false,
  className,
  size = 'md',
}) => {
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

  const iconColorClasses = {
    green: 'icon-circle-green',
    purple: 'icon-circle-purple',
    blue: 'icon-circle-blue',
    cyan: 'icon-circle-cyan',
    yellow: 'icon-circle-yellow',
    red: 'icon-circle-red',
  };

  const sizeClasses = {
    sm: 'p-4',
    md: 'p-5',
    lg: 'p-6',
  };

  const valueSizeClasses = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-3xl',
  };

  if (highlighted) {
    return (
      <div className={cn('card-highlight', sizeClasses[size], className)}>
        <div className="flex items-start justify-between mb-3">
          <span className="text-sm font-medium text-white/80">{title}</span>
          {Icon && (
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
              <Icon className="w-5 h-5 text-white" />
            </div>
          )}
        </div>
        
        <div className={cn('font-bold text-white mb-1', valueSizeClasses[size])}>
          {formattedValue}
        </div>
        
        {(calculatedTrendValue !== 0 || subtitle) && (
          <div className="flex items-center gap-2">
            {calculatedTrendValue !== 0 && (
              <span className={cn(
                'flex items-center gap-1 text-sm font-medium',
                calculatedTrend === 'up' ? 'text-white' : 'text-white/80'
              )}>
                {calculatedTrend === 'up' ? (
                  <TrendingUp className="w-4 h-4" />
                ) : (
                  <TrendingDown className="w-4 h-4" />
                )}
                {formatPercent(Math.abs(calculatedTrendValue))}
              </span>
            )}
            {subtitle && (
              <span className="text-sm text-white/60">{subtitle}</span>
            )}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={cn('card-dark', sizeClasses[size], className)}>
      <div className="flex items-start justify-between mb-3">
        <span className="text-sm font-medium text-text-muted">{title}</span>
        {Icon && (
          <div className={cn('icon-circle', iconColorClasses[iconColor])}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>
      
      <div className={cn('font-bold text-text-primary mb-1', valueSizeClasses[size])}>
        {formattedValue}
      </div>
      
      {(calculatedTrendValue !== 0 || subtitle) && (
        <div className="flex items-center gap-2">
          {calculatedTrendValue !== 0 && (
            <span className={cn(
              'flex items-center gap-1 text-sm font-medium',
              calculatedTrend === 'up' ? 'text-success' : 'text-error'
            )}>
              {calculatedTrend === 'up' ? (
                <TrendingUp className="w-3.5 h-3.5" />
              ) : (
                <TrendingDown className="w-3.5 h-3.5" />
              )}
              {formatPercent(Math.abs(calculatedTrendValue))}
            </span>
          )}
          {subtitle && (
            <span className="text-xs text-text-muted">{subtitle}</span>
          )}
        </div>
      )}
    </div>
  );
};

// Store Performance Row (like BK dashboard)
interface StoreRowProps {
  name: string;
  icon?: string;
  orders: number;
  revenue: number;
  cost: number;
  profit: number;
  margin: number;
}

export const StoreRow: React.FC<StoreRowProps> = ({
  name,
  icon = '🛒',
  orders,
  revenue,
  cost,
  profit,
  margin,
}) => {
  const isPositive = profit >= 0;
  const progressWidth = Math.min(Math.abs(margin), 100);

  return (
    <div className="table-row grid-cols-[1fr_80px_120px_120px_120px_100px] gap-4">
      <div className="flex items-center gap-3">
        <span className="text-lg">{icon}</span>
        <span className="font-medium text-text-primary">{name}</span>
      </div>
      <div className="text-right text-text-secondary">
        {formatNumber(orders)}
      </div>
      <div className="text-right text-text-primary font-medium">
        {formatCurrency(revenue)}
      </div>
      <div className="text-right text-text-secondary">
        {formatCurrency(cost)}
      </div>
      <div className={cn(
        'text-right font-semibold',
        isPositive ? 'text-success' : 'text-error'
      )}>
        {formatCurrency(profit)}
      </div>
      <div className="flex items-center gap-2">
        <div className="flex-1 progress-bar">
          <div 
            className={cn('progress-bar-fill', isPositive ? 'progress-green' : 'progress-red')}
            style={{ width: `${progressWidth}%` }}
          />
        </div>
        <span className={cn(
          'text-sm font-medium w-14 text-right',
          isPositive ? 'text-success' : 'text-error'
        )}>
          {margin.toFixed(1)}%
        </span>
      </div>
    </div>
  );
};

// Gauge Chart Component
interface GaugeCardProps {
  title: string;
  value: number;
  max: number;
  label?: string;
  color?: string;
}

export const GaugeCard: React.FC<GaugeCardProps> = ({
  title,
  value,
  max,
  label,
  color = '#10B981',
}) => {
  const percentage = Math.min((value / max) * 100, 100);
  const circumference = 2 * Math.PI * 36;
  const strokeDasharray = `${(percentage / 100) * circumference} ${circumference}`;

  return (
    <div className="card-dark p-5 text-center">
      <h3 className="text-sm font-medium text-text-muted mb-4">{title}</h3>
      <div className="relative w-24 h-24 mx-auto mb-3">
        <svg className="w-full h-full" viewBox="0 0 80 80">
          <defs>
            <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10B981" />
              <stop offset="100%" stopColor="#34D399" />
            </linearGradient>
          </defs>
          <circle
            className="gauge-circle-bg"
            cx="40"
            cy="40"
            r="36"
          />
          <circle
            className="gauge-circle-fill"
            cx="40"
            cy="40"
            r="36"
            strokeDasharray={strokeDasharray}
            style={{ stroke: color }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold text-success">{percentage.toFixed(0)}%</span>
        </div>
      </div>
      {label && (
        <p className="text-xs text-text-muted">{label}</p>
      )}
      <p className="text-lg font-semibold text-success mt-1">
        {formatCurrency(max)}
      </p>
    </div>
  );
};
