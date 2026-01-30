import {IssuesRequest, IssuesResponse} from '../types';
import {API_BASE_URL} from '../shared/constants';

export async function fetchIssues(payload: IssuesRequest): Promise<IssuesResponse> {
  const response = await fetch(API_BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
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
  const response = await fetch(`${API_BASE_URL}/random`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
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
    const response = await fetch(`${API_BASE_URL}/languages`, {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
    });

    if (!response.ok) {
        throw new Error('Failed to fetch languages');
    }

    return response.json();
}
