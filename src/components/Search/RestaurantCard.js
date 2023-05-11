import React from 'react';
import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
//import { Star, StarBorder } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';
//import Slider from 'react-slick';
import Carrusel from '../common/Carrusel';
import CardDetalle from '../Add/CardDetalle';
import { dataTwo } from '../Add/dataTwo';
//import 'slick-carousel/slick/slick.css';
//import 'slick-carousel/slick/slick-theme.css';

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 345,
    margin: '0 80px',
  },
  media: {
    height: 140,
  },
  rating: {
    color: theme.palette.secondary.main,
    marginRight: theme.spacing(1),
  },
}));

function RestaurantCard({ restaurantData }) {
  const classes = useStyles();

  return (
    <>
      <h2 style={{ marginLeft: '30px' }}>Restaurantes</h2>
      <Carrusel>
        {restaurantData.map((restaurantData) => (
          <Card className={classes.card} key={restaurantData.location_id}>
            <CardActionArea>
              <CardMedia className={classes.media} image={restaurantData.image} title={restaurantData.title} />
              <CardContent>
                <Typography gutterBottom variant='h5' component='h2'>
                  {restaurantData.name}
                </Typography>
                <Typography variant='body2' color='textSecondary' component='p'>
                  {restaurantData.address_obj.street1}
                </Typography>
                {/* <div>
                  {[...Array(restaurantData.rating)].map((_, index) => (
                    <Star className={classes.rating} key={index} />
                  ))}
                  {[...Array(5 - restaurantData.rating)].map((_, index) => (
                    <StarBorder className={classes.rating} key={index} />
                  ))}
                </div> */}
              </CardContent>
            </CardActionArea>
            <CardDetalle data={dataTwo} />
          </Card>
        ))}
      </Carrusel>
    </>
  );
}

export default RestaurantCard;
