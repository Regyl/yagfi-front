import React, {useEffect, useState} from 'react';
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import {Header} from '@/shared/ui/Header/Header';
import {Sidebar} from '@/shared/ui/Sidebar/Sidebar';
import {IssuesPage} from '@/features/pages/IssuesPage';
import {FeedPage} from '@/features/pages/FeedPage';
import {FeedViewPage} from '@/features/pages/FeedViewPage';
import {TooltipProvider} from '@/components/ui/tooltip';

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
        <div className="flex min-h-screen flex-col">
          <Header mode={mode} onToggleTheme={toggleTheme} />
          <div className="flex flex-1 overflow-hidden">
            <Sidebar />
            <main className="flex-1 overflow-auto pb-20 sm:ml-60 sm:pb-0">
              <Routes>
                <Route path="/issues" element={<IssuesPage />} />
                <Route path="/feed" element={<FeedPage />} />
                <Route path="/feed/:nickname" element={<FeedViewPage />} />
                <Route path="/" element={<Navigate to="/issues" replace />} />
              </Routes>
            </main>
          </div>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  );
}
