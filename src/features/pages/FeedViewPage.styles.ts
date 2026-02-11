import type {Theme} from '@mui/material/styles';
import {Alert, Box, Card, Container, IconButton, Link, styled, Typography,} from '@mui/material';

export const PageContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4),
}));

export const LoadingContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: 400,
});

export const pageTitleStyles = (theme: Theme) => ({
  marginBottom: theme.spacing(4),
  fontWeight: 600,
});

export const SectionHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: theme.spacing(2),
}));

export const sectionTitleStyles = {
  fontWeight: 600,
};

export const ExpandButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.text.secondary,
}));

export const RepoCard = styled(Card, {
  shouldForwardProp: (prop) => prop !== 'isSelected',
})<{ isSelected?: boolean }>(({ theme, isSelected }) => ({
  border: `1px solid ${isSelected ? theme.palette.primary.main : theme.palette.divider}`,
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  '&:hover': {
    borderColor: theme.palette.primary.main,
    boxShadow: theme.shadows[1],
  },
}));

export const CardContentFlex = styled(Box)({
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  gap: 16,
});

export const RepoInfoBox = styled(Box)({
  flex: 1,
  minWidth: 0,
});

export const RepoLink = styled(Link)(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  gap: 4,
  color: theme.palette.primary.main,
  textDecoration: 'none',
  '&:hover': {
    textDecoration: 'underline',
  },
}));

export const repoNameStyles = {
  fontWeight: 600,
};

export const CountBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
  gap: 8,
});

export const countValueStyles = (theme: Theme) => ({
  fontWeight: 600,
  color: theme.palette.primary.main,
});

export const subsectionTitleStyles = (theme: Theme) => ({
  marginBottom: theme.spacing(2),
  fontWeight: 600,
});

export const ErrorAlert = styled(Alert)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

export const ResultsCount = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));
