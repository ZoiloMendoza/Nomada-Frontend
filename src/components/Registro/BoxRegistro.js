import { Box } from '@mui/material';

const BoxRegistro = () => {
  const customColor = '#2B2E4A';
  const customColor2 = '#FFFFFF';
  const customSyle = 'Inter';

  return (
    <div>
      <Box color={customColor2} bgcolor={customColor} mr={22} p={4} fontStyle={customSyle}>
        Nomadapp
      </Box>
    </div>
  );
};

export default BoxRegistro;
