import {Alert, Box, Container, Stack, styled, Typography} from '@mui/material';

export const PageContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4),
}));

export const PageHeader = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(4),
}));

export const ActionsSection = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(3),
}));

export const FiltersStack = styled(Stack)(({ theme }) => ({
  marginBottom: theme.spacing(3),
}));

export const ResultsCount = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

export const ErrorAlert = styled(Alert)(({ theme }) => ({
  marginBottom: theme.spacing(3),
}));

export const EmptyState = styled(Typography)(({ theme }) => ({
  textAlign: 'center',
  paddingTop: theme.spacing(8),
  paddingBottom: theme.spacing(8),
}));
