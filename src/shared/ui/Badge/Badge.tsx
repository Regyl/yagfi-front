import React from 'react';
import {Chip} from '@mui/material';

interface BadgeProps {
  children: React.ReactNode;
  color?: 'default' | 'primary' | 'secondary';
    variant?: 'filled' | 'outlined';
}

export function Badge({children, color = 'default', variant = 'filled'}: BadgeProps) {
  return (
    <Chip
      label={children}
      size="small"
      color={color}
      variant={variant}
      sx={{
        height: 24,
        fontSize: '0.75rem',
        fontWeight: 500,
      }}
    />
  );
}
