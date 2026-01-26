import {Theme} from '@mui/material/styles';

/**
 * Sets CSS variables from Material-UI theme
 * This allows CSS modules to use theme values
 */
export function setThemeVariables(theme: Theme): void {
    const root = document.documentElement;

    // Palette colors
    root.style.setProperty('--mui-palette-primary-main', theme.palette.primary.main);
    root.style.setProperty('--mui-palette-primary-light', theme.palette.primary.light);
    root.style.setProperty('--mui-palette-primary-dark', theme.palette.primary.dark);
    root.style.setProperty('--mui-palette-secondary-main', theme.palette.secondary.main);
    root.style.setProperty('--mui-palette-background-default', theme.palette.background.default);
    root.style.setProperty('--mui-palette-background-paper', theme.palette.background.paper);
    root.style.setProperty('--mui-palette-text-primary', theme.palette.text.primary);
    root.style.setProperty('--mui-palette-text-secondary', theme.palette.text.secondary);
    root.style.setProperty('--mui-palette-divider', theme.palette.divider);
}
