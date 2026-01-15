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
