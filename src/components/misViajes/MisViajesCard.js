import React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

const MyCard = ({ image, title, subtitle, paragraph, button1, button2, button3 }) => (
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
      <Button variant='contained' color='primary' sx={{ marginTop: '5px' }}>
        {button1} Ver viaje
      </Button>
      <Button variant='contained' color='secondary' sx={{ marginTop: '5px' }}>
        {button2} Compartir viaje
      </Button>
      <Button variant='contained' sx={{ marginTop: '5px' }}>
        {button3} Eliminar Viaje
      </Button>
    </Grid>
  </Card>
);

export default MyCard;
