import React from 'react';
import {Box, CircularProgress, Typography} from '@mui/material';
import styles from './Loader.module.css';

export function Loader() {
  return (
      <Box className={styles.container}>
      <CircularProgress size={48} />
      <Typography variant="body2" color="text.secondary">
        Loading issues...
      </Typography>
    </Box>
  );
}
