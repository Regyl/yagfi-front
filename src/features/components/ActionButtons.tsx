import React from 'react';
import {Button, CircularProgress, Stack} from '@mui/material';
import {Label as LabelIcon, Shuffle as ShuffleIcon} from '@mui/icons-material';
import {CONTRIBUTING_URL} from '../../shared/constants';

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
                sx={{minWidth: 150}}
            >
                Suggest a Label
            </Button>
            <Button
                variant="contained"
                color="primary"
                startIcon={pickingRandom ? <CircularProgress size={16} sx={{color: 'inherit'}}/> : <ShuffleIcon/>}
                onClick={onPickRandom}
                disabled={pickingRandom}
                sx={{minWidth: 150}}
            >
                {pickingRandom ? 'Picking...' : 'Pick Random'}
            </Button>
        </Stack>
    );
}
