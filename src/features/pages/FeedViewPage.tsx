import React, {useEffect, useMemo, useState} from 'react';
import {AlertCircle, ChevronDown, ChevronRight, ExternalLink, FolderGit2, Layers, Loader2} from 'lucide-react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import {fetchFeedRepositories} from '@/api/issuesApi';
import {FeedRepositoryItem} from '@/types';
import {Button} from '@/components/ui/button';
import {Card, CardContent} from '@/components/ui/card';
import {Alert, AlertDescription} from '@/components/ui/alert';
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';
import {getRepoDisplayName} from '@/shared/utils/githubRepo';
import {getGitHubAvatar} from '@/shared/utils/getGitHubAvatar';
import {getGitHubUserAvatar} from '@/shared/utils/getGitHubUserAvatar';
import {cn} from '@/lib/utils';

interface GroupedRepo {
  sourceRepo: string;
  items: FeedRepositoryItem[];
  dependencyCount: number;
  topDependencies: {url: string; stars: number}[];
}

function groupAndSortRepos(items: FeedRepositoryItem[]): GroupedRepo[] {
  const bySource = new Map<string, FeedRepositoryItem[]>();
  for (const item of items) {
    const existing = bySource.get(item.sourceRepo) ?? [];
    existing.push(item);
    bySource.set(item.sourceRepo, existing);
  }

  const groups: GroupedRepo[] = [];
  for (const [sourceRepo, repoItems] of bySource) {
    const byDep = new Map<string, number>();
    for (const item of repoItems) {
      const existing = byDep.get(item.dependencyUrl) ?? 0;
      if (item.stars > existing) byDep.set(item.dependencyUrl, item.stars);
    }
    const topDependencies = Array.from(byDep.entries())
      .map(([url, stars]) => ({url, stars}))
      .sort((a, b) => b.stars - a.stars)
      .slice(0, 5);
    groups.push({
      sourceRepo,
      items: repoItems,
      dependencyCount: byDep.size,
      topDependencies,
    });
  }

  groups.sort((a, b) => {
    const starsA = a.items.reduce((m, i) => Math.max(m, i.stars), 0);
    const starsB = b.items.reduce((m, i) => Math.max(m, i.stars), 0);
    return starsB - starsA;
  });

  return groups;
}

function RepoOverviewCard({group, nickname}: {group: GroupedRepo; nickname: string}) {
  const [expanded, setExpanded] = useState(false);
  const displayName = getRepoDisplayName(group.sourceRepo);

  return (
    <div className="flex flex-col gap-2">
      <Card
        className={cn(
          'cursor-pointer transition-colors hover:border-primary/50',
          expanded && 'border-primary'
        )}
        onClick={() => setExpanded((e) => !e)}
      >
        <CardContent className="p-4">
          <div className="flex min-w-0 items-start gap-3">
            <span className="flex shrink-0 pt-0.5 text-muted-foreground" aria-hidden>
              {expanded ? (
                <ChevronDown className="size-4" />
              ) : (
                <ChevronRight className="size-4" />
              )}
            </span>
            <div className="min-w-0 flex-1">
              <a
                href={group.sourceRepo}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-1.5 text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
              >
                <span className="font-medium">{displayName}</span>
                <ExternalLink className="size-4 shrink-0" aria-hidden />
              </a>
              <div className="mt-2 flex flex-col gap-1.5 text-sm text-muted-foreground">
                <span>{group.dependencyCount} dependencies</span>
                {group.topDependencies.length > 0 && (
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs">Top:</span>
                    {group.topDependencies.map((d) => {
                      const displayName = getRepoDisplayName(d.url);
                      const avatarUrl = getGitHubAvatar(displayName);
                      return (
                        <span key={d.url} className="inline-flex items-center gap-1.5">
                          {avatarUrl && (
                            <img
                              src={avatarUrl}
                              alt=""
                              className="size-5 shrink-0 rounded-full border border-border object-cover"
                              onError={(e) => {
                                e.currentTarget.style.display = 'none';
                              }}
                            />
                          )}
                          <span>{displayName}</span>
                        </span>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
            <div className="flex shrink-0 flex-col items-end gap-1">
              <span className="font-semibold text-primary">
                {group.items.reduce((a, i) => a + i.issueCnt, 0)} issues
              </span>
              <Link
                to={`/feed/${nickname}/issues?sourceRepo=${encodeURIComponent(group.sourceRepo)}`}
                onClick={(e) => e.stopPropagation()}
              >
                <Button variant="link" size="sm" className="h-auto p-0 text-xs">
                  View issues
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
      {expanded && (
        <div className="ml-6 flex flex-col gap-2 border-l-2 border-border pl-4">
          {group.items.map((item, idx) => {
            const displayName = getRepoDisplayName(item.dependencyUrl);
            const avatarUrl = getGitHubAvatar(displayName);
            return (
              <Card key={`${item.dependencyUrl}-${idx}`} className="border">
                <CardContent className="p-4">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <a
                      href={item.dependencyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
                    >
                      {avatarUrl && (
                        <img
                          src={avatarUrl}
                          alt=""
                          className="size-8 shrink-0 rounded-lg border border-border object-cover"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      )}
                      <span className="font-medium">{displayName}</span>
                      <ExternalLink className="size-4 shrink-0" aria-hidden />
                    </a>
                    <div className="flex items-center gap-3 text-sm">
                      <span>{item.stars} ★</span>
                      <span className="text-muted-foreground">{item.issueCnt} issues</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}

export function FeedViewPage() {
  const {nickname} = useParams<{nickname: string}>();
  const navigate = useNavigate();
  const [items, setItems] = useState<FeedRepositoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const groups = useMemo(() => groupAndSortRepos(items), [items]);

  useEffect(() => {
    if (!nickname) {
      navigate('/feed');
      return;
    }
    const loadData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchFeedRepositories(nickname);
        setItems(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load feed');
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [nickname, navigate]);

  if (loading) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex min-h-[400px] items-center justify-center">
          <Loader2 className="size-12 animate-spin text-muted-foreground" aria-hidden />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <Alert variant="destructive" role="alert">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  const avatarUrl = nickname ? getGitHubUserAvatar(nickname) : null;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-center gap-4">
        <Avatar className="size-12 shrink-0 bg-primary">
          <AvatarImage src={avatarUrl ?? undefined} alt={`${nickname} avatar`} />
          <AvatarFallback>{nickname?.charAt(0).toUpperCase() ?? '?'}</AvatarFallback>
        </Avatar>
        <h1 className="text-3xl font-semibold tracking-tight">
          Feed for {nickname}
        </h1>
      </div>

      <div className="flex flex-col gap-8">
        <section aria-label="Overview">
          <h2 className="mb-4 text-xl font-semibold">Overview</h2>
          <div
            className="relative overflow-hidden rounded-2xl border-0 shadow-xl shadow-primary/10 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/15"
            style={{
              background:
                'linear-gradient(135deg, oklch(0.55 0.18 270 / 0.95) 0%, oklch(0.5 0.16 260 / 0.95) 35%, oklch(0.45 0.14 250 / 0.95) 70%, oklch(0.4 0.12 240 / 0.95) 100%)',
              boxShadow:
                '0 25px 50px -12px oklch(0.45 0.15 250 / 0.25), inset 0 1px 0 0 oklch(1 0 0 / 0.1)',
            }}
          >
            {/* Subtle mesh gradient overlay */}
            <div
              className="pointer-events-none absolute inset-0 opacity-30"
              style={{
                background:
                  'radial-gradient(ellipse 80% 50% at 50% -20%, oklch(0.9 0.05 250), transparent), radial-gradient(ellipse 60% 40% at 100% 100%, oklch(0.6 0.12 280), transparent)',
              }}
            />
            <div className="relative p-8">
              <div className="flex flex-wrap gap-8 sm:gap-12">
                <div className="group flex items-center gap-4">
                  <div className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-white/15 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
                    <FolderGit2 className="size-7 text-white/95" aria-hidden />
                  </div>
                  <div>
                    <span className="block text-3xl font-bold tracking-tight text-white drop-shadow-sm">
                      {groups.length}
                    </span>
                    <span className="text-sm font-medium text-white/80">repositories processed</span>
                  </div>
                </div>
                <div className="group flex items-center gap-4">
                  <div className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-white/15 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
                    <Layers className="size-7 text-white/95" aria-hidden />
                  </div>
                  <div>
                    <span className="block text-3xl font-bold tracking-tight text-white drop-shadow-sm">
                      {items.length}
                    </span>
                    <span className="text-sm font-medium text-white/80">
                      dependencies found
                    </span>
                  </div>
                </div>
                <div className="group flex items-center gap-4">
                  <div className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-white/15 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
                    <AlertCircle className="size-7 text-white/95" aria-hidden />
                  </div>
                  <div>
                    <span className="block text-3xl font-bold tracking-tight text-white drop-shadow-sm">
                      {items.reduce((a, i) => a + i.issueCnt, 0)}
                    </span>
                    <span className="text-sm font-medium text-white/80">total issues</span>
                  </div>
                </div>
              </div>
              <div className="mt-8">
                <Link to={`/feed/${nickname}/issues`}>
                  <Button
                    size="sm"
                    className="border-white/30 bg-white/20 font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/30 hover:border-white/50"
                  >
                    View all issues
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section aria-label="Repositories by source">
          <h2 className="mb-4 text-xl font-semibold">Repositories</h2>
          {groups.length === 0 ? (
            <p className="py-12 text-center text-muted-foreground">
              No repositories found yet.
            </p>
          ) : (
            <div className="flex flex-col gap-3">
              {groups.map((group) => (
                <RepoOverviewCard key={group.sourceRepo} group={group} nickname={nickname!} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
