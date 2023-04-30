import '@/styles/globals.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
config.autoAddCss = false;

const theme = createTheme({
  palette: {
    primary: {
      main: '#2B2E4A', // Coloca aquí el color principal que desees
    },
    secondary: {
      main: '#FFC107', // Coloca aquí el color secundario que desees
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
