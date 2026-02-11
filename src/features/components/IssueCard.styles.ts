import type {Theme} from '@mui/material/styles';
import {Card, CardContent, Stack, styled, Typography} from '@mui/material';

export const IssueCardLink = styled(Card)({
  textDecoration: 'none',
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  width: '100%',
  minHeight: 200,
  cursor: 'pointer',
  overflow: 'hidden',
}) as typeof Card;

export const IssueCardContent = styled(CardContent)({
  padding: 20,
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  height: '100%',
  minWidth: 0,
  overflow: 'hidden',
});

export const IssueHeader = styled(Stack)({
  marginBottom: 8,
  minWidth: 0,
});

export const avatarImgStyles = (theme: Theme) => ({
  width: 32,
  height: 32,
  flexShrink: 0,
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.divider}`,
  objectFit: 'cover' as const,
});

export const IssueTitle = styled(Typography)(({ theme }) => ({
  fontSize: '1rem',
  fontWeight: 600,
  color: theme.palette.text.primary,
  lineHeight: 1.4,
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  flex: 1,
  minWidth: 0,
}));

export const RepoTitle = styled(Typography)(({ theme }) => ({
  marginBottom: 12,
  color: theme.palette.text.secondary,
  fontSize: '0.875rem',
  display: '-webkit-box',
  WebkitLineClamp: 1,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
}));

export const RepoDescription = styled(Typography)(({ theme }) => ({
  marginBottom: 12,
  color: theme.palette.text.secondary,
  fontSize: '0.8125rem',
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
}));

export const LabelsStack = styled(Stack)({
  marginBottom: 12,
  gap: 4,
});

export const FooterStack = styled(Stack)({
  marginTop: 'auto',
  paddingTop: 8,
  gap: 8,
});

export const DateText = styled(Typography)(({ theme }) => ({
  marginLeft: 'auto',
  color: theme.palette.text.secondary,
  fontSize: '0.75rem',
}));
