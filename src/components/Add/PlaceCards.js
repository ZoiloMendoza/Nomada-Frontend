import React from 'react';
import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import { Star, StarBorder } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';
//import Slider from 'react-slick';
import Carrusel from '../common/Carrusel';
//import 'slick-carousel/slick/slick.css';
//import 'slick-carousel/slick/slick-theme.css';

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 345,
    margin: 80,
  },
  media: {
    height: 140,
  },
  rating: {
    color: theme.palette.secondary.main,
    marginRight: theme.spacing(1),
  },
}));

function PlaceCards({ data }) {
  const classes = useStyles();

  return (
    <>
      <h2>Recomendaciones</h2>
      <Carrusel>
        {data.map((item) => (
          <Card className={classes.card} key={item.id}>
            <CardActionArea>
              <CardMedia className={classes.media} image={item.image} title={item.title} />
              <CardContent>
                <Typography gutterBottom variant='h5' component='h2'>
                  {item.title}
                </Typography>
                <Typography variant='body2' color='textSecondary' component='p'>
                  {item.description}
                </Typography>
                <div>
                  {[...Array(item.rating)].map((_, index) => (
                    <Star className={classes.rating} key={index} />
                  ))}
                  {[...Array(5 - item.rating)].map((_, index) => (
                    <StarBorder className={classes.rating} key={index} />
                  ))}
                </div>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Carrusel>
    </>
  );
}

export default PlaceCards;
