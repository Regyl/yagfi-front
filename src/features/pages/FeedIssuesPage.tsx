import React, {useEffect, useState} from 'react';
import {ArrowLeft} from 'lucide-react';
import {Link, useNavigate, useParams, useSearchParams} from 'react-router-dom';
import {fetchFeedIssues, fetchFeedIssuesByNickname} from '@/api/issuesApi';
import {Issue} from '@/types';
import {IssuesList} from '../components/IssuesList';
import {Loader} from '@/shared/ui/Loader/Loader';
import {Button} from '@/components/ui/button';
import {Alert, AlertDescription} from '@/components/ui/alert';
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';
import {getRepoDisplayName} from '@/shared/utils/githubRepo';
import {getGitHubUserAvatar} from '@/shared/utils/getGitHubUserAvatar';

export function FeedIssuesPage() {
  const {nickname} = useParams<{nickname: string}>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const sourceRepo = searchParams.get('sourceRepo');

  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!nickname) {
      navigate('/feed');
      return;
    }
    const load = async () => {
      setLoading(true);
      setError(null);
      setIssues([]);
      try {
        const res = sourceRepo
          ? await fetchFeedIssues(sourceRepo)
          : await fetchFeedIssuesByNickname(nickname);
        setIssues(res.issues);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load issues');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [nickname, sourceRepo, navigate]);

  if (!nickname) return null;

  const avatarUrl = getGitHubUserAvatar(nickname);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6 flex items-center gap-4">
        <Link to={`/feed/${nickname}`}>
          <Button variant="ghost" size="icon" aria-label="Back to feed">
            <ArrowLeft className="size-4" aria-hidden />
          </Button>
        </Link>
        <Avatar className="size-12 shrink-0 bg-primary">
          <AvatarImage src={avatarUrl ?? undefined} alt={`${nickname} avatar`} />
          <AvatarFallback>{nickname.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
        <h1 className="text-3xl font-semibold tracking-tight">
          {sourceRepo
            ? `Issues from ${getRepoDisplayName(sourceRepo)}`
            : `Issues for ${nickname}`}
        </h1>
      </div>

      {loading && <Loader />}
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      {!loading && !error && issues.length === 0 && (
        <p className="py-12 text-center text-muted-foreground">
          No issues found.
        </p>
      )}
      {!loading && !error && issues.length > 0 && (
        <>
          <p className="mb-4 text-sm text-muted-foreground">
            Showing {issues.length} issues
          </p>
          <IssuesList issues={issues} />
        </>
      )}
    </div>
  );
}
