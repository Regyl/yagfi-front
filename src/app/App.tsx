import React, {useMemo, useState} from 'react';
import {CssBaseline, ThemeProvider} from '@mui/material';
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import {darkTheme, lightTheme} from '../theme/theme';
import {Header} from '../shared/ui/Header/Header';
import {Sidebar} from '../shared/ui/Sidebar/Sidebar';
import {IssuesPage} from '../features/pages/IssuesPage';
import {FeedPage} from '../features/pages/FeedPage';
import {FeedViewPage} from '../features/pages/FeedViewPage';
import {AppContent, AppLayout, Main} from './App.styles';

export default function App() {
  const [mode, setMode] = useState<'light' | 'dark'>('dark');

  const theme = useMemo(() => (mode === 'light' ? lightTheme : darkTheme), [mode]);

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <AppLayout>
          <Header mode={mode} onToggleTheme={toggleTheme} />
          <AppContent>
            <Sidebar />
            <Main component="main">
              <Routes>
                <Route path="/issues" element={<IssuesPage />} />
                <Route path="/feed" element={<FeedPage />} />
                <Route path="/feed/:nickname" element={<FeedViewPage />} />
                <Route path="/" element={<Navigate to="/issues" replace />} />
              </Routes>
            </Main>
          </AppContent>
        </AppLayout>
      </BrowserRouter>
    </ThemeProvider>
  );
}
