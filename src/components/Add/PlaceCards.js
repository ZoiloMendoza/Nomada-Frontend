import React from 'react';
import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import { Star, StarBorder } from '@mui/icons-material';

//import Slider from 'react-slick';
import Carrusel from '../common/Carrusel';
//import 'slick-carousel/slick/slick.css';
//import 'slick-carousel/slick/slick-theme.css';

import CardDetalle from '../Search/CardDetalle';
import { dataTwo } from './dataTwo';

const style = {
  card: {
    maxWidth: 345,
    margin: '0 80px',
  },
  media: {
    height: 140,
  },
  rating: {
    color: 'gray',
    marginRight: '10px',
  },
};

function PlaceCards({ data }) {
  return (
    <>
      <h2>Recomendaciones</h2>
      <Carrusel>
        {data.map((item) => (
          <Card sx={style.card} key={item.id}>
            <CardActionArea>
              <CardMedia sx={style.media} image={item.image} title={item.title} />
              <CardContent>
                <Typography gutterBottom variant='h5' component='h2'>
                  {item.title}
                </Typography>
                <Typography variant='body2' color='textSecondary' component='p'>
                  {item.description}
                </Typography>
                <div>
                  {[...Array(item.rating)].map((_, index) => (
                    <Star sx={style.rating} key={index} />
                  ))}
                  {[...Array(5 - item.rating)].map((_, index) => (
                    <StarBorder sx={style.rating} key={index} />
                  ))}
                </div>
              </CardContent>
            </CardActionArea>
            <CardDetalle data={dataTwo} />
          </Card>
        ))}
      </Carrusel>
    </>
  );
}

export default PlaceCards;
