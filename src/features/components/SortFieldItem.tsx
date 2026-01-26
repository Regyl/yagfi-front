import React from 'react';
import {
    Box,
    Chip,
    FormControl,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    Stack,
} from '@mui/material';
import {Delete as DeleteIcon} from '@mui/icons-material';
import {Order} from '../../types';
import {SORT_FIELDS, SORT_TYPES} from '../../shared/constants';
import styles from './SortFieldItem.module.css';

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
  const handleFieldChange = (event: SelectChangeEvent<string>) => {
    onFieldChange(event.target.value);
  };

  const handleTypeChange = (event: SelectChangeEvent<'asc' | 'desc'>) => {
    onTypeChange(event.target.value);
  };

  return (
      <Box className={styles.container}>
          <Stack direction="column" spacing={2} alignItems={"center"} className={styles.contentStack}>
        <Chip
          label={`${index + 1}`}
          size="small"
          color="primary"
          className={styles.chip}
        />

              <FormControl size="small" className={styles.fieldFormControl}>
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
        </FormControl>

              <FormControl size="small" className={styles.typeFormControl}>
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
        </FormControl>

        {canRemove && (
          <IconButton
            size="small"
            onClick={onRemove}
            color="error"
            className={styles.removeButton}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        )}
      </Stack>
    </Box>
  );
}
