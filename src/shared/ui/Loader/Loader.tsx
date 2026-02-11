import React from 'react';
import {CircularProgress, Typography} from '@mui/material';
import {LoaderContainer} from './Loader.styles';

export function Loader() {
  return (
    <LoaderContainer>
      <CircularProgress size={48} />
      <Typography variant="body2" color="text.secondary">
        Loading issues...
      </Typography>
    </LoaderContainer>
  );
}
