import React from 'react';
import {StyledBadge} from './Badge.styles';

interface BadgeProps {
  children: React.ReactNode;
  color?: 'default' | 'primary' | 'secondary';
  variant?: 'filled' | 'outlined';
}

export function Badge({children, color = 'default', variant = 'filled'}: BadgeProps) {
  return (
    <StyledBadge label={children} size="small" color={color} variant={variant} />
  );
}
