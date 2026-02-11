import {Box, Chip, FormControl, IconButton, styled} from '@mui/material';

export const SortFieldContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  maxWidth: 215,
}));

export const OrderChip = styled(Chip)({
  minWidth: 32,
  fontWeight: 600,
  maxWidth: 32,
});

export const FieldFormControl = styled(FormControl)({
  minWidth: 180,
  flex: 1,
  maxWidth: 180,
});

export const TypeFormControl = styled(FormControl)({
  minWidth: 180,
  maxWidth: 180,
});

export const RemoveButton = styled(IconButton)(({ theme }) => ({
  marginLeft: theme.spacing(1),
}));
