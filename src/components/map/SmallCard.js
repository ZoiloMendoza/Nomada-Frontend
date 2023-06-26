import React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

const styles = {
  card: {
    marginBottom: '5px',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9 aspect ratio
  },
  title: {
    marginTop: '5px',
    fontWeight: 'bold',
  },
};

const SmallCard = ({ actividad }) => {
  const { fotos, nombre, direccion } = actividad;

  return (
    <Card className={styles.card}>
      <CardMedia className={styles.media} image={fotos} title={nombre} />
      <Typography variant='subtitle1' className={styles.title}>
        {nombre}
      </Typography>
      <Typography variant='subtitle2'>{direccion}</Typography>
    </Card>
  );
};

export default SmallCard;
