import { Box, Card, TextField, Typography } from '@mui/material';
import { styled } from '@mui/system';
import IconButton from '@mui/material/IconButton';
import { createTheme, ThemeProvider } from '@mui/material';
import FlightIcon from '@mui/icons-material/Flight';
import LuggageOutlinedIcon from '@mui/icons-material/LuggageOutlined';
import ButtonCustom from './ButtonCustom';
import { useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import { useRouter } from 'next/router';
import { getDataFindSearch } from '@/pages/api/proxy/findSearch';
const apiKey = process.env.NEXT_PUBLIC_API_VUELOS_KEY;
const URLRAILWAY = process.env.NEXT_PUBLIC_BACKEND;
const theme = createTheme({
  palette: {
    primary: {
      main: '#E91E63',
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
  width: '60vw',
  minWidth: '300px',
  backgroundColor: '#FFFFFF',
  padding: theme.spacing(2),
  borderRadius: theme.spacing(1),
  boxShadow: theme.shadows[4],
}));

const BoardingPassCard = () => {
  const [error, setError] = useState(false);
  const [idRuta, setIdRuta] = useState('');
  const [formData, setFormData] = useState({
    flightNumber: '',
    origen: '',
    destino: '',
    paisDestino: '',
    fechaInicio: '',
    fechaFinal: '',
    longitud: '',
    latitud: '',
  });
  const router = useRouter();
  const { id } = router.query;
  const regexPattern = /^[A-Za-z]{2}\d{4}$/;

  useEffect(()=> {
    if(id){
      const creandoRuta = async () => {
        try {
          const nuevaRuta = {
            viajeId: id,
          };
          const crearRutaPost = await axios.post(
            `${URLRAILWAY}/api/v1/rutas`,
            nuevaRuta,
          );
          //const params = { destino:'Chiapas', paisDestino: 'mx'}
          //const imagenTransporte = await getDataFindSearch({params})
          setIdRuta(crearRutaPost.data._id);
          console.log('ruta', crearRutaPost);
        } catch (error) {
          console.log(error);
        }
      };
      creandoRuta();
    }
  }, [id])
  const creandoTransporte = async (datosDelVuelo) => {
    try {
      const nuevoTransporte = {
        rutaId: idRuta,
        numeroVuelo: datosDelVuelo?.flightNumber,
        origen: datosDelVuelo?.origen,
        destino: datosDelVuelo?.destino,
        fechaIda: datosDelVuelo?.fechaInicio,
        fechaRegreso: datosDelVuelo?.fechaFinal,
        imagen: datosDelVuelo.imagen,
      };
      const crearTransportePost = await axios.post(
       `${URLRAILWAY}/api/v1/transportes`,
        nuevoTransporte,
      );
      console.log('transporte', crearTransportePost);
    } catch (error) {
      console.log(error);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setError(!regexPattern.test(e.target.value));
    console.log(formData);
  };

  const handleClick = async () => {
    //await creandoRuta();
    const { origen, destino, paisDestino, fechaInicio, fechaFinal, longitud, latitud } = formData;
    const modelViaje = {
      origen,
      destino,
      paisDestino,
      fechaInicio,
      fechaFinal,
      longitud,
      latitud
    };
    const viajePost = await axios.patch(
      `${URLRAILWAY}/api/v1/viajes/${id}`,
      modelViaje,
    );
    console.log('statusCode', viajePost.status);
    if (idRuta !== '') {
      await creandoTransporte({...formData, imagen:'hghjgjhg'});
    }
    if (viajePost.status !== 201) {
      console.log('error al insertar');
    } else {
      console.log('Viaje actualizado');
      router.push(`/itinerary?id=${id}`);
    }
  };
  const searchClick = async (e) => {
    e.preventDefault();
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
      if (flightGet.status == 200) {
        const dataApi = flightGet.data.response;
        console.log('Vuelo encontrado');
        setFormData({
          flightNumber: dataApi?.flight_iata || '',
          origen: dataApi?.dep_city || 'No encontrado',
          destino: dataApi?.arr_city || 'No encontrado',
          paisDestino: dataApi?.arr_country || 'No encontrado',
          fechaInicio: dataApi?.dep_time || '',
          fechaFinal: dataApi?.arr_time || '',
          longitud: dataApi?.lng || '',
          latitud: dataApi?.lat || '',
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
      <Typography variant='h5' sx={{ marginBottom: 2, textAlign: 'center' }}>
        Si tienes número de vuelo ingrésalo, si no, agrega manualmente tu Destino.
      </Typography>
      <FlightInfoContainer>
        <Box display='flex' justifyContent='space-between' alignItems='center'>
          <Box display='flex' justifyContent='flex-start' alignItems='center'>
            <TextField
              name='flightNumber'
              label='Número de vuelo'
              variant='filled'
              color='primary'
              size='small'
              value={formData.flightNumber}
              onChange={handleChange}
              error={error}
              helperText={error && 'El formato debe ser: dos letras seguidas de cuatro números'}
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
            variant='filled'
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
            variant='filled'
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
            variant='filled'
            color='primary'
            size='small'
            value={formData.fechaInicio}
            onChange={handleChange}
            sx={{ marginBottom: 2, marginRight: 3 }}
          />
          <TextField
            name='fechaFinal'
            label='Hora de salida'
            variant='filled'
            color='primary'
            size='small'
            value={formData.fechaFinal}
            onChange={handleChange}
            sx={{ marginBottom: 2 }}
          />
        </Box>
        <Box display='flex' justifyContent='center' sx={{ width: '100%' }}>
          <ButtonCustom text={'Agregar'} onClick={() => handleClick()} />
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
