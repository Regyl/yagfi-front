import {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {fetchIssues} from '@/api/issuesApi';
import {Issue, IssuesRequest} from '@/types';

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
  baseRequest: Omit<IssuesRequest, 'offset'>
): UseInfiniteIssuesReturn {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [currentOffset, setCurrentOffset] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [totalElements, setTotalElements] = useState(0);
  
  const baseRequestRef = useRef(baseRequest);
  const isLoadingRef = useRef(false);

  // Update ref when base request changes
  useEffect(() => {
    baseRequestRef.current = baseRequest;
  }, [baseRequest]);

  // Memoize filter and orders for dependency tracking
  const filterKey = useMemo(() => JSON.stringify(baseRequest.filter), [baseRequest.filter]);
  const ordersKey = useMemo(() => JSON.stringify(baseRequest.orders), [baseRequest.orders]);

  // Reset and load initial data when filters change
  useEffect(() => {
    let cancelled = false;
    isLoadingRef.current = true;
    setCurrentOffset(0);
    setIssues([]);
    setHasMore(true);
    setError(null);
    setLoading(true);
    setLoadingMore(false);

    const loadData = async () => {
      try {
        const request: IssuesRequest = {
          ...baseRequestRef.current,
          offset: 0,
        };
        const response = await fetchIssues(request);
        
        if (!cancelled) {
          setIssues(response.issues);
          // If we got fewer issues than requested, there are no more
          setHasMore(response.issues.length === baseRequestRef.current.limit);
          setTotalElements(response.issues.length); // We don't have total count, so we track loaded count
          setCurrentOffset(0);
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
  }, [filterKey, ordersKey]);

  const currentOffsetRef = useRef(0);

  // Sync ref with state
  useEffect(() => {
    currentOffsetRef.current = currentOffset;
  }, [currentOffset]);

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
        const nextOffset = currentOffsetRef.current + baseRequestRef.current.limit;
        const request: IssuesRequest = {
          ...baseRequestRef.current,
          offset: nextOffset,
        };
        const response = await fetchIssues(request);

        if (!cancelled) {
          const newIssues = response.issues;
          setIssues((prev) => [...prev, ...newIssues]);
          // If we got fewer issues than requested, there are no more
          setHasMore(newIssues.length === baseRequestRef.current.limit);
          setTotalElements((prev) => prev + newIssues.length);
          setCurrentOffset(nextOffset);
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
    setCurrentOffset(0);
    setIssues([]);
    setHasMore(true);
    setError(null);
    setTotalElements(0);
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
