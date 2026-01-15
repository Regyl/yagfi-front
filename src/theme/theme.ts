import {createTheme} from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
        main: '#9EFF00', // Lime green accent (App Wish style)
        light: '#BFFF00',
        dark: '#7ECC00',
        contrastText: '#000000', // Black text on lime green for better contrast
    },
    secondary: {
        main: '#9EFF00', // Use lime green for secondary as well
        light: '#BFFF00',
        dark: '#7ECC00',
    },
    background: {
        default: '#0a0a0a', // Very dark background (App Wish style)
        paper: '#1a1a1a', // Slightly lighter for cards
    },
    text: {
        primary: '#ffffff', // White text
        secondary: '#b0b0b0', // Light grey for secondary text
    },
      divider: '#2a2a2a', // Dark divider
  },
  typography: {
    fontFamily: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Ubuntu, sans-serif',
    h1: {
      fontSize: '2rem',
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h3: {
      fontSize: '1.25rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 12px 24px rgba(0, 0, 0, 0.3)',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
          borderRadius: 8,
            '&.MuiButton-contained': {
                '&.MuiButton-colorPrimary': {
                    color: '#000000',
                    '&:hover': {
                        backgroundColor: '#BFFF00',
                    },
                },
            },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          fontWeight: 500,
            '&.MuiChip-colorPrimary': {
                backgroundColor: '#9EFF00',
                color: '#000000',
                '&:hover': {
                    backgroundColor: '#BFFF00',
                },
            },
            '&.MuiChip-colorSecondary': {
                backgroundColor: '#9EFF00',
                color: '#000000',
                '&:hover': {
                    backgroundColor: '#BFFF00',
                },
            },
        },
      },
    },
    MuiPagination: {
      styleOverrides: {
        root: {
          '& .MuiPaginationItem-root': {
              color: '#b0b0b0',
            '&.Mui-selected': {
                backgroundColor: '#9EFF00',
                color: '#000000',
              '&:hover': {
                  backgroundColor: '#BFFF00',
              },
            },
            '&:hover': {
                backgroundColor: 'rgba(158, 255, 0, 0.1)',
            },
          },
        },
      },
    },
      MuiSelect: {
          styleOverrides: {
              root: {
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#9EFF00',
                  },
              },
          },
      },
      MuiOutlinedInput: {
          styleOverrides: {
              root: {
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#9EFF00',
                  },
              },
          },
      },
      MuiTextField: {
          styleOverrides: {
              root: {
                  '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#9EFF00',
                  },
              },
          },
      },
  },
});
