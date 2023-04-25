import { ThemeProvider } from '@emotion/react';
import Button from '@mui/material/Button';
import theme from './TemaConfig';

const ButtonForm = () => {
  const customColor = '#6C6D7F';

  return (
    <ThemeProvider theme={theme}>
      <Button
        variant='contained'
        style={{
          backgroundColor: customColor,
          borderRadius: '10px',
          padding: '10px 20px',
          textTransform: 'none',
          alignItems: 'center',
        }}
      >
        Crear cuenta
      </Button>
    </ThemeProvider>
  );
};

export default ButtonForm;
