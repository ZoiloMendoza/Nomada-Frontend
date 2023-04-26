import { Box } from '@mui/material';
import FormLogin from './FormLogin';
import CheckboxLogin from './CheckboxLogin';
import ButtonLogin from './ButtonLogin';

const BoxLogin = () => {
  const customColor = '#2B2E4A';
  const customColor2 = '#FFFFFF';
  const customSyle = 'Inter';

  return (
    <div>
      <Box color={customColor2} bgcolor={customColor} mr={2} p={10} fontStyle={customSyle} href=''>
        Nomadapp
      </Box>
      <Box>
        <FormLogin />
        <ButtonLogin />
        <CheckboxLogin />
        <h3 href=''> ¿Aún no tienes cuenta? Crea una usando tu correo AQUÍ </h3>
      </Box>
    </div>
  );
};

export default BoxLogin;
