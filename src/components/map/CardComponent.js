import React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const styles = {
  card: {
    marginBottom: '5px',
  },
  media: {
    width: '100%',
    height: '25vh',
    overflow: 'cover',
  },
  content: {
    flex: 1,
    paddingLeft: '5px',
  },
  title: {
    fontWeight: 'bold',
  },
  address: {
    color: '#2B2E4A',
    marginBottom: '5px',
  },
  description: {
    color: '#D2D2D2',
  },
};

const CardComponent = ({ actividad }) => {
  const { fotos, nombre, direccion } = actividad;

  return (
    <Card sx={styles.card}>
      <CardMedia sx={styles.media} component='img' image={fotos} title={nombre} />
      <CardContent sx={styles.content}>
        <Typography variant='h6' sx={styles.title}>
          {nombre}
        </Typography>
        <Typography variant='body2' sx={styles.address}>
          {direccion}
        </Typography>
        {/* <Typography variant='body2' className={styles.description}>
          {description}
  </Typography> */}
      </CardContent>
    </Card>
  );
};

export default CardComponent;
