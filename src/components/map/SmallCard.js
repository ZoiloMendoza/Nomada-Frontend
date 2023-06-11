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

const SmallCard = ({ card }) => {
  const { image, name } = card;

  return (
    <Card className={styles.card}>
      <CardMedia className={styles.media} image={image} title={name} />
      <Typography variant='subtitle1' className={styles.title}>
        {name}
      </Typography>
    </Card>
  );
};

export default SmallCard;
