import React from 'react';
import {Bug, Home, Rss} from 'lucide-react';
import {NavLink, useLocation} from 'react-router-dom';
import {Badge} from '@/components/ui/badge';
import {cn} from '@/lib/utils';

const menuItems = [
  {label: 'Home', path: '/', icon: Home},
  {label: 'Issues', path: '/issues', icon: Bug},
  {label: 'Feed', path: '/feed', icon: Rss, badge: 'beta'},
];

export function Sidebar() {
  const location = useLocation();
  const search = location.search || undefined;

  return (
    <aside
      className="fixed bottom-0 left-0 right-0 z-[1000] border-t border-border bg-background sm:bottom-auto sm:left-0 sm:top-16 sm:h-[calc(100vh-4rem)] sm:w-56 sm:border-r sm:border-t-0"
      aria-label="Main navigation"
    >
      <nav className="flex flex-row sm:flex-col sm:gap-1 sm:p-4" role="navigation">
        {menuItems.map((item) => {
          const isSelected =
            (item.path === '/' && location.pathname === '/') ||
            (item.path !== '/' && location.pathname === item.path) ||
            (item.path === '/feed' && location.pathname.startsWith('/feed/'));
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={{pathname: item.path, search}}
              className={cn(
                'flex flex-1 flex-col items-center justify-center gap-1 px-2 py-4 text-sm font-medium transition-colors sm:flex-row sm:flex-none sm:justify-start sm:gap-3 sm:rounded-lg sm:px-4 sm:py-3',
                isSelected
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
              )}
              aria-current={isSelected ? 'page' : undefined}
            >
              <Icon className="size-5 shrink-0" aria-hidden />
              <span className="flex items-center gap-2">
                {item.label}
                {item.badge && (
                  <Badge
                    variant="secondary"
                    className="hidden text-[10px] font-normal sm:inline-flex"
                  >
                    {item.badge}
                  </Badge>
                )}
              </span>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}
