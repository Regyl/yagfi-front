import React, {useEffect} from 'react';
import {Box, CssBaseline, ThemeProvider} from '@mui/material';
import {theme} from '../theme/theme';
import {Header} from '../shared/ui/Header/Header';
import {IssuesPage} from '../features/pages/IssuesPage';
import {setThemeVariables} from '../shared/utils/themeVariables';
import styles from './App.module.css';

export default function App() {
    useEffect(() => {
        setThemeVariables(theme);
    }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
        <Box className={styles.appContainer}>
            <Header/>
            <Box component="main" className={styles.main}>
                <IssuesPage/>
            </Box>
        </Box>
    </ThemeProvider>
  );
}
