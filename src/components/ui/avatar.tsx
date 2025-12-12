'use client';

import * as React from 'react';
import { cn, getInitials } from '@/lib/utils';
import Image from 'next/image';

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string | null;
  name: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const Avatar: React.FC<AvatarProps> = ({ 
  src, 
  name, 
  size = 'md', 
  className,
  ...props 
}) => {
  const sizes = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
    xl: 'w-16 h-16 text-lg',
  };

  const imageSizes = {
    sm: 32,
    md: 40,
    lg: 48,
    xl: 64,
  };

  return (
    <div
      className={cn(
        'relative rounded-full overflow-hidden flex items-center justify-center bg-gradient-to-br from-brand-purple to-brand-cyan font-medium text-white',
        sizes[size],
        className
      )}
      {...props}
    >
      {src ? (
        <Image
          src={src}
          alt={name}
          width={imageSizes[size]}
          height={imageSizes[size]}
          className="object-cover w-full h-full"
        />
      ) : (
        <span>{getInitials(name)}</span>
      )}
    </div>
  );
};

// Avatar Group para mostrar múltiplos avatares
interface AvatarGroupProps {
  users: Array<{ name: string; avatar_url?: string | null }>;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
}

export const AvatarGroup: React.FC<AvatarGroupProps> = ({ 
  users, 
  max = 4, 
  size = 'md' 
}) => {
  const visibleUsers = users.slice(0, max);
  const remainingCount = users.length - max;

  return (
    <div className="flex -space-x-2">
      {visibleUsers.map((user, index) => (
        <Avatar
          key={index}
          src={user.avatar_url}
          name={user.name}
          size={size}
          className="ring-2 ring-background"
        />
      ))}
      {remainingCount > 0 && (
        <div
          className={cn(
            'relative rounded-full flex items-center justify-center bg-surface border border-border font-medium text-text-secondary ring-2 ring-background',
            size === 'sm' && 'w-8 h-8 text-xs',
            size === 'md' && 'w-10 h-10 text-sm',
            size === 'lg' && 'w-12 h-12 text-base'
          )}
        >
          +{remainingCount}
        </div>
      )}
    </div>
  );
};
