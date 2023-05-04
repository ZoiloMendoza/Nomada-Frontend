import React, { useState } from 'react';
import { TextField, Button, Box, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  box: {
    margin: '10px',
    width: '40vw',
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
}));

const AddHotel = () => {
  const classes = useStyles();

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
    // send the data to the database or API endpoint
    console.log(hotelData);
    // reset the form after submit
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
      <Box className={classes.box}>
        <form onSubmit={handleSubmit}>
          <TextField
            className={classes.input}
            required
            label='Nombre del Hotel'
            name='name'
            value={hotelData.name}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            className={classes.input}
            required
            label='Dirección'
            name='address'
            value={hotelData.address}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            className={classes.input}
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
          />
          <TextField
            className={classes.input}
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
          />
          <TextField
            className={classes.input}
            label='Número de Reservación'
            name='reservation'
            value={hotelData.reservation}
            onChange={handleChange}
            fullWidth
          />
          <Button type='submit' variant='contained' color='primary' className={classes.button}>
            Submit
          </Button>
        </form>
      </Box>
    </Grid>
  );
};

export default AddHotel;
