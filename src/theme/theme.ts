import { createTheme } from '@mui/material/styles';


const commonSettings = {
  typography: {
    fontFamily: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Ubuntu, sans-serif',
    h1: { fontSize: '2rem', fontWeight: 700, lineHeight: 1.2 },
    h2: { fontSize: '1.5rem', fontWeight: 600, lineHeight: 1.3 },
    h3: { fontSize: '1.25rem', fontWeight: 600, lineHeight: 1.4 },
    body1: { fontSize: '1rem', lineHeight: 1.6 },
    body2: { fontSize: '0.875rem', lineHeight: 1.5 },
  },
  shape: {
    borderRadius: 12,
  },
};


export const darkTheme = createTheme({
  ...commonSettings,
  palette: {
    mode: 'dark',
    primary: {
        main: '#9EFF00',
        light: '#BFFF00',
        dark: '#7ECC00',
        contrastText: '#000000',
    },
    secondary: {
        main: '#9EFF00',
        light: '#BFFF00',
        dark: '#7ECC00',
    },
    background: {
        default: '#060e08',
        paper: '#1a1a1a',
    },
    text: {
        primary: '#ffffff',
        secondary: '#b0b0b0',
    },
      divider: '#2a2a2a',
  },
  components: {
    
    MuiCard: { styleOverrides: { root: { backgroundImage: 'none' } } },
    MuiButton: { styleOverrides: { root: { textTransform: 'none' } } },
  }
});


export const lightTheme = createTheme({
  ...commonSettings,
  palette: {
    mode: 'light',
    primary: {
        main: '#9EFF00',
        contrastText: '#000000',
    },
    background: {
        default: '#f4f7f5', // Πολύ ανοιχτό γκρι-πράσινο για να ταιριάζει με το Lime
        paper: '#ffffff',
    },
    text: {
        primary: '#060e08',
        secondary: '#444444',
    },
    divider: '#e0e0e0',
  },
  components: darkTheme.components, 
});


export const theme = darkTheme;