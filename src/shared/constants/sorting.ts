export const DEFAULT_SORT_FIELD = 'ei.created_at';

export const SORT_FIELDS = [
    {value: 'er.stars', label: 'Stars'},
    {value: 'ei.created_at', label: 'Issue created'},
    {value: 'ei.updated_at', label: 'Issue updated'},
    {value: 'er.created_at', label: 'Repository created'},
    {value: 'er.updated_at', label: 'Repository updated'},
] as const;

export const SORT_TYPES = [
    {value: 'desc' as const, label: 'Descending'},
    {value: 'asc' as const, label: 'Ascending'},
] as const;
