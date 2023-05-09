import { StylesProvider, createGenerateClassName } from '@mui/styles';

import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
config.autoAddCss = false;
import '@/styles/globals.css';

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

const generateClassName = createGenerateClassName({
  productionPrefix: 'c',
});

export default function App({ Component, pageProps }) {
  return (
    <StylesProvider generateClassName={generateClassName}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </StylesProvider>
  );
}
