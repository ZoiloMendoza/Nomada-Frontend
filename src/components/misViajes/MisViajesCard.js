import React from 'react';
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

const MisViajesCard = ({ datosViajes, title }) => {
  console.log(datosViajes, 'MisvIAJES');
  //console.log(datosViajes.rutas[0].transporte.imagen, 'espero url')
  return (
    <Card sx={{ display: 'flex', marginBottom: '5vh', alignItems: 'center', flexWrap: 'wrap' }}>
      <CardMedia
        component='img'
        sx={{ width: '200px', height: '250px' }}
        title={title}
        image={datosViajes?.rutas[0]?.transporte?.imagen}
      />
      <CardContent sx={{ flex: '1 0 auto', maxWidth: '250px' }}>
        <Typography variant='h5' component='h2'>
          {datosViajes?.nombre}
        </Typography>
        <Typography gutterBottom variant='subtitle1'>
          {`${datosViajes.rutas.length}`} Destinos
        </Typography>
        <Typography variant='body2' color='textSecondary' component='p'>
          {`Inicio ${datosViajes.fechaInicio} final ${datosViajes.fechaFinal}`} Fechas
        </Typography>
      </CardContent>
      <Grid container direction='column' justify='center' alignItems='center' sx={{ maxWidth: '200px' }}>
        <Link href={`/itinerary?id=${datosViajes._id}`}>
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
            <IconButton aria-label='delete' onClick={() => handleDelete(flightInfo)}>
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
