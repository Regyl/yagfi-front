import {FeedGenerateRequest, FeedGenerateResponse, IssuesRequest, IssuesResponse, SyncEvent} from '../types';
import {API_BASE_URL} from '../shared/constants';
import {getUtmSource} from '../shared/utils/urlParams';

/**
 * Gets request headers with optional utm_source
 */
function getRequestHeaders(): HeadersInit {
  const headers: HeadersInit = { 'Content-Type': 'application/json' };
  const utmSource = getUtmSource();
  if (utmSource) {
    headers['X-UTM-Source'] = utmSource;
  }
  return headers;
}

export async function fetchIssues(payload: IssuesRequest): Promise<IssuesResponse> {
  const response = await fetch(`${API_BASE_URL}/issues`, {
    method: 'POST',
    headers: getRequestHeaders(),
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error('Failed to fetch issues');
  }

  return response.json();
}

export async function fetchRandomIssue(
  payload: Omit<IssuesRequest, 'limit' | 'offset'>
): Promise<string> {
  const response = await fetch(`${API_BASE_URL}/issues/random`, {
    method: 'POST',
    headers: getRequestHeaders(),
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('No issues found with current filters');
    }
    throw new Error('Failed to fetch random issue');
  }

  return response.text();
}

export async function fetchLanguages(): Promise<string[]> {
    const response = await fetch(`${API_BASE_URL}/issues/languages`, {
        method: 'GET',
        headers: getRequestHeaders(),
    });

    if (!response.ok) {
        throw new Error('Failed to fetch languages');
    }

    return response.json();
}

export async function fetchSyncEvents(): Promise<SyncEvent[]> {
    const response = await fetch(`${API_BASE_URL}/events`, {
        method: 'GET',
        headers: getRequestHeaders(),
    });

    if (!response.ok) {
        throw new Error('Failed to fetch sync events');
    }

    return response.json();
}

export async function generateFeed(payload: FeedGenerateRequest): Promise<FeedGenerateResponse> {
    const response = await fetch(`${API_BASE_URL}/feed/generate`, {
        method: 'POST',
        headers: getRequestHeaders(),
        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        throw new Error('Failed to generate feed');
    }

    return response.json();
}

export async function fetchFeedUsers(): Promise<string[]> {
    const response = await fetch(`${API_BASE_URL}/feed/users`, {
        method: 'GET',
        headers: getRequestHeaders(),
    });

    if (!response.ok) {
        throw new Error('Failed to fetch feed users');
    }

    return response.json();
}

export async function fetchFeedRepositories(nickname: string): Promise<{sourceRepo: string; count: number}[]> {
    const response = await fetch(`${API_BASE_URL}/feed/repositories?nickname=${encodeURIComponent(nickname)}`, {
        method: 'GET',
        headers: getRequestHeaders(),
    });

    if (!response.ok) {
        throw new Error('Failed to fetch feed repositories');
    }

    return response.json();
}

export async function fetchFeedIssues(sourceRepo: string): Promise<IssuesResponse> {
    const response = await fetch(`${API_BASE_URL}/feed/issues?sourceRepo=${encodeURIComponent(sourceRepo)}`, {
        method: 'GET',
        headers: getRequestHeaders(),
    });

    if (!response.ok) {
        throw new Error('Failed to fetch feed issues');
    }

    const issues = await response.json();
    return {issues};
}
