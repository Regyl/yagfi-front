import React, {useState} from 'react';
import {Github, Globe, Moon, RefreshCw, Server, Sun} from 'lucide-react';
import {GITHUB_BACKEND_REPO_URL, GITHUB_FRONTEND_REPO_URL} from '../../constants';
import {useSyncStatus} from '@/features/hooks';
import {formatDate} from '../../utils/formatDate';
import {SyncEvent} from '@/types';
import {Button} from '@/components/ui/button';
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,} from '@/components/ui/dropdown-menu';
import {Tooltip, TooltipContent, TooltipTrigger,} from '@/components/ui/tooltip';

interface HeaderProps {
  mode: 'light' | 'dark';
  onToggleTheme: () => void;
}

export function Header({mode, onToggleTheme}: HeaderProps) {
  const {syncEvents, loading} = useSyncStatus();
  const [open, setOpen] = useState(false);

  const latestSyncTime = (() => {
    if (loading || syncEvents.length === 0) return null;
    const latest = syncEvents.reduce((a, b) =>
      new Date(b.lastUpdateDttm) > new Date(a.lastUpdateDttm) ? b : a
    );
    return formatDate(latest.lastUpdateDttm);
  })();

  const handleGithubClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
    setOpen(false);
  };

  return (
    <header className="sticky top-0 z-[1100] border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center justify-between px-4 sm:px-6">
        <span className="text-xl font-bold text-primary">
          YAGFI - Yet Another Good First Issue
        </span>
        <div className="flex items-center gap-4">
          {latestSyncTime && (
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex cursor-default items-center gap-1 text-xs text-muted-foreground">
                  <RefreshCw className="size-4" />
                  <span className="hidden md:inline">Synced {latestSyncTime}</span>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                {syncEvents.map((e: SyncEvent) => (
                  <div key={e.source} className="mb-1 last:mb-0">
                    {e.source}: {formatDate(e.lastUpdateDttm)}
                  </div>
                ))}
              </TooltipContent>
            </Tooltip>
          )}
          <Button variant="ghost" size="icon" onClick={onToggleTheme} className="text-muted-foreground hover:text-primary">
            {mode === 'dark' ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </Button>
          <DropdownMenu open={open} onOpenChange={setOpen}>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-1.5 text-muted-foreground hover:text-primary">
                <Github className="size-4" />
                <span className="hidden sm:inline">GitHub</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleGithubClick(GITHUB_FRONTEND_REPO_URL)}>
                <Globe className="size-4" />
                Frontend
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleGithubClick(GITHUB_BACKEND_REPO_URL)}>
                <Server className="size-4" />
                Backend
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
