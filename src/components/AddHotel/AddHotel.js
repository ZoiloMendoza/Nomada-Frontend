import React, { useState } from 'react';
import { TextField, Button, Box, Grid } from '@mui/material';
import Link from 'next/Link';

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
  const [hotelData, setHotelData] = useState({
    name: '',
    address: '',
    checkIn: '',
    checkOut: '',
    reservation: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHotelData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Enviar info a la base de datos aqui
    console.log(hotelData);

    setHotelData({
      name: '',
      address: '',
      checkIn: '',
      checkOut: '',
      reservation: '',
    });
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

  return (
    <Grid
      container
      spacing={0}
      direction='column'
      alignItems='center'
      justifyContent='center'
      style={{ minHeight: '100vh' }}
    >
      <h1>Hospedaje</h1>
      <Box sx={styles.box}>
        <form onSubmit={handleSubmit}>
          <TextField
            sx={styles.input}
            required
            label='Nombre del Hotel'
            name='name'
            value={hotelData.name}
            onChange={handleChange}
            fullWidth
            variant='filled'
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
          <Link href='/itinerary'>
            <Button type='submit' variant='contained' color='primary' sx={styles.button}>
              Agregar
            </Button>
          </Link>
          <Button type='button' variant='contained' color='primary' onClick={resetData}>
            Cancelar
          </Button>
        </form>
      </Box>
    </Grid>
  );
};

export default AddHotel;
