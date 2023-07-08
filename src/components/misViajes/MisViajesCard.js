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
import axios from 'axios';
const URLRAILWAY = process.env.NEXT_PUBLIC_BACKEND;

const MisViajesCard = ({ datosViaje, setEliminado }) => {
  const [status, setStatus] = useState(null);

  const handleDelete = async () => {
    try {
      await axios.delete(`${URLRAILWAY}/api/v1/viajes/${datosViaje._id}`);
      setStatus('success');
      setTimeout(() => {
        setEliminado(datosViaje._id);
      }, 1500);
    } catch (error) {
      console.error('Error deleting trip', error);
      setStatus('error');
    }
  };

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
      {status === 'success' && (
        <Alert severity='success' sx={{ width: '100%' }}>
          Viaje eliminado correctamente!
        </Alert>
      )}
      {status === 'error' && (
        <Alert severity='error' sx={{ width: '100%' }}>
          Error al eliminar el viaje. Inténtalo más tarde.
        </Alert>
      )}
      <CardMedia
        sx={{ width: '30%', height: '250px' }}
        image={datosViaje?.rutas[0]?.transporte?.imagen}
      />
      <CardContent sx={{ flex: '1 0 auto', maxWidth: '30%' }}>
        <Typography variant='h5'>{datosViaje?.nombre}</Typography>
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
        <Typography variant='body2' color='textSecondary'>
          {`Inicio ${datosViaje.fechaInicio}`}
        </Typography>
        <Typography variant='body2' color='textSecondary'>
          {`Final ${datosViaje.fechaFinal}`}
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
              <IosShareIcon sx={{ width: '30px', color: '#E91E63', opacity: '0.5' }} />
            </IconButton>
          </Tooltip>
          <Tooltip title='Eliminar Viaje'>
            <IconButton aria-label='delete' onClick={handleDelete}>
              <DeleteIcon sx={{ width: '30px', color: '#E91E63', opacity: '0.5' }} />
            </IconButton>
          </Tooltip>
        </Box>
      </Grid>
    </Card>
  );
};

export default MisViajesCard;
