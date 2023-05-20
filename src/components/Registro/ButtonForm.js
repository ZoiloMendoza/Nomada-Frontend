import { ThemeProvider } from '@emotion/react';
import Button from '@mui/material/Button';
import theme from './TemaConfig';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const ButtonForm = ({ onClick }) => (
  <ThemeProvider theme={theme}>
    <Button variant='bold' onClick={onClick} sx={{ fontFamily: 'Inter, sans-serif' }}>
      Crear cuenta
    </Button>
  </ThemeProvider>
);

export default ButtonForm;
