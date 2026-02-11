import React from 'react';
import {Trash2} from 'lucide-react';
import {Order} from '@/types';
import {SORT_FIELDS, SORT_TYPES} from '@/shared/constants';
import {Badge} from '@/components/ui/badge';
import {Button} from '@/components/ui/button';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import {Label} from '@/components/ui/label';

interface SortFieldItemProps {
  order: Order;
  index: number;
  onFieldChange: (field: string) => void;
  onTypeChange: (type: 'asc' | 'desc') => void;
  onRemove: () => void;
  canRemove: boolean;
}

export function SortFieldItem({
  order,
  index,
  onFieldChange,
  onTypeChange,
  onRemove,
  canRemove,
}: SortFieldItemProps) {
  return (
    <div className="max-w-[215px] rounded-lg border border-border bg-card p-4">
      <div className="flex flex-col items-center gap-4">
        <Badge className="flex size-8 min-w-8 max-w-8 items-center justify-center font-semibold">
          {index + 1}
        </Badge>
        <div className="flex w-full flex-col gap-2">
          <Label>Field</Label>
          <Select value={order.field} onValueChange={onFieldChange}>
            <SelectTrigger className="h-8 w-full">
              <SelectValue placeholder="Field" />
            </SelectTrigger>
            <SelectContent>
              {SORT_FIELDS.map((f) => (
                <SelectItem key={f.value} value={f.value}>
                  {f.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex w-full flex-col gap-2">
          <Label>Order</Label>
          <Select value={order.type} onValueChange={(v) => onTypeChange(v as 'asc' | 'desc')}>
            <SelectTrigger className="h-8 w-full">
              <SelectValue placeholder="Order" />
            </SelectTrigger>
            <SelectContent>
              {SORT_TYPES.map((t) => (
                <SelectItem key={t.value} value={t.value}>
                  {t.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {canRemove && (
          <Button variant="ghost" size="icon" onClick={onRemove} className="size-8 text-destructive">
            <Trash2 className="size-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
