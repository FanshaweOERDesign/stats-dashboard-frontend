import { createTheme } from '@mui/material/styles';
import '@fontsource/montserrat';

const lightTheme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#b3272d',
    },
    secondary: {
      main: '#ffffff',
    },
    error: {
      main: '#366df4',
    },
    info: {
      main: '#f7f553',
    },
  },
  typography: {
    fontFamily: 'Montserrat, Arial, sans-serif',
    fontWeightRegular: 600
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#b3272d',
    },
    secondary: {
      main: '#ffffff',
    },
    error: {
      main: '#366df4',
    },
    info: {
      main: '#f7f553',
    },
    background: {
      default: '#121212', 
      paper: '#1d1d1d', 
    },
  },
  typography: {
    fontFamily: 'Montserrat, Arial, sans-serif',
    fontWeightRegular: 600,
  },
});

export { lightTheme, darkTheme};
