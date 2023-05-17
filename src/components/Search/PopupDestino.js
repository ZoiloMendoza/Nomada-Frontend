import React, { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions } from '@mui/material';

const PopupDestino = ({ item, open, closeDestino }) => {
  // const [openForm, setOpenForm] = useState(false);
  const [name, setName] = useState(item.name);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const handleClose = () => {
    closeDestino();
  };

  const handleSubmit = () => {
    // handle form submission logic here
    console.log('Nombre: ', name);
    console.log('Fecha: ', date);
    console.log('Horario: ', time);
    handleClose();
  };

  console.log(item);

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Ingresa información</DialogTitle>
        <DialogContent>
          <DialogContentText>Por favor, ingresa los siguientes datos para agregarlos a tu itinerario</DialogContentText>
          <TextField
            variant='filled'
            autoFocus
            margin='dense'
            id='name'
            label='Destino'
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
          />

          <TextField
            variant='filled'
            margin='dense'
            id='date'
            label=''
            type='date'
            value={date}
            onChange={(e) => setDate(e.target.value)}
            fullWidth
          />
          <TextField
            variant='filled'
            margin='dense'
            id='time'
            label=''
            type='time'
            value={time}
            onChange={(e) => setTime(e.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Cancel
          </Button>
          <Button onClick={handleSubmit} color='primary'>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default PopupDestino;
