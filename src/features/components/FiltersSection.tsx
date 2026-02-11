import React from 'react';
import {
    Autocomplete,
    Box,
    Button,
    CircularProgress,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    Stack,
    TextField,
} from '@mui/material';
import {Add as AddIcon, Close as CloseIcon} from '@mui/icons-material';
import {StarsFilter} from '../../types';
import {STARS_OPERATORS} from '../../shared/constants';
import {useLanguages} from '../hooks';
import {autocompleteStyles, FilterLabel, StarsFormControl, StarsTextField,} from './FiltersSection.styles';

interface FiltersSectionProps {
  selectedLanguages: string[];
  onLanguagesChange: (languages: string[]) => void;
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
  const {languages, loading: languagesLoading} = useLanguages();

  return (
    <Stack spacing={3}>
      <Autocomplete
        multiple
        sx={autocompleteStyles}
        options={languages.filter((lang) => lang != null && lang.trim() !== '')}
        value={selectedLanguages}
        onChange={(_, newValue) => {
          onLanguagesChange(newValue);
        }}
        loading={languagesLoading}
        filterSelectedOptions
        getOptionLabel={(option) => option || ''}
        filterOptions={(options, {inputValue}) => {
          const input = inputValue.toLowerCase().trim();
          if (!input) {
            return options;
          }
          return options.filter((option) =>
            option && option.toLowerCase().startsWith(input)
          );
        }}
        size="small"
        renderInput={(params) => (
          <TextField
            {...params}
            label="Languages"
            placeholder={selectedLanguages.length === 0 ? 'All languages' : 'Select languages'}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {languagesLoading ? <CircularProgress color="inherit" size={20}/> : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
        ListboxProps={{
          style: {
            maxHeight: 300,
          },
        }}
      />

      <Box>
        <FilterLabel variant="subtitle2" color="text.secondary">
          Filter by Stars:
        </FilterLabel>
        {starsFilter ? (
          <Stack direction="row" spacing={2} alignItems="center">
            <StarsFormControl size="small">
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
            </StarsFormControl>
            <StarsTextField
              size="small"
              type="text"
              label="Stars"
              value={starsFilter.value}
              onChange={onStarsValueChange}
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
