import React from 'react';
import {Box, Button, Stack, Typography,} from '@mui/material';
import {Add as AddIcon} from '@mui/icons-material';
import {Order} from '../../types';
import {SortFieldItem} from './SortFieldItem';

const DEFAULT_SORT_FIELD = 'ei.created_at';

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
      <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
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
      </Stack>

      <Stack spacing={1.5}>
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
        <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
          Items are sorted by the first field, then by the second, and so on.
        </Typography>
      )}
    </Box>
  );
}

// Export default sort field for use in parent component
export { DEFAULT_SORT_FIELD };
