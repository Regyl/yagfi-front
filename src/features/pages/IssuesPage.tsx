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
import {
    ActionsSection,
    EmptyState,
    ErrorAlert,
    FiltersStack,
    PageContainer,
    PageHeader,
    ResultsCount,
} from './IssuesPage.styles';

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
    <PageContainer maxWidth="xl">
      <PageHeader>
          <ActionsSection>
              <ActionButtons pickingRandom={pickingRandom} onPickRandom={handlePickRandom}/>
          </ActionsSection>

        <FiltersStack spacing={3}>
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
        </FiltersStack>

        {!loading && issues.length > 0 && (
          <ResultsCount variant="body2" color="text.secondary">
            Showing {issues.length} issues
          </ResultsCount>
        )}
      </PageHeader>

      {loading && issues.length === 0 && <Loader />}

      {error && (
        <ErrorAlert severity="error">
          Failed to load issues: {error.message}
        </ErrorAlert>
      )}

      {!loading && issues.length === 0 && (
        <EmptyState variant="body1" color="text.secondary">
          No issues found. Try adjusting your filters.
        </EmptyState>
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
    </PageContainer>
  );
}
