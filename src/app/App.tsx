import React from 'react';
import {Box, CssBaseline, ThemeProvider} from '@mui/material';
import {theme} from '../theme/theme';
import {Header} from '../shared/ui/Header/Header';
import {IssuesPage} from '../features/pages/IssuesPage';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
        <Box sx={{display: 'flex', flexDirection: 'column', minHeight: '100vh'}}>
            <Header/>
            <Box component="main" sx={{flex: 1}}>
                <IssuesPage/>
            </Box>
        </Box>
    </ThemeProvider>
  );
}
