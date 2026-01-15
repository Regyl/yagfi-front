import React from 'react';
import {
    Box,
    Button,
    FormControl,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import {Add as AddIcon, Close as CloseIcon} from '@mui/icons-material';
import {StarsFilter} from '../../types';
import {LANGUAGES, STARS_OPERATORS} from '../../shared/constants';

interface FiltersSectionProps {
  selectedLanguages: string[];
    onLanguagesChange: (event: SelectChangeEvent<string[]>) => void;
  starsFilter: { value: number; operator: StarsFilter['operator'] } | null;
  onStarsValueChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onStarsOperatorChange: (event: SelectChangeEvent<StarsFilter['operator']>) => void;
  onRemoveStarsFilter: () => void;
    onAddStarsFilter: () => void;
}

export function FiltersSection({
  selectedLanguages,
  onLanguagesChange,
  starsFilter,
  onStarsValueChange,
  onStarsOperatorChange,
  onRemoveStarsFilter,
                                   onAddStarsFilter,
}: FiltersSectionProps) {

  return (
    <Stack spacing={3}>
      <FormControl size="small" sx={{ minWidth: 200 }}>
        <InputLabel id="language-label">Languages</InputLabel>
        <Select
          labelId="language-label"
          multiple
          value={selectedLanguages}
          label="Languages"
          onChange={onLanguagesChange}
          renderValue={(selected) => 
            selected.length === 0 ? 'All' : selected.join(', ')
          }
        >
          {LANGUAGES.map((lang) => (
            <MenuItem key={lang} value={lang}>
              {lang}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Box>
        <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
          Filter by Stars:
        </Typography>
        {starsFilter ? (
          <Stack direction="row" spacing={2} alignItems="center">
            <FormControl size="small" sx={{ minWidth: 180 }}>
              <InputLabel id="stars-operator-label">Operator</InputLabel>
              <Select
                labelId="stars-operator-label"
                value={starsFilter.operator}
                label="Operator"
                onChange={onStarsOperatorChange}
              >
                {STARS_OPERATORS.map((op) => (
                  <MenuItem key={op.value} value={op.value}>
                    {op.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              size="small"
              type="text"
              label="Stars"
              value={starsFilter.value}
              onChange={onStarsValueChange}
              sx={{ minWidth: 120 }}
            />
            <IconButton
              size="small"
              onClick={onRemoveStarsFilter}
              color="error"
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </Stack>
        ) : (
          <Button
            size="small"
            startIcon={<AddIcon />}
            onClick={onAddStarsFilter}
            variant="outlined"
          >
            Add Stars Filter
          </Button>
        )}
      </Box>
    </Stack>
  );
}
