import React, {useCallback, useEffect} from 'react';
import {Alert, Box, Container, Stack, Typography} from '@mui/material';
import {useInfiniteIssues} from '../hooks/useInfiniteIssues';
import {useFilters} from '../hooks/useFilters';
import {useSorting} from '../hooks/useSorting';
import {useRandomIssue} from '../hooks/useRandomIssue';
import {useIssuesRequest} from '../hooks/useIssuesRequest';
import {IssuesList} from '../components/IssuesList';
import {InfiniteScrollTrigger} from '../components/InfiniteScrollTrigger';
import {FiltersSection} from '../components/FiltersSection';
import {SortSection} from '../components/SortSection';
import {ActionButtons} from '../components/ActionButtons';
import {Loader} from '../../shared/ui/Loader/Loader';
import {DEFAULT_STARS_FILTER} from '../../shared/constants';
import {updateUrlParams} from '../../shared/utils/urlParams';

export function IssuesPage() {
    const filters = useFilters({initialStarsFilter: DEFAULT_STARS_FILTER});
    const sorting = useSorting();

    // Sync state with URL whenever filters or sorting change
    useEffect(() => {
        // Update URL with current state
        updateUrlParams(
            filters.selectedLanguages,
            filters.starsFilter,
            sorting.sortOrders
        );
    }, [filters.selectedLanguages, filters.starsFilter, sorting.sortOrders]);

    const baseRequest = useIssuesRequest({
        selectedLanguages: filters.selectedLanguages,
        starsFilter: filters.starsFilter,
        sortOrders: sorting.sortOrders,
    });

  const {
    issues,
    loading,
    loadingMore,
    error,
    hasMore,
    loadMore,
  } = useInfiniteIssues(baseRequest);

    const {pickingRandom, pickRandom} = useRandomIssue();

  const handleLoadMore = useCallback(() => {
    if (hasMore && !loadingMore) {
      loadMore();
    }
  }, [hasMore, loadingMore, loadMore]);

    const handlePickRandom = useCallback(() => {
        pickRandom(baseRequest);
    }, [baseRequest, pickRandom]);

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
          <Box sx={{mb: 3}}>
              <ActionButtons pickingRandom={pickingRandom} onPickRandom={handlePickRandom}/>
          </Box>

        <Stack spacing={3} sx={{ mb: 3 }}>
          <FiltersSection
              selectedLanguages={filters.selectedLanguages}
              onLanguagesChange={filters.handleLanguageChange}
              starsFilter={filters.starsFilter}
              onStarsValueChange={filters.handleStarsValueChange}
              onStarsOperatorChange={filters.handleStarsOperatorChange}
              onRemoveStarsFilter={filters.handleRemoveStarsFilter}
              onAddStarsFilter={filters.handleAddStarsFilter}
          />

          <SortSection
              sortOrders={sorting.sortOrders}
              onAddSortField={sorting.handleAddSortField}
              onRemoveSortField={sorting.handleRemoveSortField}
              onSortFieldChange={sorting.handleSortFieldChange}
              onSortTypeChange={sorting.handleSortTypeChange}
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
