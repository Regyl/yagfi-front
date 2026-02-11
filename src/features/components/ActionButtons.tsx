import React from 'react';
import {Button, Stack} from '@mui/material';
import {Label as LabelIcon, Shuffle as ShuffleIcon} from '@mui/icons-material';
import {CONTRIBUTING_URL} from '../../shared/constants';
import {actionButtonStyles, StyledCircularProgress} from './ActionButtons.styles';

interface ActionButtonsProps {
    pickingRandom: boolean;
    onPickRandom: () => void;
}

export function ActionButtons({pickingRandom, onPickRandom}: ActionButtonsProps) {
    return (
        <Stack direction="row" justifyContent="center" alignItems="center" spacing={2}>
            <Button
                variant="contained"
                color="primary"
                startIcon={<LabelIcon/>}
                href={CONTRIBUTING_URL}
                target="_blank"
                rel="noopener noreferrer"
                sx={actionButtonStyles}
            >
                Suggest a Label
            </Button>
            <Button
                variant="contained"
                color="primary"
                startIcon={pickingRandom ? <StyledCircularProgress size={16}/> : <ShuffleIcon/>}
                onClick={onPickRandom}
                disabled={pickingRandom}
                sx={actionButtonStyles}
            >
                {pickingRandom ? 'Picking...' : 'Pick Random'}
            </Button>
        </Stack>
    );
}
