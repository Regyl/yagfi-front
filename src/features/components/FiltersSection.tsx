import React from 'react';
import {
    Autocomplete,
    Box,
    Button,
    CircularProgress,
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
import {STARS_OPERATORS} from '../../shared/constants';
import {useLanguages} from '../hooks';

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
            sx={{minWidth: 200}}
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
