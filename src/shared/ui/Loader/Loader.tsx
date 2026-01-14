import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

export function Loader() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '400px',
        gap: 2,
      }}
    >
      <CircularProgress size={48} />
      <Typography variant="body2" color="text.secondary">
        Loading issues...
      </Typography>
    </Box>
  );
}
