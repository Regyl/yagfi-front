import React from 'react';
import {Chip} from '@mui/material';
import styles from './Badge.module.css';

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
      className={styles.chip}
    />
  );
}
