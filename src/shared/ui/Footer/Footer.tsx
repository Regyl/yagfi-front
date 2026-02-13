import React from 'react';
import {ExternalLink, Github} from 'lucide-react';
import {CONTRIBUTING_URL, GITHUB_BACKEND_REPO_URL, GITHUB_FRONTEND_REPO_URL} from '../../constants';

export function Footer() {
  return (
    <footer
      className="mt-auto border-t border-border bg-background"
      role="contentinfo"
    >
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium text-foreground">YAGFI</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Yet Another Good First Issue — find beginner-friendly open source contributions
            </p>
          </div>
          <nav
            className="flex flex-wrap gap-6"
            aria-label="Footer navigation"
          >
            <a
              href={CONTRIBUTING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
            >
              Suggest a Label
              <ExternalLink className="size-3.5" aria-hidden />
            </a>
            <a
              href={GITHUB_FRONTEND_REPO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
            >
              <Github className="size-4" aria-hidden />
              Frontend
            </a>
            <a
              href={GITHUB_BACKEND_REPO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
            >
              <Github className="size-4" aria-hidden />
              Backend
            </a>
          </nav>
        </div>
        <div className="mt-8 pt-8 border-t border-border">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} YAGFI. Open source contributions welcome.
          </p>
        </div>
      </div>
    </footer>
  );
}
