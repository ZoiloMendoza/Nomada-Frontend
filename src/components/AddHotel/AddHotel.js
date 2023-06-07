import React, { useState } from 'react';
import ReactGoogleAutocomplete from 'react-google-autocomplete';
import { TextField, Button, Box, Grid } from '@mui/material';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useAuth } from '@/utils/useAuth';
const URLRAILWAY = process.env.NEXT_PUBLIC_BACKEND;
const API_GOOGLE = process.env.NEXT_PUBLIC_API_GOOGLE;
const styles = {
  box: {
    margin: '30px',
    width: '50vw',
    height: '50vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    margin: '7px',
  },
  button: {
    margin: '7px',
    backgroundColor: '#E91E63',
  },
};

const AddHotel = () => {
  const usuario = useAuth();
  const router = useRouter();
  const [photoUrl, setPhotoUrl] = useState('');
  if (!router.isReady) return null;
  const { destino, idRuta } = router.query;
  console.log(idRuta, 'idRuta-desde-Agregar-Hotel');
  console.log(destino, 'destino-desde-agrega-hotel');
  const [hotelData, setHotelData] = useState({
    name: '',
    address: '',
    checkIn: '',
    checkOut: '',
    reservation: '',
    imagen: '',
    latitud: '',
    longitud: '',
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setHotelData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
 

  const resetData = (e) => {
    e.preventDefault();
    setHotelData({
      name: '',
      address: '',
      checkIn: '',
      checkOut: '',
      reservation: '',
    });
  };

  const hotelAddClick = async (e) => {
    e.preventDefault();
    try {
      const nuevoHospedaje = {
        rutaId: idRuta,
        nombreHospedaje: hotelData.name,
        direccion: hotelData.address,
        fechaInicio: hotelData.checkIn,
        fechaFinal: hotelData.checkOut,
        imagen: photoUrl,
        latitud: hotelData.latitud,
        longitud: hotelData.longitud,
      };
      const hotelAdd = await axios.post(`${URLRAILWAY}/api/v1/hospedajes`, nuevoHospedaje);
      if (hotelAdd.status == 201) {
        const dataApi = hotelAdd.data;
        console.log('Hospedaje creado', dataApi);
        alert('Hotel agregado correctamente');
        router.push(`/itinerary?id=${dataApi.viajeId}`);
      } else {
        console.log('Error al insertar');
      }
    } catch (error) {
      console.error('Error en la petición:', error);
    }
  };
  const handlePlaceSelect = (place) => {
    if (place && place.geometry && place.geometry.location) {
      console.log('Place selected:', place);
      console.log('Place photos:', place.photos[0].getUrl());
      console.log('Formatted Address:', place.formatted_address);
      console.log('Latitude:', place.geometry.location.lat());
      console.log('Longitude:', place.geometry.location.lng());
      console.log('Place_id', place.place_id);
      const selectedDestino = place.formatted_address;
      setPhotoUrl(place?.photos[0]?.getUrl() || '');
      setHotelData((prevState) => ({
        ...prevState,
        address: selectedDestino,
        latitud: place.geometry.location.lat(),
        longitud: place.geometry.location.lng(),
      }));
    }
  };
  return (
    <Grid
      container
      spacing={0}
      direction='column'
      alignItems='center'
      justifyContent='center'
      style={{ minHeight: '100vh' }}
    >
      <h1>{`Destino ${destino}`}</h1>
      <h1>Hospedaje</h1>
      <Box sx={styles.box}>
        <form>
          <TextField
            sx={styles.input}
            required
            label='Nombre del Hotel'
            name='name'
            value={hotelData.name}
            onChange={handleChange}
            fullWidth
            variant='filled'
            InputProps={{
              inputComponent: ReactGoogleAutocomplete,
              inputProps: {
                apiKey: API_GOOGLE,
                options: {
                  types: [],
                  fields: ['photos', 'formatted_address', 'geometry.location', 'place_id'],
                },
                onPlaceSelected: (place) => handlePlaceSelect(place),
              },
            }}
          />
          <TextField
            sx={styles.input}
            required
            label='Dirección'
            name='address'
            value={hotelData.address}
            onChange={handleChange}
            fullWidth
            variant='filled'
          />
          <TextField
            sx={styles.input}
            required
            label='Check-in'
            name='checkIn'
            type='date'
            value={hotelData.checkIn}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
            variant='filled'
          />
          <TextField
            sx={styles.input}
            required
            label='Check-out'
            name='checkOut'
            type='date'
            value={hotelData.checkOut}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
            variant='filled'
          />
          <TextField
            sx={styles.input}
            label='Número de Reservación'
            name='reservation'
            value={hotelData.reservation}
            onChange={handleChange}
            fullWidth
            variant='filled'
          />

          <Button type='submit' variant='contained' color='primary' sx={styles.button} onClick={hotelAddClick}>
            Agregar
          </Button>

          <Button type='button' variant='contained' color='primary' onClick={resetData}>
            Cancelar
          </Button>
        </form>
      </Box>
    </Grid>
  );
};

export default AddHotel;
