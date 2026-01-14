export interface Repository {
  id: number;
  title: string;
  description: string;
  url: string;
  language: string;
  stars: number;
  sourceId: string;
  created: string;
}

export interface Issue {
  id: number;
  title: string;
  url: string;
  createdAt: string;
  updatedAt: string;
  created: string;
  repositoryId: number;
  sourceId: string;
  repository: Repository;
}

export interface IssuesResponse {
  content: Issue[];
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  pageable: {
    offset: number;
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    sort: any[];
    unpaged: boolean;
  };
  size: number;
  sort: any[];
  totalElements: number;
  totalPages: number;
}

export interface IssuesRequest {
  page: number;
  size: number;
  filter?: {
    language?: string;
  };
  order?: {
    field: 'stars' | 'createdAt' | 'updatedAt';
    type: 'asc' | 'desc';
  };
}
