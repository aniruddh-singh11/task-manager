import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#2563eb', // Modern, less saturated blue
      light: '#60a5fa',
      dark: '#1e40af',
      contrastText: '#fff',
    },
    secondary: {
      main: '#0ea5e9',
      light: '#38bdf8',
      dark: '#0369a1',
      contrastText: '#fff',
    },
    background: {
      default: '#181a20',
      paper: '#23243a',
    },
    text: {
      primary: '#f3f6fa',
      secondary: '#b0b8d1',
    },
    divider: '#23243a',
    success: {
      main: '#22c55e',
    },
    error: {
      main: '#ef4444',
      contrastText: '#fff',
    },
    warning: {
      main: '#f59e42',
    },
    info: {
      main: '#3b82f6',
    },
  },
  shape: {
    borderRadius: 8,
  },
  typography: {
    fontFamily: 'Inter, Roboto, Arial, sans-serif',
    h4: {
      fontWeight: 800,
      letterSpacing: 0.5,
    },
    h5: {
      fontWeight: 700,
    },
    button: {
      textTransform: 'none',
      fontWeight: 700,
      letterSpacing: 0.5,
      fontSize: '1.05rem',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 700,
          fontSize: '1.05rem',
          padding: '10px 28px',
          boxShadow: 'none',
          transition: 'background 0.18s cubic-bezier(.4,0,.2,1)',
        },
        containedPrimary: {
          background: '#2563eb',
          color: '#fff',
          '&:hover': {
            background: '#1e40af',
          },
          '&:active': {
            background: '#1e40af',
          },
        },
        outlinedPrimary: {
          borderColor: '#2563eb',
          color: '#fff',
          background: 'transparent',
          '&:hover': {
            borderColor: '#60a5fa',
            background: 'rgba(37,99,235,0.08)',
            color: '#2563eb', // Make text blue on hover for contrast
          },
        },
        containedSecondary: {
          background: '#0ea5e9',
          color: '#fff',
        },
        outlinedSecondary: {
          borderColor: '#0ea5e9',
          color: '#fff',
          background: 'transparent',
          '&:hover': {
            borderColor: '#38bdf8',
            background: 'rgba(14,165,233,0.08)',
            color: '#0ea5e9', // Make text blue on hover for contrast
          },
        },
        containedError: {
          background: '#ef4444',
          color: '#fff',
          '&:hover': {
            background: '#b91c1c',
            color: '#fff',
          },
          '&:active': {
            background: '#991b1b',
            color: '#fff',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 16px 0 rgba(99,102,241,0.10)',
          background: '#23243a',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          background: '#23243a',
          borderRadius: 8,
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          color: '#f3f6fa',
        },
        input: {
          background: 'transparent',
        },
      },
    },
  },
});

export default theme;
