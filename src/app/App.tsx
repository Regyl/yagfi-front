import React, {useEffect, useState} from 'react';
import {BrowserRouter, Route, Routes, useLocation} from 'react-router-dom';
import {Header} from '@/shared/ui/Header/Header';
import {Sidebar} from '@/shared/ui/Sidebar/Sidebar';
import {Footer} from '@/shared/ui/Footer/Footer';
import {HomePage} from '@/features/pages/HomePage';
import {IssuesPage} from '@/features/pages/IssuesPage';
import {FeedPage} from '@/features/pages/FeedPage';
import {FeedViewPage} from '@/features/pages/FeedViewPage';
import {FeedIssuesPage} from '@/features/pages/FeedIssuesPage';
import {TooltipProvider} from '@/components/ui/tooltip';

function AppLayout({
  mode,
  onToggleTheme,
}: {
  mode: 'light' | 'dark';
  onToggleTheme: () => void;
}) {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div className="flex min-h-screen flex-col">
      <Header mode={mode} onToggleTheme={onToggleTheme} />
      <div className="flex flex-1 overflow-hidden">
        {!isHome && <Sidebar />}
        <main
          className={isHome ? 'flex flex-1 flex-col overflow-auto' : 'flex flex-1 flex-col overflow-auto sm:ml-56'}
          id="main-content"
        >
          <div className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/issues" element={<IssuesPage />} />
              <Route path="/feed" element={<FeedPage />} />
              <Route path="/feed/:nickname" element={<FeedViewPage />} />
              <Route path="/feed/:nickname/issues" element={<FeedIssuesPage />} />
            </Routes>
          </div>
          {!isHome && <Footer />}
        </main>
      </div>
    </div>
  );
}

export default function App() {
  const [mode, setMode] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    const root = document.documentElement;
    if (mode === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [mode]);

  const toggleTheme = () => {
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <TooltipProvider>
      <BrowserRouter>
        <AppLayout mode={mode} onToggleTheme={toggleTheme} />
      </BrowserRouter>
    </TooltipProvider>
  );
}
