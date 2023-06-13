import React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';

const styles = {
  card: {
    display: 'flex',
    marginBottom: '5px',
  },
  media: {},
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
    <Card className={styles.card}>
      <Grid container>
        <Grid item xs={6}>
          <CardMedia sx={{ width: '100%' }} className={styles.media} component='img' image={fotos} title={nombre} />
        </Grid>
        <Grid item xs={6}>
          <CardContent className={styles.content}>
            <Typography variant='h6' className={styles.title}>
              {nombre}
            </Typography>
            <Typography variant='body2' className={styles.address}>
              {direccion}
            </Typography>
            {/* <Typography variant='body2' className={styles.description}>
          {description}
  </Typography> */}
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  );
};

export default CardComponent;
