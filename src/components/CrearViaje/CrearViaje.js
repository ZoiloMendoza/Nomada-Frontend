import { Box, Card, TextField, Typography } from '@mui/material';
import { styled } from '@mui/system';
import IconButton from '@mui/material/IconButton';
import { createTheme, ThemeProvider } from '@mui/material';
import FlightIcon from '@mui/icons-material/Flight';
import LuggageOutlinedIcon from '@mui/icons-material/LuggageOutlined';
import ButtonCustom from './ButtonCustom';
import { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';

const apiKey = process.env.NEXT_PUBLIC_API_VUELOS_KEY;

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

const BoardingPassCard = () => {
  const [formData, setFormData] = useState({
    flightNumber: '',
    origin: '',
    destination: '',
    departureDate: '',
    departureTime: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log(formData);
  };

  const handleClick = () => {
    console.log(formData);
  };
  const searchClick = async (e) => {
    e.preventDefault();
    console.log('lupa', apiKey);
    try {
      //flight_iata: 'VB1353';
      //flight_icao: 'AFL1478';
      const url = `https://airlabs.co/api/v9/flight`;
      const params = {
        api_key: apiKey,
        flight_iata: formData.flightNumber,
      };
      const flightGet = await axios.get(url, { params });
      console.log('statusCode', flightGet.status);
      console.log(flightGet.data.response);
      const dataApi = flightGet.data.response;
      if (flightGet.status == 200) {
        console.log('Vuelo encontrado');
        setFormData({
          flightNumber: dataApi.flight_iata,
          origin: dataApi.dep_city,
          destination: dataApi.arr_city,
          departureDate: dataApi.dep_time,
          departureTime: dataApi.arr_time,
        });
      } else {
        console.log('Error al insertar');
      }
    } catch (error) {
      console.error('Error en la petición:', error);
      alert('Error al crear al buscar el vuelo. Por favor, inténtalo de nuevo.');
    }
    console.log('Número de vuelo correcto', formData.flightNumber);
  };

  return (
    <Box display='flex' flexDirection='column' alignItems='center' mt={5} maxWidth='100%'>
      <Typography variant='h5' sx={{ marginBottom: 2 }}>
        Si tienes número de vuelo ingrésalo, si no, agrega manualmente tu Destino.
      </Typography>
      <FlightInfoContainer>
        <Box display='flex' justifyContent='space-between' alignItems='center'>
          <Box display='flex' justifyContent='flex-start' alignItems='center'>
            <TextField
              name='flightNumber'
              label='Número de vuelo'
              variant='outlined'
              color='primary'
              size='small'
              value={formData.flightNumber}
              onChange={handleChange}
              sx={{ marginBottom: 2 }}
            />
            <IconButton aria-label='Buscar' onClick={searchClick}>
              <SearchIcon sx={{ fontSize: '2rem', marginBottom: 2, color: '#2B2E4A' }} />
            </IconButton>
          </Box>
          <FlightIcon sx={{ transform: 'rotate(90deg)', fontSize: '3rem', marginBottom: 2 }} />
        </Box>
        <Box display='flex' justifyContent='space-between' alignItems='center'>
          <TextField
            name='origin'
            label='Origen'
            variant='outlined'
            color='primary'
            size='small'
            fullWidth
            value={formData.origin}
            onChange={handleChange}
            sx={{ marginBottom: 2 }}
          />
          <LuggageOutlinedIcon sx={{ marginBottom: 2 }} />
          <TextField
            name='destination'
            label='Destino'
            variant='outlined'
            color='primary'
            size='small'
            fullWidth
            value={formData.destination}
            onChange={handleChange}
            sx={{ marginBottom: 2 }}
          />
        </Box>
        <Box display='flex' justifyContent='space-between' alignItems='center'>
          <TextField
            name='departureDate'
            label='Fecha Ida'
            variant='outlined'
            color='primary'
            size='small'
            value={formData.departureDate}
            onChange={handleChange}
            sx={{ marginBottom: 2, marginRight: 3 }}
          />
          <TextField
            name='departureTime'
            label='Hora de salida'
            variant='outlined'
            color='primary'
            size='small'
            value={formData.departureTime}
            onChange={handleChange}
            sx={{ marginBottom: 2 }}
          />
        </Box>
        <Box display='flex' justifyContent='center' sx={{ width: '100%' }}>
          <ButtonCustom text={'Agregar'} onClick={handleClick} />
        </Box>
      </FlightInfoContainer>
    </Box>
  );
};

const BoardingPassCardWrapper = () => (
  <ThemeProvider theme={theme}>
    <BoardingPassCard />
  </ThemeProvider>
);

export default BoardingPassCardWrapper;
