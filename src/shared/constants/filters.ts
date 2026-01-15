import {StarsFilter} from '../../types';

export const STARS_OPERATORS = [
    {value: 'GREATER' as const, label: 'Greater than (>)'},
    {value: 'LESS' as const, label: 'Less than (<)'},
] as const;

export type StarsOperator = StarsFilter['operator'];
