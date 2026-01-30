import {useCallback, useState} from 'react';
import {fetchRandomIssue} from '../../api/issuesApi';
import {IssuesRequest} from '../../types';

export interface UseRandomIssueReturn {
    pickingRandom: boolean;
    pickRandom: (baseRequest: Omit<IssuesRequest, 'offset'>) => Promise<void>;
}

export function useRandomIssue(): UseRandomIssueReturn {
    const [pickingRandom, setPickingRandom] = useState(false);

    const pickRandom = useCallback(async (baseRequest: Omit<IssuesRequest, 'offset'>) => {
        setPickingRandom(true);
        try {
            // Prepare request payload without limit and offset
            const requestPayload: Omit<IssuesRequest, 'limit' | 'offset'> = {
                filter: baseRequest.filter,
                orders: baseRequest.orders,
            };

            const issueUrl = await fetchRandomIssue(requestPayload);
            window.open(issueUrl, '_blank', 'noopener,noreferrer');
        } catch (err) {
            console.error('Failed to pick random issue:', err);
            const errorMessage = err instanceof Error 
                ? err.message 
                : 'Failed to pick random issue. Please try again.';
            alert(errorMessage);
        } finally {
            setPickingRandom(false);
        }
    }, []);

    return {
        pickingRandom,
        pickRandom,
    };
}
