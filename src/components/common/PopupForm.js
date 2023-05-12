import React, { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions } from '@mui/material';

const PopupForm = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    // handle form submission logic here
    console.log('Nombre: ', name);
    console.log('Categoría: ', name);
    console.log('Fecha: ', date);
    console.log('Horario: ', time);
    handleClose();
  };

  return (
    <>
      <Button variant='outlined' color='primary' onClick={handleClickOpen}>
        Open Form
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Ingresa información</DialogTitle>
        <DialogContent>
          <DialogContentText>Por favor, ingresa los siguientes datos para agregarlos a tu itinerario</DialogContentText>
          <TextField
            autoFocus
            margin='dense'
            id='name'
            label='Nombre'
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
          />
          <TextField
            autoFocus
            margin='dense'
            id='category'
            label='Categoría'
            type='text'
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            fullWidth
          />
          <TextField
            margin='dense'
            id='date'
            label=''
            type='date'
            value={date}
            onChange={(e) => setDate(e.target.value)}
            fullWidth
          />
          <TextField
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

export default PopupForm;
