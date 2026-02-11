import React from 'react';
import {Box, Button, Stack, Typography} from '@mui/material';
import {Add as AddIcon} from '@mui/icons-material';
import {Order} from '../../types';
import {SortFieldItem} from './SortFieldItem';
import {SortHint, SortRow} from './SortSection.styles';

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
    <Box>
      <SortRow direction="row" spacing={2} alignItems="center">
        <Typography variant="subtitle2" color="text.secondary">
          Sort Order (priority):
        </Typography>
        <Button
          size="small"
          startIcon={<AddIcon />}
          onClick={onAddSortField}
          variant="outlined"
        >
          Add Sort Field
        </Button>
      </SortRow>

      <Stack spacing={1.5} direction="row">
        {sortOrders.map((order, index) => (
          <SortFieldItem
            key={index}
            order={order}
            index={index}
            onFieldChange={(field) => onSortFieldChange(index, field)}
            onTypeChange={(type) => onSortTypeChange(index, type)}
            onRemove={() => onRemoveSortField(index)}
            canRemove={sortOrders.length > 1}
          />
        ))}
      </Stack>

      {sortOrders.length > 1 && (
        <SortHint variant="caption" color="text.secondary">
          Items are sorted by the first field, then by the second, and so on.
        </SortHint>
      )}
    </Box>
  );
}
