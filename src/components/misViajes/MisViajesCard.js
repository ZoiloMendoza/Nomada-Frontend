import React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Link from 'next/Link';

const MyCard = ({ image, title, subtitle, paragraph }) => (
  <Card sx={{ display: 'flex', marginBottom: '5px' }}>
    <CardMedia sx={{ width: '200px' }} image={image} title={title} />
    <CardContent sx={{ flex: '1 0 auto' }}>
      <Typography variant='h5' component='h2'>
        {title} Titulo
      </Typography>
      <Typography gutterBottom variant='subtitle1'>
        {subtitle} Subtitulo
      </Typography>
      <Typography variant='body2' color='textSecondary' component='p'>
        {paragraph} Fechas
      </Typography>
    </CardContent>
    <Grid container direction='column' justify='flex-start' alignItems='center'>
      <Link href='/itinerary'>
        <Button variant='contained' color='primary' sx={{ marginTop: '5px' }}>
          Ver viaje
        </Button>
      </Link>
      <Button variant='contained' color='secondary' sx={{ marginTop: '5px' }}>
        Compartir viaje
      </Button>
      <Button variant='contained' sx={{ marginTop: '5px' }}>
        Eliminar Viaje
      </Button>
    </Grid>
  </Card>
);

export default MyCard;
