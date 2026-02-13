import React, {useCallback, useEffect} from 'react';
import {useInfiniteIssues} from '@/features/hooks/useInfiniteIssues';
import {useFilters} from '@/features/hooks/useFilters';
import {useSorting} from '@/features/hooks/useSorting';
import {useRandomIssue} from '@/features/hooks/useRandomIssue';
import {useIssuesRequest} from '@/features/hooks';
import {IssuesList} from '../components/IssuesList';
import {InfiniteScrollTrigger} from '../components/InfiniteScrollTrigger';
import {FiltersSection} from '../components/FiltersSection';
import {SortSection} from '../components/SortSection';
import {ActionButtons} from '../components/ActionButtons';
import {Loader} from '@/shared/ui/Loader/Loader';
import {DEFAULT_STARS_FILTER} from '@/shared/constants';
import {updateUrlParams} from '@/shared/utils/urlParams';
import {Alert, AlertDescription} from '@/components/ui/alert';

export function IssuesPage() {
  const filters = useFilters({initialStarsFilter: DEFAULT_STARS_FILTER});
  const sorting = useSorting();

  useEffect(() => {
    updateUrlParams(
      filters.selectedLanguages,
      filters.selectedLicenses,
      filters.licensesOperator,
      filters.starsFilter,
      sorting.sortOrders
    );
  }, [
    filters.selectedLanguages,
    filters.selectedLicenses,
    filters.licensesOperator,
    filters.starsFilter,
    sorting.sortOrders,
  ]);

  const baseRequest = useIssuesRequest({
    selectedLanguages: filters.selectedLanguages,
    selectedLicenses: filters.selectedLicenses,
    licensesOperator: filters.licensesOperator,
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
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <section className="mb-12 sm:mb-16" aria-labelledby="hero-heading">
        <h1
          id="hero-heading"
          className="bg-gradient-to-r from-primary via-violet-600 to-primary bg-clip-text text-3xl font-semibold tracking-tight text-transparent sm:text-4xl"
        >
          Find Your First Open Source Contribution
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground leading-relaxed">
          Browse beginner-friendly issues labeled <strong>help wanted</strong> and{' '}
          <strong>good first issue</strong> from popular GitHub repositories.
        </p>
      </section>

      <section className="mb-8" aria-label="Filters and actions">
        <div className="mb-6">
          <ActionButtons pickingRandom={pickingRandom} onPickRandom={handlePickRandom} />
        </div>
        <div className="mb-8 flex flex-col gap-8">
          <FiltersSection
            selectedLanguages={filters.selectedLanguages}
            onLanguagesChange={filters.handleLanguageChange}
            selectedLicenses={filters.selectedLicenses}
            onLicensesChange={filters.handleLicenseChange}
            licensesOperator={filters.licensesOperator}
            onLicensesOperatorChange={filters.handleLicensesOperatorChange}
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
          <p className="mb-4 text-sm text-muted-foreground">
            Showing {issues.length} issues
          </p>
        )}
      </section>

      {loading && issues.length === 0 && <Loader />}

      {error && (
        <Alert variant="destructive" className="mb-8" role="alert">
          <AlertDescription>Failed to load issues: {error.message}</AlertDescription>
        </Alert>
      )}

      {!loading && issues.length === 0 && (
        <p className="py-20 text-center text-muted-foreground">
          No issues found. Try adjusting your filters.
        </p>
      )}

      {issues.length > 0 && (
        <section aria-label="Issues list">
          <IssuesList issues={issues} />
          <InfiniteScrollTrigger
            onIntersect={handleLoadMore}
            hasMore={hasMore}
            loading={loadingMore}
          />
        </section>
      )}
    </div>
  );
}
