import {useEffect, useState} from 'react';
import {fetchIssueLanguages} from '@/api/issuesApi';

export function useIssueLanguages() {
    const [issueLanguages, setIssueLanguages] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        let cancelled = false;

        const loadIssueLanguages = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await fetchIssueLanguages();

                if (!cancelled) {
                    setIssueLanguages(data.filter((lang) => lang != null && lang.trim() !== ''));
                }
            } catch (err) {
                if (!cancelled) {
                    setError(err instanceof Error ? err : new Error('Failed to load issue languages'));
                }
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        };

        loadIssueLanguages();

        return () => {
            cancelled = true;
        };
    }, []);

    return {issueLanguages, loading, error};
}
