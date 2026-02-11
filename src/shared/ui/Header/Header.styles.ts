import {AppBar, Box, IconButton, styled, Toolbar, Typography,} from '@mui/material';

export const StyledAppBar = styled(AppBar)(({ theme }) => ({
  top: 0,
  zIndex: 1100,
  backgroundColor: theme.palette.background.default,
  backdropFilter: 'blur(8px)',
  borderBottom: `1px solid ${theme.palette.divider}`,
  boxShadow: 'none',
}));

export const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  justifyContent: 'space-between',
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
  },
}));

export const logoStyles = (theme: { palette: { primary: { main: string } } }) => ({
  fontWeight: 700,
  color: theme.palette.primary.main,
  fontSize: '1.25rem',
});

export const HeaderActions = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: 16,
});

export const SyncInfo = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: 4,
  color: theme.palette.text.secondary,
  fontSize: '0.75rem',
}));

export const SyncText = styled(Typography)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
  [theme.breakpoints.up('md')]: {
    display: 'block',
  },
}));

export const ThemeButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.text.secondary,
  '&:hover': {
    color: theme.palette.primary.main,
  },
}));

export const GithubButton = styled('button')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: 4,
  color: theme.palette.text.secondary,
  textDecoration: 'none',
  border: 'none',
  background: 'none',
  cursor: 'pointer',
  padding: 0,
  transition: 'color 0.2s ease',
  fontSize: '0.875rem',
  font: 'inherit',
  '&:hover': {
    color: theme.palette.primary.main,
  },
}));

export const MenuItemContent = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
});

export const SyncEventItem = styled(Box)({
  marginBottom: 4,
});
