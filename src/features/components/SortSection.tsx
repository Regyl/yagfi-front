import React from 'react';
import {Plus} from 'lucide-react';
import {Order} from '@/types';
import {SortFieldItem} from './SortFieldItem';
import {Button} from '@/components/ui/button';

interface SortSectionProps {
  sortOrders: Order[];
  onAddSortField: () => void;
  onRemoveSortField: (index: number) => void;
  onSortFieldChange: (index: number, field: string) => void;
  onSortTypeChange: (index: number, type: 'asc' | 'desc') => void;
}

export function SortSection({
  sortOrders,
  onAddSortField,
  onRemoveSortField,
  onSortFieldChange,
  onSortTypeChange,
}: SortSectionProps) {
  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-4">
        <span className="text-sm font-medium text-muted-foreground">
          Sort Order (priority):
        </span>
        <Button variant="outline" size="sm" onClick={onAddSortField}>
          <Plus className="size-4" />
          Add Sort Field
        </Button>
      </div>
      <div className="flex flex-wrap gap-3">
        {sortOrders.map((order, i) => (
          <SortFieldItem
            key={i}
            order={order}
            index={i}
            onFieldChange={(f) => onSortFieldChange(i, f)}
            onTypeChange={(t) => onSortTypeChange(i, t)}
            onRemove={() => onRemoveSortField(i)}
            canRemove={sortOrders.length > 1}
          />
        ))}
      </div>
      {sortOrders.length > 1 && (
        <p className="mt-2 block text-sm text-muted-foreground">
          Items are sorted by the first field, then by the second, and so on.
        </p>
      )}
    </div>
  );
}
