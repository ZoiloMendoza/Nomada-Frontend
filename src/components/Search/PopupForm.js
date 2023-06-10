import React, { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions } from '@mui/material';
import { useRouter } from 'next/router';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
import axios from 'axios';

const PopupForm = ({ data, openForm, closeForm, categoria }) => {
  const router = useRouter();
  const { idRuta } = router.query;

  const [name, setName] = useState(data.name);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [status, setStatus] = useState('');

  const handleClose = () => {
    setTimeout(() => {
      closeForm();
    }, 1000);
  };
  const agregarActividad = async () => {
    try {
      const nuevaActividad = {
        rutaId: idRuta,
        categoria: categoria,
        nombre: data.name,
        direccion: data.address_obj.address_string,
        fotos: data.data[0].images.large.url,
        fechaInicio: date,
        fechaFinal: time,
      };
      const crearRutaPost = await axios.post(
        `https://nomada-backend-production.up.railway.app/api/v1/actividades`,
        nuevaActividad,
      );
      console.log(crearRutaPost, 'crearRuta');
      setStatus('success');
      //alert('se agrego actividad');
    } catch (error) {
      console.log(error);
      setStatus('error');
    }
  };
  const handleSubmit = () => {
    agregarActividad();
    console.log('Nombre: ', name);
    console.log('Fecha: ', date);
    console.log('Horario: ', time);
    setTimeout(() => {
      handleClose();
    }, 1000);
  };

  console.log(data);

  return (
    <>
      <Dialog open={openForm} onClose={handleClose}>
        <DialogTitle>Ingresa información</DialogTitle>
        <DialogContent>
          <DialogContentText>Por favor, ingresa los siguientes datos para agregarlos a tu itinerario</DialogContentText>
          <Stack sx={{ width: '100%' }} autoHideDuration={5000} spacing={2}>
            {status === 'success' && (
              <Alert severity='success'>
                <AlertTitle>Éxito</AlertTitle>
                Se agrego restaurante correctamente!
              </Alert>
            )}
            {status === 'error' && (
              <Alert severity='error'>
                <AlertTitle>Error</AlertTitle>
                Ocurrió un error.
              </Alert>
            )}
          </Stack>
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

export default PopupForm;
