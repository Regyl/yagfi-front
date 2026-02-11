import {Order, StarsFilter} from '@/types';
import {DEFAULT_SORT_FIELD} from '../constants';

/**
 * Serializes and deserializes filter and sorting state to/from URL search params
 */

// Languages: comma-separated list
export function serializeLanguages(languages: string[]): string | null {
    return languages.length > 0 ? languages.join(',') : null;
}

export function deserializeLanguages(param: string | null): string[] {
    if (!param) return [];
    return param.split(',').filter(Boolean);
}

// Stars filter: value:operator format (e.g., "100:GREATER")
export function serializeStarsFilter(
    filter: { value: number; operator: StarsFilter['operator'] } | null
): { stars: string | null; starsOp: string | null } {
    if (!filter) {
        return {stars: null, starsOp: null};
    }
    return {
        stars: filter.value.toString(),
        starsOp: filter.operator,
    };
}

export function deserializeStarsFilter(
    stars: string | null,
    starsOp: string | null
): { value: number; operator: StarsFilter['operator'] } | null {
    if (!stars || !starsOp) return null;
    const value = parseInt(stars, 10);
    if (isNaN(value)) return null;
    if (starsOp !== 'GREATER' && starsOp !== 'LESS') return null;
    return {value, operator: starsOp};
}

// Sort orders: comma-separated list of field:type (e.g., "field1:asc,field2:desc")
export function serializeSortOrders(orders: Order[]): string | null {
    if (orders.length === 0) return null;
    return orders.map((o) => `${o.field}:${o.type}`).join(',');
}

export function deserializeSortOrders(param: string | null): Order[] {
    if (!param) return [{field: DEFAULT_SORT_FIELD, type: 'desc'}];
    const orders: Order[] = [];
    const parts = param.split(',');
    for (const part of parts) {
        const [field, type] = part.split(':');
        if (field && (type === 'asc' || type === 'desc')) {
            orders.push({field, type});
        }
    }
    return orders.length > 0 ? orders : [{field: DEFAULT_SORT_FIELD, type: 'desc'}];
}

/**
 * Reads utm_source from URL search params
 */
export function getUtmSource(): string | null {
    const params = new URLSearchParams(window.location.search);
    return params.get('utm_source');
}

/**
 * Reads all filter and sorting state from URL search params
 */
export function readStateFromUrl(): {
    languages: string[];
    starsFilter: { value: number; operator: StarsFilter['operator'] } | null;
    sortOrders: Order[];
} {
    const params = new URLSearchParams(window.location.search);

    return {
        languages: deserializeLanguages(params.get('languages')),
        starsFilter: deserializeStarsFilter(params.get('stars'), params.get('starsOp')),
        sortOrders: deserializeSortOrders(params.get('sort')),
    };
}

// Global flag to track if we're updating URL (to avoid circular updates)
let isUpdatingUrl = false;
// Callbacks to notify when URL is updated (for updating lastUrlRef in hooks)
const urlUpdateCallbacks: Set<() => void> = new Set();

/**
 * Updates URL search params with filter and sorting state
 */
export function updateUrlParams(
    languages: string[],
    starsFilter: { value: number; operator: StarsFilter['operator'] } | null,
    sortOrders: Order[]
): void {
    isUpdatingUrl = true;

    const params = new URLSearchParams(window.location.search);

    // Update languages
    const languagesParam = serializeLanguages(languages);
    if (languagesParam) {
        params.set('languages', languagesParam);
    } else {
        params.delete('languages');
    }

    // Update stars filter
    const {stars, starsOp} = serializeStarsFilter(starsFilter);
    if (stars && starsOp) {
        params.set('stars', stars);
        params.set('starsOp', starsOp);
    } else {
        params.delete('stars');
        params.delete('starsOp');
    }

    // Update sort orders
    const sortParam = serializeSortOrders(sortOrders);
    if (sortParam) {
        params.set('sort', sortParam);
    } else {
        params.delete('sort');
    }

    // Preserve utm_source if it exists
    const existingUtmSource = params.get('utm_source');
    if (existingUtmSource) {
        params.set('utm_source', existingUtmSource);
    }

    // Update URL without page reload
    const newUrl = `${window.location.pathname}${params.toString() ? `?${params.toString()}` : ''}`;
    window.history.pushState({}, '', newUrl);

    // Notify callbacks that URL was updated
    urlUpdateCallbacks.forEach(callback => callback());

    // Reset flag after a short delay to allow state updates to complete
    setTimeout(() => {
        isUpdatingUrl = false;
    }, 50);
}

/**
 * Registers a callback to be called when URL is updated
 */
export function onUrlUpdate(callback: () => void): () => void {
    urlUpdateCallbacks.add(callback);
    return () => {
        urlUpdateCallbacks.delete(callback);
    };
}

/**
 * Checks if URL is currently being updated by our code
 */
export function getIsUpdatingUrl(): boolean {
    return isUpdatingUrl;
}
