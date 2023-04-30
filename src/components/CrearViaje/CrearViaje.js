import React from 'react';
import { Box, Card, TextField, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { createTheme, ThemeProvider } from '@mui/material';
import FlightIcon from '@mui/icons-material/Flight';

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
  alignItems: 'center',
  backgroundColor: '#2B2E4A',
  padding: theme.spacing(2),
  borderRadius: theme.spacing(1),
  boxShadow: theme.shadows[5],
}));

const BoardingPassCard = () => (
  <Box display='flex' justifyContent='center' mt={5}>
    <FlightInfoContainer>
      <Box display='flex' alignItems='center'>
        <Typography variant='h6' sx={{ color: 'white' }}>
          Tarjeta de embarque
        </Typography>
        <FlightIcon sx={{ transform: 'rotate(90deg)', fontSize: '2rem' }} />
      </Box>
      <TextField
        label='Aerolínea'
        variant='outlined'
        color='secondary'
        size='small'
        fullWidth
        sx={{ marginBottom: 1 }}
      />
      <TextField
        label='Número de vuelo'
        variant='outlined'
        color='secondary'
        size='small'
        fullWidth
        sx={{ marginBottom: 1 }}
      />
      <TextField label='Origen' variant='outlined' color='secondary' size='small' fullWidth sx={{ marginBottom: 1 }} />
      <TextField label='Destino' variant='outlined' color='secondary' size='small' fullWidth sx={{ marginBottom: 1 }} />
      <TextField label='Fecha' variant='outlined' color='secondary' size='small' fullWidth sx={{ marginBottom: 1 }} />
      <TextField label='Hora de salida' variant='outlined' color='secondary' size='small' fullWidth />
    </FlightInfoContainer>
  </Box>
);

const BoardingPassCardWrapper = () => (
  <ThemeProvider theme={theme}>
    <BoardingPassCard />
  </ThemeProvider>
);

export default BoardingPassCardWrapper;
