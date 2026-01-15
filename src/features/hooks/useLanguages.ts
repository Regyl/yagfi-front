import {useEffect, useState} from 'react';
import {fetchLanguages} from '../../api/issuesApi';

export function useLanguages() {
    const [languages, setLanguages] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        let cancelled = false;

        const loadLanguages = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await fetchLanguages();

                if (!cancelled) {
                    // Filter out null, undefined, and empty strings
                    setLanguages(data.filter((lang) => lang != null && typeof lang === 'string' && lang.trim() !== ''));
                }
            } catch (err) {
                if (!cancelled) {
                    setError(err instanceof Error ? err : new Error('Failed to load languages'));
                }
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        };

        loadLanguages();

        return () => {
            cancelled = true;
        };
    }, []);

    return {languages, loading, error};
}
