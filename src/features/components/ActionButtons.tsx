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
    <div className="flex items-center justify-center gap-4">
      <Button asChild>
        <a
          href={CONTRIBUTING_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="min-w-[150px]"
        >
          <Tag className="size-4" />
          Suggest a Label
        </a>
      </Button>
      <Button onClick={onPickRandom} disabled={pickingRandom} className="min-w-[150px]">
        {pickingRandom ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          <Shuffle className="size-4" />
        )}
        {pickingRandom ? 'Picking...' : 'Pick Random'}
      </Button>
    </div>
  );
}
