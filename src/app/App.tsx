import React from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { theme } from '../theme/theme';
import { IssuesPage } from '../features/pages/IssuesPage';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <IssuesPage />
    </ThemeProvider>
  );
}
