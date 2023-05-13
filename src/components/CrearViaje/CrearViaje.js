import { Box, Card, TextField, Typography } from '@mui/material';
import { styled } from '@mui/system';
import IconButton from '@mui/material/IconButton';
import { createTheme, ThemeProvider } from '@mui/material';
import FlightIcon from '@mui/icons-material/Flight';
import LuggageOutlinedIcon from '@mui/icons-material/LuggageOutlined';
import ButtonCustom from './ButtonCustom';
import { useState, useEffect } from 'react';
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
    origen: '',
    destino: '',
    fechaInicio: '',
    fechaFinal: '',
  });
  useEffect(() => {
    (async () => {
      let contentViaje = [];
      try {
        contentViaje = await axios.get(
          'https://nomada-backend-production.up.railway.app/api/v1/viajes/645eeaf038279c8ea63e9a15',
        );
        console.log('statusCode', contentViaje.status);
        console.log('getServer', contentViaje);
        return {
          props: {
            contentViaje: contentViaje.data,
          },
        };
      } catch (error) {
        console.log(error);
        return {
          props: {
            contentViaje: {},
          },
        };
      }
    })();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log(formData);
  };

  const handleClick = async () => {
    console.log(formData);
    const { origen, destino, fechaInicio, fechaFinal } = formData;
    const modelViaje = {
      origen,
      destino,
      fechaInicio,
      fechaFinal,
    };
    const viajePost = await axios.patch(
      'https://nomada-backend-production.up.railway.app/api/v1/viajes/645eeaf038279c8ea63e9a15',
      modelViaje,
    );
    console.log('statusCode', viajePost.status);
    if (viajePost.status !== 201) {
      console.log('error al insertar');
    } else {
      console.log('Viaje actualizado');
      setFormData({
        flightNumber: '',
        origen: '',
        destino: '',
        fechaInicio: '',
        fechaFinal: '',
      });
    }
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
          origen: dataApi.dep_city,
          destino: dataApi.arr_city,
          fechaInicio: dataApi.dep_time,
          fechaFinal: dataApi.arr_time,
        });
      } else {
        console.log('Error al insertar');
      }
    } catch (error) {
      console.error('Error en la petición:', error);
      alert('Error al crear al buscar el vuelo. Por favor, inténtalo de nuevo.');
    }
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
            name='origen'
            label='Origen'
            variant='outlined'
            color='primary'
            size='small'
            fullWidth
            value={formData.origen}
            onChange={handleChange}
            sx={{ marginBottom: 2 }}
          />
          <LuggageOutlinedIcon sx={{ marginBottom: 2 }} />
          <TextField
            name='destino'
            label='Destino'
            variant='outlined'
            color='primary'
            size='small'
            fullWidth
            value={formData.destino}
            onChange={handleChange}
            sx={{ marginBottom: 2 }}
          />
        </Box>
        <Box display='flex' justifyContent='space-between' alignItems='center'>
          <TextField
            name='fechaInicio'
            label='Fecha Ida'
            variant='outlined'
            color='primary'
            size='small'
            value={formData.fechaInicio}
            onChange={handleChange}
            sx={{ marginBottom: 2, marginRight: 3 }}
          />
          <TextField
            name='fechaFinal'
            label='Hora de salida'
            variant='outlined'
            color='primary'
            size='small'
            value={formData.fechaFinal}
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
