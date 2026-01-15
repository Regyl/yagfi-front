import {useCallback, useState} from 'react';
import {fetchIssues} from '../../api/issuesApi';
import {IssuesRequest} from '../../types';
import {RANDOM_ISSUE_CONFIG} from '../../shared/constants';

export interface UseRandomIssueReturn {
    pickingRandom: boolean;
    pickRandom: (baseRequest: Omit<IssuesRequest, 'offset'>) => Promise<void>;
}

export function useRandomIssue(): UseRandomIssueReturn {
    const [pickingRandom, setPickingRandom] = useState(false);

    const pickRandom = useCallback(async (baseRequest: Omit<IssuesRequest, 'offset'>) => {
        setPickingRandom(true);
        try {
            const {maxAttempts, maxOffset} = RANDOM_ISSUE_CONFIG;

            // Try to get a random issue by requesting with random offset
            for (let attempt = 0; attempt < maxAttempts; attempt++) {
                const randomOffset = Math.floor(Math.random() * maxOffset);
                const request: IssuesRequest = {
                    ...baseRequest,
                    limit: 1,
                    offset: randomOffset,
                };

                const response = await fetchIssues(request);

                if (response.issues && response.issues.length > 0) {
                    const randomIssue = response.issues[0];
                    window.open(randomIssue.issueUrl, '_blank', 'noopener,noreferrer');
                    setPickingRandom(false);
                    return;
                }
            }

            // If all attempts failed, try with offset 0
            const request: IssuesRequest = {
                ...baseRequest,
                limit: 1,
                offset: 0,
            };

            const response = await fetchIssues(request);
            if (response.issues && response.issues.length > 0) {
                const randomIssue = response.issues[0];
                window.open(randomIssue.issueUrl, '_blank', 'noopener,noreferrer');
            } else {
                alert('No issues found with current filters. Try adjusting your filters.');
            }
        } catch (err) {
            console.error('Failed to pick random issue:', err);
            alert('Failed to pick random issue. Please try again.');
        } finally {
            setPickingRandom(false);
        }
    }, []);

    return {
        pickingRandom,
        pickRandom,
    };
}
