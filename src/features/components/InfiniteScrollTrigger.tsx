import React, {useEffect, useRef} from 'react';
import {CircularProgress, Typography} from '@mui/material';
import {EndMessage, TriggerContainer} from './InfiniteScrollTrigger.styles';

interface InfiniteScrollTriggerProps {
  onIntersect: () => void;
  hasMore: boolean;
  loading: boolean;
}

export function InfiniteScrollTrigger({
  onIntersect,
  hasMore,
  loading,
}: InfiniteScrollTriggerProps) {
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && hasMore && !loading) {
          onIntersect();
        }
      },
      {
        root: null,
        rootMargin: '200px',
        threshold: 0.1,
      }
    );

    const currentTrigger = triggerRef.current;
    if (currentTrigger) {
      observer.observe(currentTrigger);
    }

    return () => {
      if (currentTrigger) {
        observer.unobserve(currentTrigger);
      }
    };
  }, [hasMore, loading, onIntersect]);

  if (!hasMore) {
    return (
      <EndMessage>
        <Typography variant="body2" color="text.secondary">
          No more issues to load
        </Typography>
      </EndMessage>
    );
  }

  return (
    <TriggerContainer ref={triggerRef}>
      {loading && <CircularProgress size={32} />}
    </TriggerContainer>
  );
}
