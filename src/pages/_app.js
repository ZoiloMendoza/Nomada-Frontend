import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
config.autoAddCss = false;
//import '@/styles/globals.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#E91E63', // Coloca aquí el color principal que desees
    },
    secondary: {
      main: '#2B2E4A', // Coloca aquí el color secundario que desees
    },
  },
});

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
