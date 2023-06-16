import { Card, Typography, Input, Button, Box } from '@mui/material';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
const URLRAILWAY = process.env.NEXT_PUBLIC_BACKEND;
export default function CrearViaje() {
  const customColor2 = '#E91E63';
  const router = useRouter();
  const [validarViaje, setValidarViaje] = useState('false');
  const [status, setStatus] = useState('');
  const [viajeName, setViajeName] = useState({
    nombre: '',
  });

  const handleOnChange = (e) => {
    console.log([e.target.name], e.target.value);
    setViajeName({ ...viajeName, [e.target.name]: e.target.value });
    setValidarViaje(e.target.value !== '');
  };
  const addViaje = async () => {
    if (viajeName.nombre === '') {
      setStatus('error');
      return;
    }
    const usuario = JSON.parse(localStorage.getItem('usuarioLogeado'));
    const viajeBody = { nombre: viajeName.nombre, administradorViaje: usuario.idUser };
    const viajePost = await axios.post(`${URLRAILWAY}/api/v1/viajes`, viajeBody);
    console.log('statusCode', viajePost.status);
    if (viajePost.status !== 201) {
      console.log('error al insertar');
      setStatus('error');
    } else {
      console.log('Viaje creado');
      setStatus('success');
      setViajeName({
        nombre: '',
      });
      const idViaje = viajePost.data._id;
      setTimeout(() => {
        router.push({ pathname: '/crear-viaje', query: { id: idViaje } });
      }, 2000);
    }
  };

  console.log(viajeName);
  return (
    <Card
      variant='soft'
      sx={{
        backgroundColor: '#EDEDED',
        minHeight: '100px',
        width: '300px',
      }}
    >
      {' '}
      <Stack sx={{ width: '100%' }} autoHideDuration={5000} spacing={2}>
        {status === 'success' && (
          <Alert severity='success'>
            <AlertTitle>Éxito</AlertTitle>
            Actividad agregada correctamente!
          </Alert>
        )}
        {status === 'error' && (
          <Alert severity='error'>
            <AlertTitle>Error</AlertTitle>
            Ocurrió un error, rellene todos los campos para continuar.
          </Alert>
        )}
      </Stack>
      <Typography
        level='h3'
        mt={3}
        flexDirection='column'
        alignItems='center'
        textAlign='center'
        justifyContent='center'
        sx={{ display: 'flex', fontSize: '25px', fontWeight: 'bold' }}
      >
        Comienza por crear un viaje aquí abajo.
      </Typography>
      <Typography
        level='body2'
        flexDirection='column'
        alignItems='center'
        textAlign='center'
        justifyContent='center'
        sx={{ display: 'flex', fontSize: '18px', fontWeight: 'light' }}
      >
        Nombre del Viaje
      </Typography>
      <Box mt={2} mb={2} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Input
          required
          sx={{ padding: '10px', borderRadius: '5px', backgroundColor: '#fff', width: '250px', margin: 'auto' }}
          placeholder='Mi viaje ideal'
          variant='soft'
          name='nombre'
          value={viajeName.nombre || ''}
          onChange={handleOnChange}
        />
      </Box>
      <Box my={4} ml={7} justifyContent='center' direction='row'>
        <Button
          variant='contained'
          disabled={!validarViaje}
          style={{
            fontSize: '15px',
            backgroundColor: customColor2,
            borderRadius: '40px',
            padding: '15px 40px',
            textTransform: 'none',
            fontFamily: 'Inter, sans-serif',
          }}
          onClick={addViaje}
        >
          CREAR VIAJE
        </Button>
      </Box>
    </Card>
  );
}
