import React, {useCallback, useMemo, useState} from 'react';
import {
    Alert,
    Box,
    Container,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    Stack,
    Typography,
} from '@mui/material';
import {useInfiniteIssues} from '../hooks/useInfiniteIssues';
import {IssuesList} from '../components/IssuesList';
import {InfiniteScrollTrigger} from '../components/InfiniteScrollTrigger';
import {Loader} from '../../shared/ui/Loader/Loader';

const PAGE_SIZE = 20;
const LANGUAGES = [
  'All',
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

const SORT_FIELDS = [
  { value: 'stars', label: 'Stars' },
  { value: 'createdAt', label: 'Created At' },
  { value: 'updatedAt', label: 'Updated At' },
] as const;

const SORT_TYPES = [
  { value: 'desc', label: 'Descending' },
  { value: 'asc', label: 'Ascending' },
] as const;

export function IssuesPage() {
  const [language, setLanguage] = useState<string>('All');
  const [sortField, setSortField] = useState<'stars' | 'createdAt' | 'updatedAt'>('stars');
  const [sortType, setSortType] = useState<'asc' | 'desc'>('desc');

  const baseRequest = useMemo(
    () => ({
      size: PAGE_SIZE,
      filter: language !== 'All' ? { language } : undefined,
      order: {
        field: sortField,
        type: sortType,
      },
    }),
    [language, sortField, sortType]
  );

  const {
    issues,
    loading,
    loadingMore,
    error,
    hasMore,
    totalElements,
    loadMore,
  } = useInfiniteIssues(baseRequest);

  const handleLoadMore = useCallback(() => {
    if (hasMore && !loadingMore) {
      loadMore();
    }
  }, [hasMore, loadingMore, loadMore]);

  const handleLanguageChange = (event: SelectChangeEvent<string>) => {
    setLanguage(event.target.value);
  };

  const handleSortFieldChange = (event: SelectChangeEvent<'stars' | 'createdAt' | 'updatedAt'>) => {
    setSortField(event.target.value as 'stars' | 'createdAt' | 'updatedAt');
  };

  const handleSortTypeChange = (event: SelectChangeEvent<'asc' | 'desc'>) => {
    setSortType(event.target.value as 'asc' | 'desc');
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h1" sx={{ mb: 3, fontSize: '2rem', fontWeight: 700 }}>
          Good First Issues
        </Typography>

        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          sx={{ mb: 3 }}
        >
          <FormControl size="small" sx={{ minWidth: 200 }}>
            <InputLabel id="language-label">Language</InputLabel>
            <Select
              labelId="language-label"
              value={language}
              label="Language"
              onChange={handleLanguageChange}
            >
              {LANGUAGES.map((lang) => (
                <MenuItem key={lang} value={lang}>
                  {lang}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: 180 }}>
            <InputLabel id="sort-field-label">Sort By</InputLabel>
            <Select
              labelId="sort-field-label"
              value={sortField}
              label="Sort By"
              onChange={handleSortFieldChange}
            >
              {SORT_FIELDS.map((field) => (
                <MenuItem key={field.value} value={field.value}>
                  {field.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel id="sort-type-label">Order</InputLabel>
            <Select
              labelId="sort-type-label"
              value={sortType}
              label="Order"
              onChange={handleSortTypeChange}
            >
              {SORT_TYPES.map((type) => (
                <MenuItem key={type.value} value={type.value}>
                  {type.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>

        {!loading && issues.length > 0 && (
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Showing {issues.length} of {totalElements} issues
          </Typography>
        )}
      </Box>

      {loading && issues.length === 0 && <Loader />}

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          Failed to load issues: {error.message}
        </Alert>
      )}

      {!loading && issues.length === 0 && (
        <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center', py: 8 }}>
          No issues found. Try adjusting your filters.
        </Typography>
      )}

      {issues.length > 0 && (
        <>
          <IssuesList issues={issues} />
          <InfiniteScrollTrigger
            onIntersect={handleLoadMore}
            hasMore={hasMore}
            loading={loadingMore}
          />
        </>
      )}
    </Container>
  );
}
