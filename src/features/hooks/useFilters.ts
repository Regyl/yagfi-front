import {useCallback, useState} from 'react';
import {SelectChangeEvent} from '@mui/material';
import {StarsFilter} from '../../types';
import {DEFAULT_STARS_FILTER} from '../../shared/constants';

export interface UseFiltersReturn {
    selectedLanguages: string[];
    starsFilter: { value: number; operator: StarsFilter['operator'] } | null;
    handleLanguageChange: (event: SelectChangeEvent<string[]>) => void;
    handleStarsValueChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleStarsOperatorChange: (event: SelectChangeEvent<StarsFilter['operator']>) => void;
    handleRemoveStarsFilter: () => void;
    handleAddStarsFilter: () => void;
}

export function useFilters(
    initialStarsFilter: { value: number; operator: StarsFilter['operator'] } | null = DEFAULT_STARS_FILTER
): UseFiltersReturn {
    const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
    const [starsFilter, setStarsFilter] = useState<{ value: number; operator: StarsFilter['operator'] } | null>(
        initialStarsFilter
    );

    const handleLanguageChange = useCallback((event: SelectChangeEvent<string[]>) => {
        const value = event.target.value;
        setSelectedLanguages(typeof value === 'string' ? value.split(',') : value);
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

    const handleStarsOperatorChange = useCallback((event: SelectChangeEvent<StarsFilter['operator']>) => {
        const operator = event.target.value as StarsFilter['operator'];
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

    return {
        selectedLanguages,
        starsFilter,
        handleLanguageChange,
        handleStarsValueChange,
        handleStarsOperatorChange,
        handleRemoveStarsFilter,
        handleAddStarsFilter,
    };
}
