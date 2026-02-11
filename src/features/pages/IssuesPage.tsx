import React, {useCallback, useEffect} from 'react';
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
import {Alert, AlertDescription} from '@/components/ui/alert';

export function IssuesPage() {
  const filters = useFilters({initialStarsFilter: DEFAULT_STARS_FILTER});
  const sorting = useSorting();

  useEffect(() => {
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

  const {issues, loading, loadingMore, error, hasMore, loadMore} =
    useInfiniteIssues(baseRequest);
  const {pickingRandom, pickRandom} = useRandomIssue();

  const handleLoadMore = useCallback(() => {
    if (hasMore && !loadingMore) loadMore();
  }, [hasMore, loadingMore, loadMore]);

  const handlePickRandom = useCallback(() => {
    pickRandom(baseRequest);
  }, [baseRequest, pickRandom]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <div className="mb-6">
        <div className="mb-4">
          <ActionButtons pickingRandom={pickingRandom} onPickRandom={handlePickRandom} />
        </div>
        <div className="mb-4 flex flex-col gap-6">
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
        </div>
        {!loading && issues.length > 0 && (
          <p className="mb-2 text-sm text-muted-foreground">
            Showing {issues.length} issues
          </p>
        )}
      </div>

      {loading && issues.length === 0 && <Loader />}

      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>Failed to load issues: {error.message}</AlertDescription>
        </Alert>
      )}

      {!loading && issues.length === 0 && (
        <p className="py-16 text-center text-muted-foreground">
          No issues found. Try adjusting your filters.
        </p>
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
    </div>
  );
}
