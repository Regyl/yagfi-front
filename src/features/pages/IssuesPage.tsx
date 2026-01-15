import React, {useCallback, useMemo, useState} from 'react';
import {Alert, Box, Button, CircularProgress, Container, SelectChangeEvent, Stack, Typography,} from '@mui/material';
import {Shuffle as ShuffleIcon} from '@mui/icons-material';
import {useInfiniteIssues} from '../hooks/useInfiniteIssues';
import {IssuesList} from '../components/IssuesList';
import {InfiniteScrollTrigger} from '../components/InfiniteScrollTrigger';
import {FiltersSection} from '../components/FiltersSection';
import {DEFAULT_SORT_FIELD, SortSection} from '../components/SortSection';
import {Loader} from '../../shared/ui/Loader/Loader';
import {fetchIssues} from '../../api/issuesApi';
import {IssuesRequest, Order, StarsFilter} from '../../types';

const PAGE_SIZE = 20;

export function IssuesPage() {
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [starsFilter, setStarsFilter] = useState<{ value: number; operator: StarsFilter['operator'] } | null>({
    value: 10,
    operator: 'GREATER',
  });
  const [sortOrders, setSortOrders] = useState<Order[]>([
    { field: DEFAULT_SORT_FIELD, type: 'desc' },
  ]);
  const [pickingRandom, setPickingRandom] = useState(false);

  const baseRequest = useMemo((): Omit<IssuesRequest, 'offset'> => {
    const filter: IssuesRequest['filter'] = {};
    
    if (selectedLanguages.length > 0) {
      filter.languages = {
        values: selectedLanguages,
        operator: 'IN',
      };
    }

    if (starsFilter && starsFilter.value !== null && starsFilter.value !== undefined) {
      filter.stars = {
        value: starsFilter.value,
        operator: starsFilter.operator,
      };
    }

    return {
      limit: PAGE_SIZE,
      filter: Object.keys(filter).length > 0 ? filter : undefined,
      orders: sortOrders.length > 0 ? sortOrders : undefined,
    };
  }, [selectedLanguages, starsFilter, sortOrders]);

  const {
    issues,
    loading,
    loadingMore,
    error,
    hasMore,
    loadMore,
  } = useInfiniteIssues(baseRequest);

  const handleLoadMore = useCallback(() => {
    if (hasMore && !loadingMore) {
      loadMore();
    }
  }, [hasMore, loadingMore, loadMore]);

  const handleLanguagesChange = (languages: string[]) => {
    setSelectedLanguages(languages);
  };

  const handleStarsFilterChange = (value: number | null, operator: StarsFilter['operator']) => {
    if (value !== null && value !== undefined && !isNaN(value) && value >= 0) {
      setStarsFilter({ value, operator });
    } else {
      setStarsFilter(null);
    }
  };

  const handleStarsValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    if (inputValue === '') {
      setStarsFilter(null);
      return;
    }
    const value = parseInt(inputValue, 10);
    if (starsFilter) {
      handleStarsFilterChange(isNaN(value) ? null : value, starsFilter.operator);
    } else {
      handleStarsFilterChange(isNaN(value) ? null : value, 'GREATER');
    }
  };

  const handleStarsOperatorChange = (event: SelectChangeEvent<StarsFilter['operator']>) => {
    const operator = event.target.value as StarsFilter['operator'];
    if (starsFilter) {
      setStarsFilter({ ...starsFilter, operator });
    } else {
      setStarsFilter({ value: 0, operator });
    }
  };

  const handleRemoveStarsFilter = () => {
    setStarsFilter(null);
  };

  const handleAddSortField = () => {
    setSortOrders([...sortOrders, { field: DEFAULT_SORT_FIELD, type: 'desc' }]);
  };

  const handleRemoveSortField = (index: number) => {
    if (sortOrders.length > 1) {
      setSortOrders(sortOrders.filter((_, i) => i !== index));
    }
  };

  const handleSortFieldChange = (index: number, field: string) => {
    setSortOrders(
      sortOrders.map((order, i) => (i === index ? { ...order, field } : order))
    );
  };

  const handleSortTypeChange = (index: number, type: 'asc' | 'desc') => {
    setSortOrders(
      sortOrders.map((order, i) => (i === index ? { ...order, type } : order))
    );
  };

  const handlePickRandom = useCallback(async () => {
    setPickingRandom(true);
    try {
      // Try to get a random issue by requesting with random offset
      // We'll try up to 5 times with different random offsets
      const maxAttempts = 5;
      const maxOffset = 100; // Reasonable upper bound for random offset
      
      for (let attempt = 0; attempt < maxAttempts; attempt++) {
        const randomOffset = Math.floor(Math.random() * maxOffset);
        
        const request: IssuesRequest = {
          ...baseRequest,
          limit: 1,
          offset: randomOffset,
        };

        const response = await fetchIssues(request);
        
        if (response.issues && response.issues.length > 0) {
          const randomIssue = response.issues[0];
          window.open(randomIssue.issueUrl, '_blank', 'noopener,noreferrer');
          setPickingRandom(false);
          return;
        }
      }
      
      // If all attempts failed, try with offset 0
      const request: IssuesRequest = {
        ...baseRequest,
        limit: 1,
        offset: 0,
      };
      
      const response = await fetchIssues(request);
      if (response.issues && response.issues.length > 0) {
        const randomIssue = response.issues[0];
        window.open(randomIssue.issueUrl, '_blank', 'noopener,noreferrer');
      } else {
        alert('No issues found with current filters. Try adjusting your filters.');
      }
    } catch (err) {
      console.error('Failed to pick random issue:', err);
      alert('Failed to pick random issue. Please try again.');
    } finally {
      setPickingRandom(false);
    }
  }, [baseRequest]);

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
          <Typography variant="h1" sx={{ fontSize: '2rem', fontWeight: 700 }}>
            Good First Issues
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={pickingRandom ? <CircularProgress size={16} sx={{ color: 'inherit' }} /> : <ShuffleIcon />}
            onClick={handlePickRandom}
            disabled={pickingRandom}
            sx={{ minWidth: 150 }}
          >
            {pickingRandom ? 'Picking...' : 'Pick Random'}
          </Button>
        </Stack>

        <Stack spacing={3} sx={{ mb: 3 }}>
          <FiltersSection
            selectedLanguages={selectedLanguages}
            onLanguagesChange={handleLanguagesChange}
            starsFilter={starsFilter}
            onStarsFilterChange={handleStarsFilterChange}
            onStarsValueChange={handleStarsValueChange}
            onStarsOperatorChange={handleStarsOperatorChange}
            onRemoveStarsFilter={handleRemoveStarsFilter}
          />

          <SortSection
            sortOrders={sortOrders}
            onAddSortField={handleAddSortField}
            onRemoveSortField={handleRemoveSortField}
            onSortFieldChange={handleSortFieldChange}
            onSortTypeChange={handleSortTypeChange}
          />
        </Stack>

        {!loading && issues.length > 0 && (
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Showing {issues.length} issues
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
