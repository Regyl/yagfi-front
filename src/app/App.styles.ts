import {Box, styled} from '@mui/material';

export const AppLayout = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
});

export const AppContent = styled(Box)({
  display: 'flex',
  flex: 1,
  overflow: 'hidden',
});

export const Main = styled(Box)(({ theme }) => ({
  flex: 1,
  overflow: 'auto',
  [theme.breakpoints.down('sm')]: {
    marginLeft: 0,
    paddingBottom: 80,
  },
  [theme.breakpoints.up('sm')]: {
    marginLeft: 240,
    paddingBottom: 0,
  },
})) as typeof Box;
