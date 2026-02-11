import React, {useEffect, useState} from 'react';
import {ChevronDown, ChevronUp, ExternalLink, Loader2, RotateCcw} from 'lucide-react';
import {useNavigate, useParams} from 'react-router-dom';
import {fetchFeedIssues, fetchFeedIssuesByNickname, fetchFeedRepositories} from '@/api/issuesApi';
import {Issue} from '@/types';
import {IssuesList} from '../components/IssuesList';
import {Loader} from '@/shared/ui/Loader/Loader';
import {Button} from '@/components/ui/button';
import {Card, CardContent} from '@/components/ui/card';
import {Alert, AlertDescription} from '@/components/ui/alert';
import {Collapsible, CollapsibleContent, CollapsibleTrigger,} from '@/components/ui/collapsible';
import {cn} from '@/lib/utils';

export function FeedViewPage() {
  const {nickname} = useParams<{nickname: string}>();
  const navigate = useNavigate();
  const [repositories, setRepositories] = useState<{sourceRepo: string; count: number}[]>([]);
  const [selectedRepo, setSelectedRepo] = useState<string | null>(null);
  const [feedIssues, setFeedIssues] = useState<Issue[]>([]);
  const [repoIssues, setRepoIssues] = useState<Issue[]>([]);
  const [repositoriesExpanded, setRepositoriesExpanded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [feedIssuesLoading, setFeedIssuesLoading] = useState(true);
  const [repoIssuesLoading, setRepoIssuesLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [feedIssuesError, setFeedIssuesError] = useState<string | null>(null);
  const [repoIssuesError, setRepoIssuesError] = useState<string | null>(null);

  useEffect(() => {
    if (!nickname) {
      navigate('/feed');
      return;
    }
    const loadData = async () => {
      setLoading(true);
      setFeedIssuesLoading(true);
      setError(null);
      setFeedIssuesError(null);
      try {
        const [reposData, issuesData] = await Promise.all([
          fetchFeedRepositories(nickname),
          fetchFeedIssuesByNickname(nickname),
        ]);
        setRepositories(reposData);
        setFeedIssues(issuesData.issues);
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'Failed to load feed';
        setError(msg);
        setFeedIssuesError(msg);
      } finally {
        setLoading(false);
        setFeedIssuesLoading(false);
      }
    };
    loadData();
  }, [nickname, navigate]);

  const handleRepoClick = (sourceRepo: string) => {
    setSelectedRepo(sourceRepo);
    setRepositoriesExpanded(false);
  };

  useEffect(() => {
    if (!selectedRepo) {
      setRepoIssues([]);
      setRepoIssuesError(null);
      return;
    }
    const load = async () => {
      setRepoIssuesLoading(true);
      setRepoIssuesError(null);
      setRepoIssues([]);
      try {
        const res = await fetchFeedIssues(selectedRepo);
        setRepoIssues(res.issues);
      } catch (err) {
        setRepoIssuesError(err instanceof Error ? err.message : 'Failed to load issues');
      } finally {
        setRepoIssuesLoading(false);
      }
    };
    load();
  }, [selectedRepo]);

  if (loading) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-6">
        <div className="flex min-h-[400px] items-center justify-center">
          <Loader2 className="size-12 animate-spin text-muted-foreground" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-6">
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <h1 className="mb-6 text-2xl font-semibold">Feed for {nickname}</h1>

      <div className="flex flex-col gap-6">
        {repositories.length > 0 && (
          <Collapsible open={repositoriesExpanded} onOpenChange={setRepositoriesExpanded}>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Repositories</h2>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="icon" className="text-muted-foreground">
                  {repositoriesExpanded ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
                </Button>
              </CollapsibleTrigger>
            </div>
            <CollapsibleContent>
              <div className="mt-4 flex flex-col gap-2">
                {repositories.map((repo) => {
                  const repoName = repo.sourceRepo.replace('https://github.com/', '');
                  const isSelected = selectedRepo === repo.sourceRepo;
                  return (
                    <Card
                      key={repo.sourceRepo}
                      className={cn(
                        'cursor-pointer transition-colors hover:border-primary',
                        isSelected && 'border-primary'
                      )}
                      onClick={() => handleRepoClick(repo.sourceRepo)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between gap-4">
                          <div className="min-w-0 flex-1">
                            <a
                              href={repo.sourceRepo}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="inline-flex items-center gap-1 text-primary hover:underline"
                            >
                              <span className="font-semibold">{repoName}</span>
                              <ExternalLink className="size-4" />
                            </a>
                          </div>
                          <div className="flex flex-col items-end">
                            <span className="font-semibold text-primary">{repo.count}</span>
                            <span className="text-xs text-muted-foreground">dependencies</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </CollapsibleContent>
          </Collapsible>
        )}

        {selectedRepo ? (
          <div>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">
                Issues from repository {selectedRepo.replace('https://github.com/', '')}
              </h2>
              <Button variant="outline" size="sm" onClick={() => setSelectedRepo(null)}>
                <RotateCcw className="size-4" />
                Reset
              </Button>
            </div>
            {repoIssuesLoading && <Loader />}
            {repoIssuesError && (
              <Alert variant="destructive" className="mb-4">
                <AlertDescription>{repoIssuesError}</AlertDescription>
              </Alert>
            )}
            {!repoIssuesLoading && !repoIssuesError && repoIssues.length === 0 && (
              <p className="text-muted-foreground">No issues found for this repository.</p>
            )}
            {!repoIssuesLoading && !repoIssuesError && repoIssues.length > 0 && (
              <>
                <p className="mb-2 text-sm text-muted-foreground">
                  Showing {repoIssues.length} issues
                </p>
                <IssuesList issues={repoIssues} />
              </>
            )}
          </div>
        ) : (
          <div>
            <h2 className="mb-4 text-lg font-semibold">Issues from dependencies</h2>
            {feedIssuesLoading && <Loader />}
            {feedIssuesError && (
              <Alert variant="destructive" className="mb-4">
                <AlertDescription>{feedIssuesError}</AlertDescription>
              </Alert>
            )}
            {!feedIssuesLoading && !feedIssuesError && feedIssues.length === 0 && (
              <p className="text-muted-foreground">No issues found.</p>
            )}
            {!feedIssuesLoading && !feedIssuesError && feedIssues.length > 0 && (
              <>
                <p className="mb-2 text-sm text-muted-foreground">
                  Showing {feedIssues.length} issues
                </p>
                <IssuesList issues={feedIssues} />
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
