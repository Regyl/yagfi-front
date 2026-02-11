import {Stack, styled, Typography} from '@mui/material';

export const SortRow = styled(Stack)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

export const SortHint = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(1),
  display: 'block',
}));
