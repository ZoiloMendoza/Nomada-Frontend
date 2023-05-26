import { Box } from '@mui/material';

const BoxRegistro = () => {
  const customColor = '#2B2E4A';
  const customColor2 = '#FFFFFF';
  const customSyle = 'Inter';

  return (
    <Box
      style={{ height: '80px', width: '150px', textAlign: 'center' }}
      color={customColor2}
      bgcolor={customColor}
      mb={3}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '5vh',
        fontSize: '20px',
        fontFamily: 'Inter, sans-serif',
      }}
      fontStyle={customSyle}
      href=''
    >
      Nomadapp
    </Box>
  );
};
/*
style={{ height: '90px', width: '120px', textAlign: 'center' }}
color={customColor2}
bgcolor={customColor}
mb={3}
mr={25}
ml={3}
p={4}
marginTop={2}
*/
export default BoxRegistro;
