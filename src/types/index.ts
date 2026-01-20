export interface Issue {
  issueId: number;
  issueTitle: string;
  issueUrl: string;
  issueUpdated: string;
  issueCreated: string;
  repositoryTitle: string;
  repositoryUrl: string;
  repositoryStars: number;
  repositoryDescription: string | null;
  repositoryLanguage: string;
  repositoryOwnerAvatar?: string;
}

export interface IssuesResponse {
  issues: Issue[];
}

export interface LanguageFilter {
  values: string[];
  operator: 'IN' | 'NOT_IN';
}

export interface StarsFilter {
  value: number;
  operator: 'GREATER' | 'LESS';
}

export interface IssuesFilter {
  languages?: LanguageFilter;
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

// Runtime environment configuration (injected by entrypoint.sh in production)
declare global {
    interface Window {
        __ENV__?: {
            [key: string]: string;
        };
    }
}