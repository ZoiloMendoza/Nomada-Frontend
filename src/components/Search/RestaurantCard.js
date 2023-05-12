import React from 'react';
import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
//import { Star, StarBorder } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';
//import Slider from 'react-slick';
import Carrusel from '../common/Carrusel';
import { useState } from 'react';
import CardDetalle from '../Add/CardDetalle';
//import { dataTwo } from '../Add/dataTwo';
//import { data } from '../Add/data';
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
  button: {
    backgroundColor: '#E91E62',
    color: '#FFFFFF',
    padding: '10px',
    borderRadius: '5px',
    border: 'none',
    margin: '10px',
  },
}));

function RestaurantCard({ restaurantData }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState();

  const handleClick = (location_id) => {
    const selectedRestaurant = restaurantData.filter((restaurant) => {
      if (location_id == restaurant.location_id) return restaurant;
    });
    setSelectedRestaurant(selectedRestaurant);
    console.log(selectedRestaurant);
    setOpen(true);
  };

  const closeCard = () => {
    setOpen(false);
  };

  return (
    <>
      <h2 style={{ marginLeft: '30px' }}>Restaurantes</h2>
      <Carrusel>
        {restaurantData.map((restaurantData) => (
          <Card className={classes.card} key={restaurantData.location_id}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image={restaurantData.data[0].images.original.url}
                title={restaurantData.data[0].user.username}
              />
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
            <button
              className={classes.button}
              onClick={() => {
                handleClick(restaurantData.location_id);
              }}
            >
              Ver detalles
            </button>
          </Card>
        ))}
      </Carrusel>
      {open && <CardDetalle data={selectedRestaurant} open={open} closeCard={closeCard} />}
    </>
  );
}

export default RestaurantCard;
