import React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Link from 'next/link';

const MisViajesCard = ({ image, title, subtitle, paragraph }) => (
  <Card sx={{ display: 'flex', marginBottom: '5vh', alignItems: 'center', flexWrap: 'wrap' }}>
    <CardMedia sx={{ width: '250px' }} image={image} title={title} />
    <CardContent sx={{ flex: '1 0 auto' }}>
      <Typography variant='h5' component='h2'>
        {title} Titulo del Viaje
      </Typography>
      <Typography gutterBottom variant='subtitle1'>
        {subtitle} Destinos
      </Typography>
      <Typography variant='body2' color='textSecondary' component='p'>
        {paragraph} Fechas
      </Typography>
    </CardContent>
    <Grid container direction='column' justify='flex-start' alignItems='center' sx={{ maxWidth: '200px' }}>
      <Link href='/itinerary'>
        <Button size='small' variant='contained' color='primary' sx={{ margin: '3px', padding: '1px', width: '130px' }}>
          Ver viaje
        </Button>
      </Link>
      <Button size='small' variant='outlined' color='primary' sx={{ margin: '3px', padding: '1px', width: '130px' }}>
        Compartir viaje
      </Button>
      <Button size='small' variant='outlined' color='primary' sx={{ margin: '3px', padding: '1px', width: '130px' }}>
        Eliminar Viaje
      </Button>
    </Grid>
  </Card>
);

export default MisViajesCard;
