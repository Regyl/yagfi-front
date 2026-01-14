import { useState, useEffect, useRef, useCallback } from 'react';
import { fetchIssues } from '../../api/issuesApi';
import { IssuesResponse, IssuesRequest, Issue } from '../../types';

interface UseInfiniteIssuesReturn {
  issues: Issue[];
  loading: boolean;
  loadingMore: boolean;
  error: Error | null;
  hasMore: boolean;
  totalElements: number;
  loadMore: () => void;
  reset: () => void;
}

export function useInfiniteIssues(
  baseRequest: Omit<IssuesRequest, 'page'>
): UseInfiniteIssuesReturn {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [totalElements, setTotalElements] = useState(0);
  const [lastResponse, setLastResponse] = useState<IssuesResponse | null>(null);
  
  const baseRequestRef = useRef(baseRequest);
  const isLoadingRef = useRef(false);

  // Update ref when base request changes
  useEffect(() => {
    baseRequestRef.current = baseRequest;
  }, [baseRequest]);

  // Reset and load initial data when filters change
  useEffect(() => {
    let cancelled = false;
    isLoadingRef.current = true;
    setCurrentPage(0);
    setIssues([]);
    setHasMore(true);
    setError(null);
    setLastResponse(null);
    setLoading(true);
    setLoadingMore(false);

    const loadData = async () => {
      try {
        const request: IssuesRequest = {
          ...baseRequestRef.current,
          page: 0,
        };
        const response = await fetchIssues(request);
        
        if (!cancelled) {
          setIssues(response.content);
          setTotalElements(response.totalElements);
          setHasMore(!response.last);
          setLastResponse(response);
          setCurrentPage(0);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err : new Error('Unknown error'));
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
          isLoadingRef.current = false;
        }
      }
    };

    loadData();

    return () => {
      cancelled = true;
      isLoadingRef.current = false;
    };
  }, [
    baseRequest.filter?.language,
    baseRequest.order?.field,
    baseRequest.order?.type,
  ]);

  const currentPageRef = useRef(0);

  // Sync ref with state
  useEffect(() => {
    currentPageRef.current = currentPage;
  }, [currentPage]);

  const loadMore = useCallback(() => {
    if (loadingMore || !hasMore || isLoadingRef.current) {
      return;
    }

    let cancelled = false;
    isLoadingRef.current = true;
    setLoadingMore(true);
    setError(null);

    const loadData = async () => {
      try {
        const nextPage = currentPageRef.current + 1;
        const request: IssuesRequest = {
          ...baseRequestRef.current,
          page: nextPage,
        };
        const response = await fetchIssues(request);

        if (!cancelled) {
          setIssues((prev) => [...prev, ...response.content]);
          setTotalElements(response.totalElements);
          setHasMore(!response.last);
          setLastResponse(response);
          setCurrentPage(nextPage);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err : new Error('Unknown error'));
        }
      } finally {
        if (!cancelled) {
          setLoadingMore(false);
          isLoadingRef.current = false;
        }
      }
    };

    loadData();

    return () => {
      cancelled = true;
      isLoadingRef.current = false;
    };
  }, [hasMore, loadingMore]);

  const reset = useCallback(() => {
    setCurrentPage(0);
    setIssues([]);
    setHasMore(true);
    setError(null);
    setLastResponse(null);
    isLoadingRef.current = false;
  }, []);

  return {
    issues,
    loading,
    loadingMore,
    error,
    hasMore,
    totalElements,
    loadMore,
    reset,
  };
}
