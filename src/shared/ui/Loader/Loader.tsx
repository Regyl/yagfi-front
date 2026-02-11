import React from 'react';
import {Loader2} from 'lucide-react';

export function Loader() {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center gap-4">
      <Loader2 className="size-12 animate-spin text-muted-foreground" />
      <p className="text-sm text-muted-foreground">Loading issues...</p>
    </div>
  );
}
