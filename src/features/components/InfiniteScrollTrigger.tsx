import React, {useEffect, useRef} from 'react';
import {Loader2} from 'lucide-react';

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
        if (entry.isIntersecting && hasMore && !loading) onIntersect();
      },
      {root: null, rootMargin: '200px', threshold: 0.1}
    );
    const el = triggerRef.current;
    if (el) observer.observe(el);
    return () => {
      if (el) observer.unobserve(el);
    };
  }, [hasMore, loading, onIntersect]);

  if (!hasMore) {
    return (
      <div className="py-16 text-center">
        <p className="text-sm text-muted-foreground">No more issues to load</p>
      </div>
    );
  }

  return (
    <div
      ref={triggerRef}
      className="flex min-h-[100px] items-center justify-center py-16"
    >
      {loading && <Loader2 className="size-8 animate-spin text-muted-foreground" />}
    </div>
  );
}
