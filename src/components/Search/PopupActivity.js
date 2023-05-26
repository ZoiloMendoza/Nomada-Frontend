import React, { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions } from '@mui/material';

const PopupActivity = ({ data, openForm, closeForm }) => {
  // const [openForm, setOpenForm] = useState(false);
  const [name, setName] = useState(data.name);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const handleClose = () => {
    closeForm();
  };

  const handleSubmit = () => {
    // handle form submission logic here
    console.log('Nombre: ', name);
    console.log('Fecha: ', date);
    console.log('Horario: ', time);
    handleClose();
  };

  console.log(data);

  return (
    <>
      <Dialog open={openForm} onClose={handleClose}>
        <DialogTitle>Ingresa información</DialogTitle>
        <DialogContent>
          <DialogContentText>Por favor, ingresa los siguientes datos para agregarlos a tu itinerario</DialogContentText>
          <TextField
            variant='filled'
            autoFocus
            margin='dense'
            id='name'
            label='Nombre de actividad'
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

export default PopupActivity;
