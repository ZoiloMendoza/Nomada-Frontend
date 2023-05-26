import { Box } from '@mui/material';
//import FormLogin from './FormLogin';

const BoxLogin = () => {
  const customColor = '#2B2E4A';
  //const customColor2 = '#FFFFFF';

  return (
    <Box
      sx={{ fontFamily: 'Inter, sans-serif' }}
      textAlign='center'
      position='absolute'
      fontSize={45}
      mt={10}
      ml={5}
      width={300}
      height={100}
      top={0}
      left={0}
      bgcolor={customColor}
      color='primary.contrastText'
      p={2}
      href=''
    >
      Nomadapp
    </Box>
  );
};

export default BoxLogin;
/* color={customColor2} bgcolor={customColor} mr={2} p={10} fontStyle={customSyle} href=''>
        Nomadapp
      </Box>
      <Box>
        <FormLogin />

        <h3 href=''> ¿Aún no tienes cuenta? Crea una usando tu correo AQUÍ </h3>
      </Box>
   */
