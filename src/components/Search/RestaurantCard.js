import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import Carrusel from '../common/Carrusel';
import { useState } from 'react';
import CardDetalle from './CardDetalle';

const styles = {
  card: {
    maxWidth: 345,
    margin: '0 80px',
  },
  media: {
    height: 140,
  },
  button: {
    backgroundColor: '#E91E62',
    color: '#FFFFFF',
    padding: '10px',
    borderRadius: '5px',
    border: 'none',
    margin: '10px',
  },
};

function RestaurantCard({ restaurantData }) {
  const [open, setOpen] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  const handleClick = (location_id) => {
    const selectedRestaurant = restaurantData.find((restaurant) => restaurant.location_id === location_id);
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
        {restaurantData.map((restaurant) => (
          <Card sx={styles.card} key={restaurant.location_id}>
            <CardActionArea>
              <CardMedia
                sx={styles.media}
                image={restaurant.data[0].images.original.url}
                title={restaurant.data[0].user.username}
              />
              <CardContent>
                <Typography gutterBottom variant='h5' component='h2'>
                  {restaurant.name}
                </Typography>
                <Typography variant='body2' color='textSecondary' component='p'>
                  {restaurant.address_obj.street1}
                </Typography>
              </CardContent>
            </CardActionArea>
            <button
              style={styles.button}
              onClick={() => {
                handleClick(restaurant.location_id);
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
