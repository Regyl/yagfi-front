export const PAGE_SIZE = 20;

// API URL can be configured via environment variable REACT_APP_API_URL
export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api/issues';

export const RANDOM_ISSUE_CONFIG = {
    maxAttempts: 5,
    maxOffset: 100,
} as const;

export const GITHUB_REPO_URL = 'https://github.com/Regyl/yagfi-back';

export const CONTRIBUTING_URL = `${GITHUB_REPO_URL}/blob/master/docs/CONTRIBUTING.md#suggest-labels`;

export const DEFAULT_STARS_FILTER = {
    value: 10,
    operator: 'GREATER' as const,
};
