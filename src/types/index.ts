export interface Issue {
  issueId: number;
  issueTitle: string;
  issueUrl: string;
  issueUpdated: string;
  issueCreated: string;
  issueLabels: string[];
  issueLanguage: string;
  repositoryTitle: string;
  repositoryUrl: string;
  repositoryStars: number;
  repositoryDescription: string | null;
  repositoryLanguage: string;
  repositoryLicense: string | null;
  repositoryOwnerAvatar?: string;
}

export interface IssuesResponse {
  issues: Issue[];
}

export interface LanguageFilter {
  values: string[];
  operator: 'IN' | 'NOT_IN';
}

export interface LicensesFilter {
  values: string[];
  operator: 'IN' | 'NOT_IN';
}

export interface StarsFilter {
  value: number;
  operator: 'GREATER' | 'LESS';
}

export interface IssuesFilter {
  languages?: LanguageFilter;
  licenses?: LicensesFilter;
  stars?: StarsFilter;
}

export interface Order {
  field: string;
  type: 'asc' | 'desc';
}

export interface IssuesRequest {
  limit: number;
  offset: number;
  filter?: IssuesFilter;
  orders?: Order[];
}

export interface SyncEvent {
    source: string;
    lastUpdateDttm: string;
}

export interface FeedGenerateRequest {
    nickname: string;
    email: string;
}

export interface FeedGenerateResponse {
    id: number;
    nickname: string;
    email: string;
    status: string;
    created: string;
}

export interface FeedUser {
    id: number;
    nickname: string;
    email: string;
    status: string;
    created: string;
}

// Runtime environment configuration (injected by entrypoint.sh in production)
declare global {
    interface Window {
        __ENV__?: {
            [key: string]: string;
        };
    }
}