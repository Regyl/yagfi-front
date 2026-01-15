import {useCallback, useState} from 'react';
import {Order} from '../../types';
import {DEFAULT_SORT_FIELD} from '../../shared/constants';

export interface UseSortingReturn {
    sortOrders: Order[];
    handleAddSortField: () => void;
    handleRemoveSortField: (index: number) => void;
    handleSortFieldChange: (index: number, field: string) => void;
    handleSortTypeChange: (index: number, type: 'asc' | 'desc') => void;
}

export function useSorting(
    initialSortOrders: Order[] = [{field: DEFAULT_SORT_FIELD, type: 'desc'}]
): UseSortingReturn {
    const [sortOrders, setSortOrders] = useState<Order[]>(initialSortOrders);

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
