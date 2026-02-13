import React from 'react';
import {Loader2, Shuffle, Tag} from 'lucide-react';
import {CONTRIBUTING_URL} from '@/shared/constants';
import {Button} from '@/components/ui/button';

interface ActionButtonsProps {
  pickingRandom: boolean;
  onPickRandom: () => void;
}

export function ActionButtons({pickingRandom, onPickRandom}: ActionButtonsProps) {
  return (
    <div className="flex flex-wrap items-center gap-3 sm:gap-4">
      <Button asChild variant="outline" size="default">
        <a
          href={CONTRIBUTING_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-w-[140px] items-center justify-center gap-2"
        >
          <Tag className="size-4" aria-hidden />
          Suggest a Label
        </a>
      </Button>
      <Button
        onClick={onPickRandom}
        disabled={pickingRandom}
        size="default"
        className="min-w-[140px]"
      >
        {pickingRandom ? (
          <Loader2 className="size-4 animate-spin" aria-hidden />
        ) : (
          <Shuffle className="size-4" aria-hidden />
        )}
        {pickingRandom ? 'Picking...' : 'Pick Random'}
      </Button>
    </div>
  );
}
