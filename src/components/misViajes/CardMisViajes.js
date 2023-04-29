/*
import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
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
    <Card color={customColor3} sx={{ display: 'flex' }}>
      <CardMedia
        component='img'
        sx={{ width: 151 }}
        image='/static/images/cards/live-from-space.jpg'
        alt='Live from space album cover'
      />
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
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
            {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
          </IconButton>
          <IconButton aria-label='play/pause'>
            <PlayArrowIcon sx={{ height: 38, width: 38 }} />
          </IconButton>
          <IconButton aria-label='next'>
            {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
          </IconButton>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
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
      </Box>
      <CardMedia
        component='img'
        sx={{ width: 151 }}
        image='/static/images/cards/live-from-space.jpg'
        alt='Live from space album cover'
      />
    </Card>
  );
}
/* 