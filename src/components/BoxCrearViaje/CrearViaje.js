import { Card, Typography, Input, Button, Box } from '@mui/material';
import Link from 'next/link';
import { useState } from 'react';
import axios from 'axios';
import { getUser } from '@/utils/auth';
export default function CrearViaje() {
  const usuario = getUser();
  const customColor2 = '#E91E63';
  const [viajeName, setViajeName] = useState({
    nombre: '',
    administradorViaje: usuario?.idUser,
  });

  const handleOnChange = (e) => {
    console.log([e.target.name], e.target.value);
    setViajeName({ ...viajeName, [e.target.name]: e.target.value });
  };
  const addViaje = async () => {
    const viajePost = await axios.post('https://nomada-backend-production.up.railway.app/api/v1/viajes', viajeName);
    console.log('statusCode', viajePost.status);
    if (viajePost.status !== 201) {
      console.log('error al insertar');
    } else {
      console.log('Viaje creado');
      setViajeName({
        nombre: '',
      });
    }
  };
  console.log(viajeName);
  return (
    <Card
      bgcolor='gray'
      variant='soft'
      sx={{
        backgroundColor: '#BABCBE',
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
        sx={{ display: 'flex', fontFamily: 'Inter, sans-serif', fontSize: '25px', fontWeight: 'bold' }}
      >
        {' '}
        Comienza por crear un viaje aquí abajo.
      </Typography>
      <Typography
        level='body2'
        flexDirection='column'
        alignItems='center'
        textAlign='center'
        justifyContent='center'
        sx={{ display: 'flex', fontFamily: 'Inter, sans-serif', fontSize: '18px', fontWeight: 'light' }}
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
      <Box my={4} ml={7} justifyContent='center' direction='row' container>
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
