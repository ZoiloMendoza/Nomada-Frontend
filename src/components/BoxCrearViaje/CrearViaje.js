import { Card, Typography, Input, Button, Box } from '@mui/material';
import Link from 'next/link';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
const URLRAILWAY = process.env.NEXT_PUBLIC_BACKEND;
export default function CrearViaje() {
  const customColor2 = '#E91E63';
  const router = useRouter();
  const [viajeName, setViajeName] = useState({
    nombre: '',
  });

  const handleOnChange = (e) => {
    console.log([e.target.name], e.target.value);
    setViajeName({ ...viajeName, [e.target.name]: e.target.value });
  };
  const addViaje = async () => {
    const usuario = JSON.parse(localStorage.getItem('usuarioLogeado'));
    const viajeBody = { nombre: viajeName.nombre, administradorViaje: usuario.idUser };
    const viajePost = await axios.post(`${URLRAILWAY}/api/v1/viajes`, viajeBody);
    console.log('statusCode', viajePost.status);
    if (viajePost.status !== 201) {
      console.log('error al insertar');
    } else {
      console.log('Viaje creado');
      setViajeName({
        nombre: '',
      });
      const idViaje = viajePost.data._id;
      router.push({ pathname: '/crear-viaje', query: { id: idViaje } });
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
          sx={{ padding: '10px', borderRadius: '5px', backgroundColor: '#fff', width: '250px', margin: 'auto' }}
          placeholder='Mi viaje ideal'
          variant='soft'
          name='nombre'
          value={viajeName.nombre || ''}
          onChange={handleOnChange}
        />
      </Box>
      <Box my={4} ml={7} justifyContent='center' direction='row'>
        <Link href='/crear-viaje'>
          <Button
            variant='contained'
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
        </Link>
      </Box>
    </Card>
  );
}
