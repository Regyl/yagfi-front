import { useState, useEffect, useRef } from 'react';
import { fetchIssues } from '../../api/issuesApi';
import { IssuesResponse, IssuesRequest } from '../../types';

interface UseIssuesReturn {
  data: IssuesResponse | null;
  loading: boolean;
  error: Error | null;
  refetch: () => void;
}

export function useIssues(request: IssuesRequest): UseIssuesReturn {
  const [data, setData] = useState<IssuesResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const requestRef = useRef(request);

  // Update ref when request changes
  useEffect(() => {
    requestRef.current = request;
  }, [request]);

  useEffect(() => {
    let cancelled = false;

    const loadData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetchIssues(requestRef.current);
        if (!cancelled) {
          setData(response);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err : new Error('Unknown error'));
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadData();

    return () => {
      cancelled = true;
    };
  }, [
    request.page,
    request.size,
    request.filter?.language,
    request.order?.field,
    request.order?.type,
  ]);

  const refetch = () => {
    setLoading(true);
    setError(null);
    fetchIssues(requestRef.current)
      .then((response) => {
        setData(response);
        setLoading(false);
      })
      .catch((err) => {
        setError(err instanceof Error ? err : new Error('Unknown error'));
        setLoading(false);
      });
  };

  return { data, loading, error, refetch };
}
