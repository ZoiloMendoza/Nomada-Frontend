import { Card, CardContent, CardMedia, Typography, IconButton, Button } from '@mui/material';
import Carrusel from '../common/Carrusel';
import { useState } from 'react';
import CardDetalle from './CardDetalle';
import PopupForm from './PopupForm';
import { Add, Favorite, FavoriteBorder } from '@mui/icons-material';

const styles = {
  card: {
    maxWidth: 345,
    margin: '0 80px',
  },
  media: {
    height: 140,
  },

  addIcon: {
    fontSize: '2rem',
  },
  favoriteIcon: {
    fontSize: '2rem',
  },
  button: {
    margin: '10px',
  },
};

function RestaurantCard({ restaurantData }) {
  const [open, setOpen] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleClick = (location_id) => {
    const selectedRestaurant = restaurantData.find((restaurant) => restaurant.location_id === location_id);
    setSelectedRestaurant(selectedRestaurant);
    setOpen(true);
  };

  const handleAddClick = (location_id) => {
    const selectedRestaurant = restaurantData.find((restaurant) => restaurant.location_id === location_id);
    setSelectedRestaurant(selectedRestaurant);
    setOpenForm(true);
    console.log('Add button clicked!');
  };

  const closeCard = () => {
    setOpen(false);
  };

  const closeForm = () => {
    setOpenForm(false);
  };

  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);
    console.log('Favorite button clicked!');
  };

  const funcionOpen = () => {
    setOpenForm(true);
    setOpen(false);
  }
  return (
    <>
      <h2 style={{ marginLeft: '30px' }}>Restaurantes</h2>
      <Carrusel>
        {restaurantData?.map((restaurant) => (
          <Card sx={styles.card} key={restaurant.location_id}>
            <CardMedia
              component="img"
              sx={styles.media}
              image={restaurant?.data[0]?.images.original.url}
              title={restaurant?.data[0]?.user.username}
            />
            <CardContent>
              <Typography gutterBottom variant='h5' component='h2'>
                {restaurant.name}
              </Typography>
              <Typography variant='body2' color='textSecondary' component='p'>
                {restaurant.address_obj.street1}
              </Typography>
            </CardContent>

            <Button
              sx={styles.button}
              size='small'
              variant='outlined'
              color='primary'
              onClick={() => {
                handleClick(restaurant.location_id);
              }}
            >
              Ver detalles
            </Button>

            <IconButton
              sx={styles.addIcon}
              aria-label='Add to itinerary'
              onClick={() => {
                handleAddClick(restaurant.location_id);
              }}
            >
              <Add />
            </IconButton>
            <IconButton sx={styles.iconButton} aria-label='favorite' onClick={handleFavoriteClick}>
              {isFavorite ? <Favorite /> : <FavoriteBorder />}
            </IconButton>
          </Card>
        ))}
      </Carrusel>
      {open && selectedRestaurant !== null && (
        <CardDetalle data={selectedRestaurant} open={open} closeCard={closeCard} categoria={'restaurant'} openForm={funcionOpen} />
      )}
      {openForm && selectedRestaurant !== null && (
        <PopupForm data={selectedRestaurant} openForm={openForm} closeForm={closeForm} />
      )}
    </>
  );
}

export default RestaurantCard;
