import {useEffect, useState} from 'react';
import {fetchSyncEvents} from '../../api/issuesApi';
import {SyncEvent} from '../../types';

export interface UseSyncStatusReturn {
    syncEvents: SyncEvent[];
    loading: boolean;
    error: Error | null;
    refresh: () => Promise<void>;
}

export function useSyncStatus(): UseSyncStatusReturn {
    const [syncEvents, setSyncEvents] = useState<SyncEvent[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const loadSyncEvents = async () => {
        try {
            setLoading(true);
            setError(null);
            const events = await fetchSyncEvents();
            setSyncEvents(events);
        } catch (err) {
            const error = err instanceof Error ? err : new Error('Failed to load sync status');
            setError(error);
            console.error('Failed to fetch sync events:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadSyncEvents();
        // Refresh every 5 minutes
        const interval = setInterval(loadSyncEvents, 5 * 60 * 1000);
        return () => clearInterval(interval);
    }, []);

    return {
        syncEvents,
        loading,
        error,
        refresh: loadSyncEvents,
    };
}
