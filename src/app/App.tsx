import React, { useState, useMemo } from 'react';
import { Box, CssBaseline, ThemeProvider } from '@mui/material';
import { darkTheme, lightTheme } from '../theme/theme'; // Εισαγωγή και των δύο themes
import { Header } from '../shared/ui/Header/Header';
import { IssuesPage } from '../features/pages/IssuesPage';

export default function App() {
  
  const [mode, setMode] = useState<'light' | 'dark'>('dark');

  
  const theme = useMemo(() => (mode === 'light' ? lightTheme : darkTheme), [mode]);

  
  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        {}
        <Header mode={mode} onToggleTheme={toggleTheme} />
        <Box component="main" sx={{ flex: 1 }}>
          <IssuesPage />
        </Box>
      </Box>
    </ThemeProvider>
  );
}