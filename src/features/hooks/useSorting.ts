import {useCallback, useEffect, useRef, useState} from 'react';
import {Order} from '@/types';
import {DEFAULT_SORT_FIELD} from '@/shared/constants';
import {getIsUpdatingUrl, onUrlUpdate, readStateFromUrl} from '@/shared/utils/urlParams';

export interface UseSortingReturn {
    sortOrders: Order[];
    handleAddSortField: () => void;
    handleRemoveSortField: (index: number) => void;
    handleSortFieldChange: (index: number, field: string) => void;
    handleSortTypeChange: (index: number, type: 'asc' | 'desc') => void;
}

interface UseSortingParams {
    initialSortOrders?: Order[];
    syncFromUrl?: boolean; // If true, sync state from URL changes (e.g., browser back/forward)
}

export function useSorting({
                               initialSortOrders,
                               syncFromUrl = true,
                           }: UseSortingParams = {}): UseSortingReturn {
    // Initialize from URL or provided defaults
    const urlState = readStateFromUrl();
    const [sortOrders, setSortOrders] = useState<Order[]>(
        initialSortOrders ?? urlState.sortOrders
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
                setSortOrders(newUrlState.sortOrders);
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

    const handleAddSortField = useCallback(() => {
        setSortOrders((prev) => [...prev, {field: DEFAULT_SORT_FIELD, type: 'desc'}]);
    }, []);

    const handleRemoveSortField = useCallback((index: number) => {
        setSortOrders((prev) => {
            if (prev.length > 1) {
                return prev.filter((_, i) => i !== index);
            }
            return prev;
        });
    }, []);

    const handleSortFieldChange = useCallback((index: number, field: string) => {
        setSortOrders((prev) =>
            prev.map((order, i) => (i === index ? {...order, field} : order))
        );
    }, []);

    const handleSortTypeChange = useCallback((index: number, type: 'asc' | 'desc') => {
        setSortOrders((prev) =>
            prev.map((order, i) => (i === index ? {...order, type} : order))
        );
    }, []);

    return {
        sortOrders,
        handleAddSortField,
        handleRemoveSortField,
        handleSortFieldChange,
        handleSortTypeChange,
    };
}
