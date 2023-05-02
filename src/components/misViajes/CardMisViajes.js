import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import DirectionsBoatIcon from '@mui/icons-material/DirectionsBoat';
import FlightIcon from '@mui/icons-material/Flight';
//import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
//import PlayArrowIcon from '@mui/icons-material/PlayArrow';
//import SkipNextIcon from '@mui/icons-material/SkipNext';
import Button from '@mui/material/Button';

export default function CardMisViajes() {
  const theme = useTheme();
  const customColor = '#2B2E4A';
  const customColor2 = '#E91E63';
  const customColor3 = '#6C6D7F';

  return (
    <Card bgcolor={customColor3} sx={{ display: 'flex' }}>
      <CardMedia
        bgcolor={customColor3}
        component='img'
        sx={{ width: 151 }}
        image='/static/images/cards/live-from-space.jpg'
        alt='Rivera Maya'
      />
      <Box bgcolor={customColor3} sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component='div' variant='h5'>
            Rivera Maya
          </Typography>
          <Typography variant='subtitle1' color='text.secondary' component='div'>
            Yucatán, MX
          </Typography>
          <Typography variant='subtitle1' color='text.secondary' component='div'>
            Diciembre 12-15-2023
          </Typography>
        </CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
          <IconButton aria-label='previous'>
            {theme.direction === 'rtl' ? <DirectionsBusIcon /> : <DirectionsBusIcon />}
          </IconButton>
          <IconButton aria-label='play/pause'>
            <DirectionsBoatIcon sx={{ height: 25, width: 25 }} />
          </IconButton>
          <IconButton aria-label='next'>{theme.direction === 'rtl' ? <FlightIcon /> : <FlightIcon />}</IconButton>
        </Box>
      </Box>
      <Box bgcolor={customColor3} sx={{ display: 'flex', flexDirection: 'column', pl: 10, pb: 10 }}>
        <Button
          variant='contained'
          style={{
            backgroundColor: customColor,
            borderRadius: '50px',
            padding: '10px 20px',
          }}
        >
          Ver viaje
        </Button>
        <Button
          variant='contained'
          style={{
            backgroundColor: customColor,
            borderRadius: '50px',
            padding: '10px 20px',
          }}
        >
          Compartir viaje
        </Button>
        <Button
          variant='contained'
          style={{
            backgroundColor: customColor2,
            borderRadius: '50px',
            padding: '10px 20px',
          }}
        >
          Eliminar Viaje
        </Button>
      </Box>
    </Card>
  );
}
