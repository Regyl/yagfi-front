import {useCallback, useEffect, useRef, useState} from 'react';
import {LicensesFilter, StarsFilter} from '@/types';
import {DEFAULT_STARS_FILTER} from '@/shared/constants';
import {getIsUpdatingUrl, onUrlUpdate, readStateFromUrl} from '@/shared/utils/urlParams';

export interface UseFiltersReturn {
    selectedLanguages: string[];
    selectedLicenses: string[];
    licensesOperator: LicensesFilter['operator'];
    starsFilter: { value: number; operator: StarsFilter['operator'] } | null;
    handleLanguageChange: (languages: string[]) => void;
    handleLicenseChange: (licenses: string[]) => void;
    handleLicensesOperatorChange: (operator: LicensesFilter['operator']) => void;
    handleStarsValueChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleStarsOperatorChange: (operator: StarsFilter['operator']) => void;
    handleRemoveStarsFilter: () => void;
    handleAddStarsFilter: () => void;
    handleResetLanguages: () => void;
    handleResetLicenses: () => void;
    handleResetAll: () => void;
}

interface UseFiltersParams {
    initialLanguages?: string[];
    initialStarsFilter?: { value: number; operator: StarsFilter['operator'] } | null;
    syncFromUrl?: boolean; // If true, sync state from URL changes (e.g., browser back/forward)
}

export function useFilters({
                               initialLanguages,
                               initialStarsFilter = DEFAULT_STARS_FILTER,
                               syncFromUrl = true,
                           }: UseFiltersParams = {}): UseFiltersReturn {
    // Initialize from URL or provided defaults
    // URL has priority over initial values
    const urlState = readStateFromUrl();
    const urlParams = new URLSearchParams(window.location.search);
    const hasStarsInUrl = urlParams.has('stars') && urlParams.has('starsOp');
    const hasLanguagesInUrl = urlParams.has('languages');
    const hasLicensesInUrl = urlParams.has('licenses');

    // For languages: use URL if present, otherwise use initial or empty array
    const [selectedLanguages, setSelectedLanguages] = useState<string[]>(
        hasLanguagesInUrl ? urlState.languages : (initialLanguages ?? urlState.languages)
    );

    // For licenses: use URL if present, otherwise use empty array
    const [selectedLicenses, setSelectedLicenses] = useState<string[]>(
        hasLicensesInUrl ? urlState.licenses : urlState.licenses
    );
    const [licensesOperator, setLicensesOperator] = useState<LicensesFilter['operator']>(
        hasLicensesInUrl ? urlState.licensesOperator : urlState.licensesOperator
    );

    // For stars filter: if URL has stars params, use them (even if null - means filter was explicitly removed)
    // Otherwise, use initialStarsFilter as default
    const [starsFilter, setStarsFilter] = useState<{ value: number; operator: StarsFilter['operator'] } | null>(
        hasStarsInUrl ? urlState.starsFilter : initialStarsFilter
    );

    // Track last URL to detect external changes
    const lastUrlRef = useRef(window.location.search);

    // Sync state from URL when it changes externally (browser back/forward)
    useEffect(() => {
        if (!syncFromUrl) return;

        const checkUrlChange = () => {
            const currentUrl = window.location.search;
            if (currentUrl !== lastUrlRef.current && !getIsUpdatingUrl()) {
                const newUrlState = readStateFromUrl();
                setSelectedLanguages(newUrlState.languages);
                setSelectedLicenses(newUrlState.licenses);
                setLicensesOperator(newUrlState.licensesOperator);
                setStarsFilter(newUrlState.starsFilter);
            }
            lastUrlRef.current = currentUrl;
        };

        // Update lastUrlRef when URL is updated by our code
        const unregisterUrlUpdate = onUrlUpdate(() => {
            lastUrlRef.current = window.location.search;
        });

        // Check on popstate (browser back/forward)
        window.addEventListener('popstate', checkUrlChange);

        // Also check periodically (in case URL changes in other ways)
        const interval = setInterval(checkUrlChange, 100);

        return () => {
            window.removeEventListener('popstate', checkUrlChange);
            clearInterval(interval);
            unregisterUrlUpdate();
        };
    }, [syncFromUrl]);

    const handleLanguageChange = useCallback((languages: string[]) => {
        setSelectedLanguages(languages);
    }, []);

    const handleLicenseChange = useCallback((licenses: string[]) => {
        setSelectedLicenses(licenses);
    }, []);

    const handleLicensesOperatorChange = useCallback((operator: LicensesFilter['operator']) => {
        setLicensesOperator(operator);
    }, []);

    const handleStarsValueChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        if (inputValue === '') {
            setStarsFilter(null);
            return;
        }
        const value = parseInt(inputValue, 10);
        if (starsFilter) {
            setStarsFilter({...starsFilter, value: isNaN(value) ? 0 : value});
        } else {
            setStarsFilter({value: isNaN(value) ? 0 : value, operator: 'GREATER'});
        }
    }, [starsFilter]);

    const handleStarsOperatorChange = useCallback((operator: StarsFilter['operator']) => {
        if (starsFilter) {
            setStarsFilter({...starsFilter, operator});
        } else {
            setStarsFilter({value: 0, operator});
        }
    }, [starsFilter]);

    const handleRemoveStarsFilter = useCallback(() => {
        setStarsFilter(null);
    }, []);

    const handleAddStarsFilter = useCallback(() => {
        setStarsFilter({value: 100, operator: 'GREATER'});
    }, []);

    const handleResetLanguages = useCallback(() => {
        setSelectedLanguages([]);
    }, []);

    const handleResetLicenses = useCallback(() => {
        setSelectedLicenses([]);
        setLicensesOperator('IN');
    }, []);

    const handleResetAll = useCallback(() => {
        setSelectedLanguages([]);
        setSelectedLicenses([]);
        setLicensesOperator('IN');
        setStarsFilter(null);
    }, []);

    return {
        selectedLanguages,
        selectedLicenses,
        licensesOperator,
        starsFilter,
        handleLanguageChange,
        handleLicenseChange,
        handleLicensesOperatorChange,
        handleStarsValueChange,
        handleStarsOperatorChange,
        handleRemoveStarsFilter,
        handleAddStarsFilter,
        handleResetLanguages,
        handleResetLicenses,
        handleResetAll,
    };
}
