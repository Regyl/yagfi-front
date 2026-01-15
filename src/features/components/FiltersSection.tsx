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

const LANGUAGES = [
  'JavaScript',
  'TypeScript',
  'Python',
  'Java',
  'C++',
  'C#',
  'Go',
  'Rust',
  'Ruby',
  'PHP',
  'Swift',
  'Kotlin',
  'Dart',
  'Perl',
  'Scala',
  'R',
  'Shell',
  'HTML',
  'CSS',
];

const STARS_OPERATORS = [
  { value: 'GREATER', label: 'Greater than (>)' },
  { value: 'LESS', label: 'Less than (<)' },
] as const;

interface FiltersSectionProps {
  selectedLanguages: string[];
  onLanguagesChange: (languages: string[]) => void;
  starsFilter: { value: number; operator: StarsFilter['operator'] } | null;
  onStarsFilterChange: (value: number | null, operator: StarsFilter['operator']) => void;
  onStarsValueChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onStarsOperatorChange: (event: SelectChangeEvent<StarsFilter['operator']>) => void;
  onRemoveStarsFilter: () => void;
}

export function FiltersSection({
  selectedLanguages,
  onLanguagesChange,
  starsFilter,
  onStarsFilterChange,
  onStarsValueChange,
  onStarsOperatorChange,
  onRemoveStarsFilter,
}: FiltersSectionProps) {
  const handleLanguageChange = (event: SelectChangeEvent<string[]>) => {
    const value = event.target.value;
    onLanguagesChange(typeof value === 'string' ? value.split(',') : value);
  };

  return (
    <Stack spacing={3}>
      <FormControl size="small" sx={{ minWidth: 200 }}>
        <InputLabel id="language-label">Languages</InputLabel>
        <Select
          labelId="language-label"
          multiple
          value={selectedLanguages}
          label="Languages"
          onChange={handleLanguageChange}
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
            onClick={() => onStarsFilterChange(100, 'GREATER')}
            variant="outlined"
          >
            Add Stars Filter
          </Button>
        )}
      </Box>
    </Stack>
  );
}
