import * as React from 'react';
//import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import DirectionsBoatIcon from '@mui/icons-material/DirectionsBoat';
import FlightIcon from '@mui/icons-material/Flight';
import Button from '@mui/material/Button';
import { Grid } from '@mui/material';
import ButtonMisViajes from './ButtonMisViajes';
import ButtonNuevoViaje from './ButtonNuevoViaje';

export default function CardMisViajes() {
  //const theme = useTheme();
  const customColor = '#2B2E4A';
  const customColor2 = '#E91E63';
  const customColor3 = '#6C6D7F';

  return (
    <div className='CardMisVijaes'>
      <Grid mb={9}>
        <ButtonMisViajes />
      </Grid>
      <Card bgcolor={customColor3} sx={{ display: 'flex' }}>
        <Box bgcolor={customColor3} width={250} sx={{ display: 'flex', flexDirection: 'column', color: 'white' }}>
          <CardMedia
            bgcolor={customColor3}
            component='img'
            sx={{ width: 200 }}
            image='/static/images/cards/live-from-space.jpg'
            alt='Rivera Maya'
          />
        </Box>
        <Box bgcolor={customColor3} width={250} sx={{ display: 'flex', flexDirection: 'column', color: 'white' }}>
          <CardContent>
            <Typography
              component='div'
              variant='h4'
              align='center'
              mt={2}
              mb={1}
              sx={{ fontFamily: 'Inter, sans-serif', fontSize: 28 }}
            >
              Rivera Maya
            </Typography>
            <Typography variant='h6' component='div' align='center' sx={{ fontFamily: 'Inter, sans-serif' }}>
              Yucatán, MX
            </Typography>
            <Typography variant='subtitle1' component='div' align='center' sx={{ fontFamily: 'Inter, sans-serif' }}>
              Diciembre 12-15-2023
            </Typography>
          </CardContent>
          <Box ml={4} sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton aria-label='camion'>
              <DirectionsBusIcon sx={{ height: 40, width: 40 }} />
            </IconButton>
            <IconButton aria-label='barco'>
              <DirectionsBoatIcon sx={{ height: 40, width: 40 }} />
            </IconButton>
            <IconButton aria-label='avion'>
              <FlightIcon sx={{ height: 40, width: 40 }} />
            </IconButton>
          </Box>
        </Box>

        <Box bgcolor={customColor3} width={250} style={{ textAlign: 'center', alignItems: 'center' }}>
          <Grid my={4}>
            <Grid item sx={{ mb: 1 }}>
              <Button
                variant='contained'
                style={{
                  backgroundColor: customColor,
                  borderRadius: '10px',
                  padding: '10px 45px',
                }}
              >
                Ver viaje
              </Button>
            </Grid>
            <Grid item sx={{ mb: 1 }}>
              <Button
                variant='contained'
                style={{
                  backgroundColor: customColor,
                  borderRadius: '10px',
                  padding: '10px 20px',
                }}
              >
                Compartir viaje
              </Button>
            </Grid>
            <Grid item sx={{ mb: 1 }}>
              <Button
                variant='contained'
                style={{
                  backgroundColor: customColor2,
                  borderRadius: '10px',
                  padding: '10px 30px',
                }}
              >
                Eliminar Viaje
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Card>
      <Grid my={5} container justifyContent={'flex-end'}>
        <ButtonNuevoViaje />
      </Grid>
    </div>
  );
}
