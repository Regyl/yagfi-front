export const STARS_OPERATORS = [
    {value: 'GREATER' as const, label: 'Greater than (>)'},
    {value: 'LESS' as const, label: 'Less than (<)'},
] as const;

export const LICENSES_OPERATORS = [
    {value: 'IN' as const, label: 'Include'},
    {value: 'NOT_IN' as const, label: 'Exclude'},
] as const;