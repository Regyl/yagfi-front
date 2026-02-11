import React from 'react';
import {Bug, Rss} from 'lucide-react';
import {useLocation, useNavigate} from 'react-router-dom';
import {Badge} from '@/components/ui/badge';
import {cn} from '@/lib/utils';

const menuItems = [
  {label: 'Issues', path: '/issues', icon: Bug},
  {label: 'Feed', path: '/feed', icon: Rss},
];

export function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <aside className="fixed bottom-0 left-0 right-0 z-[1000] border-t border-border bg-background sm:bottom-auto sm:left-0 sm:top-16 sm:h-[calc(100vh-4rem)] sm:w-60 sm:border-r sm:border-t-0">
      <nav className="flex flex-row gap-0 sm:flex-col sm:gap-0">
        {menuItems.map((item) => {
          const isSelected = location.pathname === item.path;
          const Icon = item.icon;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={cn(
                'flex flex-1 flex-col items-center justify-center gap-1 px-2 py-3 text-sm transition-colors sm:flex-row sm:flex-none sm:justify-start sm:gap-2 sm:px-4 sm:py-3',
                isSelected
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
              )}
            >
              <Icon className={cn('size-5 sm:size-5', isSelected && 'text-primary-foreground')} />
              <span className="flex items-center gap-4 text-xs sm:text-sm">
                {item.label}
                {item.path === '/feed' && (
                  <Badge variant="outline" className="text-[10px] sm:text-xs">
                    beta
                  </Badge>
                )}
              </span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
