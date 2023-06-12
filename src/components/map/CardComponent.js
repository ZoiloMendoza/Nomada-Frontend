import React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const styles = {
  card: {
    display: 'flex',
    marginBottom: '5px',
  },
  media: {
    width: 200,
    height: 200,
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

const CardComponent = ({ card }) => {
  const { image, name, address, description } = card;

  return (
    <Card className={styles.card}>
      <CardMedia className={styles.media} image={image} title={name} />
      <CardContent className={styles.content}>
        <Typography variant='h6' className={styles.title}>
          {name}
        </Typography>
        <Typography variant='body2' className={styles.address}>
          {address}
        </Typography>
        <Typography variant='body2' className={styles.description}>
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CardComponent;