import {useMemo} from 'react';
import {IssuesRequest, StarsFilter} from '@/types';
import {PAGE_SIZE} from '@/shared/constants';

interface UseIssuesRequestParams {
    selectedLanguages: string[];
    selectedLicenses: string[];
    licensesOperator: 'IN' | 'NOT_IN';
    selectedIssueLanguages: string[];
    issueLanguagesOperator: 'IN' | 'NOT_IN';
    starsFilter: { value: number; operator: StarsFilter['operator'] } | null;
    sortOrders: { field: string; type: 'asc' | 'desc' }[];
}

export function useIssuesRequest({
                                     selectedLanguages,
                                     selectedLicenses,
                                     licensesOperator,
                                     selectedIssueLanguages,
                                     issueLanguagesOperator,
                                     starsFilter,
                                     sortOrders,
                                 }: UseIssuesRequestParams): Omit<IssuesRequest, 'offset'> {
    return useMemo((): Omit<IssuesRequest, 'offset'> => {
        const filter: IssuesRequest['filter'] = {};

        if (selectedLanguages.length > 0) {
            filter.languages = {
                values: selectedLanguages,
                operator: 'IN',
            };
        }

        if (selectedLicenses.length > 0) {
            filter.licenses = {
                values: selectedLicenses,
                operator: licensesOperator,
            };
        }

        if (selectedIssueLanguages.length > 0) {
            filter.issueLanguages = {
                values: selectedIssueLanguages,
                operator: issueLanguagesOperator,
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
    }, [selectedLanguages, selectedLicenses, licensesOperator, selectedIssueLanguages, issueLanguagesOperator, starsFilter, sortOrders]);
}
