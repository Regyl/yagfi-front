import React, { useEffect, useRef } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

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
        rootMargin: '200px', // Start loading 200px before reaching the trigger
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
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography variant="body2" color="text.secondary">
          No more issues to load
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      ref={triggerRef}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        py: 4,
        minHeight: 100,
      }}
    >
      {loading && <CircularProgress size={32} />}
    </Box>
  );
}
