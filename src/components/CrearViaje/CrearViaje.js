import { Box, Card, TextField, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { createTheme, ThemeProvider } from '@mui/material';
import FlightIcon from '@mui/icons-material/Flight';
import LuggageOutlinedIcon from '@mui/icons-material/LuggageOutlined';
import ButtonCustom from './ButtonCustom';
const theme = createTheme({
  palette: {
    primary: {
      main: '#2B2E4A',
    },
    secondary: {
      main: '#FFFFFF',
    },
  },
});

const FlightInfoContainer = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'stretch',
  width: '40vw',
  minWidth: '400px',
  backgroundColor: '#FFFFFF',
  padding: theme.spacing(2),
  borderRadius: theme.spacing(1),
  boxShadow: theme.shadows[5],
}));

const BoardingPassCard = () => (
  <Box display='flex' flexDirection='column' alignItems='center' mt={5} maxWidth='100%'>
    <Typography variant='h5' sx={{ marginBottom: 2 }}>
      Si tienes número de vuelo ingrésalo, si no, agrega manualmente tu Destino.
    </Typography>
    <FlightInfoContainer>
      <Box display='flex' justifyContent='space-between' alignItems='center'>
        <TextField label='Número de vuelo' variant='outlined' color='primary' size='small' sx={{ marginBottom: 2 }} />
        <FlightIcon sx={{ transform: 'rotate(90deg)', fontSize: '2rem', marginBottom: 2 }} />
      </Box>
      <Box display='flex' justifyContent='space-between' alignItems='center'>
        <TextField label='Origen' variant='outlined' color='primary' size='small' fullWidth sx={{ marginBottom: 2 }} />
        <LuggageOutlinedIcon sx={{ marginBottom: 2 }} />
        <TextField label='Destino' variant='outlined' color='primary' size='small' fullWidth sx={{ marginBottom: 2 }} />
      </Box>
      <Box display='flex' justifyContent='space-between' alignItems='center'>
        <TextField
          label='Fecha Ida'
          variant='outlined'
          color='primary'
          size='small'
          sx={{ marginBottom: 2, marginRight: 3 }}
        />
        <TextField label='Hora de salida' variant='outlined' color='primary' size='small' sx={{ marginBottom: 2 }} />
      </Box>
      <Box display='flex' justifyContent='center' sx={{ width: '100%' }}>
        <ButtonCustom text={'Agregar'} />
      </Box>
    </FlightInfoContainer>
  </Box>
);

const BoardingPassCardWrapper = () => (
  <ThemeProvider theme={theme}>
    <BoardingPassCard />
  </ThemeProvider>
);

export default BoardingPassCardWrapper;
