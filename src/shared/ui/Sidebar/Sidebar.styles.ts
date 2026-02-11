import {Box, List, ListItem, ListItemButton, ListItemIcon, Paper, styled,} from '@mui/material';

export const SidebarPaper = styled(Paper)(({ theme }) => ({
  position: 'fixed',
  top: 64,
  bottom: 'auto',
  left: 0,
  width: 240,
  height: 'calc(100vh - 64px)',
  borderRadius: 0,
  borderRight: `1px solid ${theme.palette.divider}`,
  borderTop: 'none',
  backgroundColor: theme.palette.background.default,
  zIndex: 1000,
  overflowY: 'auto',
  [theme.breakpoints.down('sm')]: {
    top: 'auto',
    bottom: 0,
    left: 0,
    width: '100%',
    height: 'auto',
    borderRight: 'none',
    borderTop: `1px solid ${theme.palette.divider}`,
    overflowY: 'visible',
  },
}));

export const SidebarContent = styled(Box)(({ theme }) => ({
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(1),
  [theme.breakpoints.up('sm')]: {
    paddingTop: theme.spacing(2),
    paddingBottom: 0,
  },
}));

export const SidebarList = styled(List)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  [theme.breakpoints.up('sm')]: {
    display: 'block',
  },
}));

export const SidebarListItem = styled(ListItem)(({ theme }) => ({
  width: 'auto',
  flex: 1,
  [theme.breakpoints.up('sm')]: {
    width: '100%',
    flex: 'none',
  },
}));

export const SidebarListItemButton = styled(ListItemButton)(({ theme }) => ({
  marginLeft: theme.spacing(0.5),
  marginRight: theme.spacing(0.5),
  borderRadius: theme.shape.borderRadius,
  flexDirection: 'column',
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(1),
  minHeight: 'auto',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    flexDirection: 'row',
    paddingTop: theme.spacing(1.5),
    paddingBottom: theme.spacing(1.5),
    minHeight: 48,
  },
  '&.Mui-selected': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
    '& .MuiListItemIcon-root': {
      color: theme.palette.primary.contrastText,
    },
  },
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

export const SidebarListItemIcon = styled(ListItemIcon, {
  shouldForwardProp: (prop) => prop !== 'isSelected',
})<{ isSelected?: boolean }>(({ theme, isSelected }) => ({
    color: isSelected ? theme.palette.primary.contrastText : theme.palette.text.secondary,
    minWidth: 'auto',
    justifyContent: 'center',
    marginBottom: theme.spacing(0.5),
    [theme.breakpoints.up('sm')]: {
      minWidth: 40,
      justifyContent: 'flex-start',
      marginBottom: 0,
    },
  })
);

export const ListItemTextContent = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 8,
  flexDirection: 'column',
  [theme.breakpoints.up('sm')]: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
}));
