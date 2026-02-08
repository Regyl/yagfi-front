import {getEnv} from "../utils/env";

export const PAGE_SIZE = 20;

export const API_BASE_URL = getEnv('REACT_APP_API_URL');

export const GITHUB_BACKEND_REPO_URL = 'https://github.com/Regyl/yagfi-back';
export const GITHUB_FRONTEND_REPO_URL = 'https://github.com/Regyl/yagfi-front';

export const CONTRIBUTING_URL = `${GITHUB_BACKEND_REPO_URL}/blob/master/docs/CONTRIBUTING.md#suggest-labels`;

export const DEFAULT_STARS_FILTER = {
    value: 10,
    operator: 'GREATER' as const,
};
