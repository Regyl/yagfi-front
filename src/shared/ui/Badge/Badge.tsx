import React from 'react';
import {Badge as BadgePrimitive} from '@/components/ui/badge';
import {cn} from '@/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  color?: 'default' | 'primary' | 'secondary';
  variant?: 'filled' | 'outlined';
}

export function Badge({children, color = 'default', variant = 'filled'}: BadgeProps) {
  return (
    <BadgePrimitive
      variant={variant === 'outlined' ? 'outline' : 'default'}
      className={cn(
        'h-6 text-xs font-medium',
        color === 'primary' && 'bg-primary text-primary-foreground',
        color === 'secondary' && 'bg-secondary text-secondary-foreground'
      )}
    >
      {children}
    </BadgePrimitive>
  );
}
