import type {Theme} from '@mui/material/styles';
import {Alert, Avatar, Box, Button, Container, ListItemButton, Paper, styled, Typography,} from '@mui/material';

export const PageContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4),
}));

export const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  border: `1px solid ${theme.palette.divider}`,
}));

export const pageTitleStyles = (theme: Theme) => ({
  marginBottom: theme.spacing(3),
  fontWeight: 600,
});

export const PageSubtitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

export const InfoBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.divider}`,
  marginBottom: theme.spacing(4),
}));

export const InfoBoxAlt = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.default,
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.divider}`,
}));

export const sectionTitleStyles = (theme: Theme) => ({
  marginBottom: theme.spacing(1.5),
  fontWeight: 600,
});

export const IconRow = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: 12,
});

export const iconImageStyles = {
  width: 20,
  height: 20,
  objectFit: 'contain' as const,
};

export const AdornmentBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  paddingLeft: theme.spacing(1),
  paddingRight: theme.spacing(1),
}));

export const SubmitButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

export const UsersErrorAlert = styled(Alert)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

export const UserListItemButton = styled(ListItemButton)(({ theme }) => ({
  paddingLeft: 0,
  paddingRight: 0,
  paddingTop: theme.spacing(1.5),
  paddingBottom: theme.spacing(1.5),
}));

export const UserAvatar = styled(Avatar)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
}));
