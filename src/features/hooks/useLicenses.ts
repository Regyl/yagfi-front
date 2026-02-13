import {useEffect, useState} from 'react';
import {fetchLicenses} from '@/api/issuesApi';

export function useLicenses() {
    const [licenses, setLicenses] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        let cancelled = false;

        const loadLicenses = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await fetchLicenses();

                if (!cancelled) {
                    setLicenses(data.filter((lic) => lic != null && lic.trim() !== ''));
                }
            } catch (err) {
                if (!cancelled) {
                    setError(err instanceof Error ? err : new Error('Failed to load licenses'));
                }
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        };

        loadLicenses();

        return () => {
            cancelled = true;
        };
    }, []);

    return {licenses, loading, error};
}
