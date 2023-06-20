import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Link from 'next/link';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import { Delete as DeleteIcon } from '@mui/icons-material';
import IosShareIcon from '@mui/icons-material/IosShare';
import { Tooltip } from '@mui/material';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
import axios from 'axios';
const URLRAILWAY = process.env.NEXT_PUBLIC_BACKEND;

const MisViajesCard = ({ datosViaje, title }) => {
  console.log(datosViaje, 'MisvIAJES');
  const [status, setStatus] = useState('');

  const handleDelete = async () => {
    const viajeDelete = await axios.delete(`${URLRAILWAY}/api/v1/viajes/${datosViaje._id}`);
    console.log(viajeDelete.status);
    setStatus('success');
    //alert('Viaje eliminado');
  };
  //console.log(datosViaje.rutas[0].transporte.imagen, 'espero url')
  return (
    <Card
      sx={{
        display: 'flex',
        marginBottom: '5vh',
        alignItems: 'center',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
      }}
    >
      <Stack sx={{ width: '100%' }} autoHideDuration={5000} spacing={2}>
        {status === 'success' && (
          <Alert severity='success'>
            <AlertTitle>Éxito</AlertTitle>
            Viaje eliminado correctamente!
          </Alert>
        )}
        {status === 'error' && (
          <Alert severity='error'>
            <AlertTitle>Error</AlertTitle>
            Ocurrió un error.
          </Alert>
        )}
      </Stack>
      <CardMedia
        component='img'
        sx={{ width: '30%', height: '250px' }}
        title={title}
        image={datosViaje?.rutas[0]?.transporte?.imagen}
      />
      <CardContent sx={{ flex: '1 0 auto', maxWidth: '30%' }}>
        <Typography variant='h5' component='h2'>
          {datosViaje?.nombre}
        </Typography>
        <Typography gutterBottom variant='subtitle1'>
          {datosViaje.rutas.length > 0
            ? datosViaje.rutas
                .map((ruta) => {
                  try {
                    return ruta.transporte.destino.split(',')[0];
                  } catch (e) {
                    console.error('Error al obtener el nombre corto de la ruta:', e);
                    return null;
                  }
                })
                .filter(Boolean)
                .join(', ') || datosViaje.rutas.length
            : 'No hay destinos'}
        </Typography>
        <Typography variant='body2' color='textSecondary' component='p'>
          {`Inicio ${datosViaje.fechaInicio}`}
        </Typography>
        <Typography variant='body2' color='textSecondary' component='p'>
          {`final ${datosViaje.fechaFinal}`}
        </Typography>
      </CardContent>
      <Grid container direction='column' justify='center' alignItems='center' sx={{ maxWidth: '30%' }}>
        <Link href={`/itinerary?id=${datosViaje._id}`}>
          <Button
            size='small'
            variant='contained'
            color='primary'
            sx={{ margin: '3px', padding: '1px', width: '130px' }}
          >
            Ver viaje
          </Button>
        </Link>
        <Box>
          <Tooltip title='Compartir Viaje'>
            <IconButton aria-label='edit' onClick={() => handleEdit(flightInfo)}>
              <IosShareIcon
                sx={{
                  width: '30px',
                  color: '#E91E63',
                  opacity: '0.5',
                }}
              />
            </IconButton>
          </Tooltip>
          <Tooltip title='Eliminar Viaje'>
            <IconButton aria-label='delete' onClick={() => handleDelete()}>
              <DeleteIcon
                sx={{
                  width: '30px',
                  color: '#E91E63',
                  opacity: '0.5',
                }}
              />
            </IconButton>
          </Tooltip>
        </Box>
      </Grid>
    </Card>
  );
};

export default MisViajesCard;
