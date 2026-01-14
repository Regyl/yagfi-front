import React from 'react';
import { Chip } from '@mui/material';

interface BadgeProps {
  children: React.ReactNode;
  color?: 'default' | 'primary' | 'secondary';
}

export function Badge({ children, color = 'default' }: BadgeProps) {
  return (
    <Chip
      label={children}
      size="small"
      color={color}
      sx={{
        height: 24,
        fontSize: '0.75rem',
        fontWeight: 500,
      }}
    />
  );
}
