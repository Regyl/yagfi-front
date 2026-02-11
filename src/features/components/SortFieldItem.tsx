import React from 'react';
import {InputLabel, MenuItem, Select, SelectChangeEvent, Stack} from '@mui/material';
import {Delete as DeleteIcon} from '@mui/icons-material';
import {Order} from '../../types';
import {SORT_FIELDS, SORT_TYPES} from '../../shared/constants';
import {FieldFormControl, OrderChip, RemoveButton, SortFieldContainer, TypeFormControl,} from './SortFieldItem.styles';

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
  const handleFieldChange = (event: SelectChangeEvent) => {
    onFieldChange(event.target.value);
  };

  const handleTypeChange = (event: SelectChangeEvent<'asc' | 'desc'>) => {
    onTypeChange(event.target.value);
  };

  return (
    <SortFieldContainer>
      <Stack direction="column" spacing={2} alignItems="center">
        <OrderChip label={`${index + 1}`} size="small" color="primary" />

        <FieldFormControl size="small">
          <InputLabel id={`sort-field-${index}-label`}>Field</InputLabel>
          <Select
            labelId={`sort-field-${index}-label`}
            value={order.field}
            label="Field"
            onChange={handleFieldChange}
          >
            {SORT_FIELDS.map((field) => (
              <MenuItem key={field.value} value={field.value}>
                {field.label}
              </MenuItem>
            ))}
          </Select>
        </FieldFormControl>

        <TypeFormControl size="small">
          <InputLabel id={`sort-type-${index}-label`}>Order</InputLabel>
          <Select
            labelId={`sort-type-${index}-label`}
            value={order.type}
            label="Order"
            onChange={handleTypeChange}
          >
            {SORT_TYPES.map((type) => (
              <MenuItem key={type.value} value={type.value}>
                {type.label}
              </MenuItem>
            ))}
          </Select>
        </TypeFormControl>

        {canRemove && (
          <RemoveButton size="small" onClick={onRemove} color="error">
            <DeleteIcon fontSize="small" />
          </RemoveButton>
        )}
      </Stack>
    </SortFieldContainer>
  );
}
