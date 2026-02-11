import {FormControl, styled, TextField, Typography} from '@mui/material';

export const autocompleteStyles = {
  minWidth: 200,
};

export const FilterLabel = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(1),
}));

export const StarsFormControl = styled(FormControl)({
  minWidth: 180,
});

export const StarsTextField = styled(TextField)({
  minWidth: 120,
});
