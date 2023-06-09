import { Card, CardContent, CardMedia, Typography, IconButton, Button, Box } from '@mui/material';
import Carrusel from '../common/Carrusel';
import { useState } from 'react';
import CardDetalle from './CardDetalle';
import PopupForm from './PopupForm';
import { Add, Favorite, FavoriteBorder } from '@mui/icons-material';

const styles = {
  card: {
    maxWidth: 345,
    minHeight: 196,
    margin: '80px 80px',
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
  console.log(restaurantData, 'mensaje por nosotros');
  const funcionOpen = () => {
    setOpenForm(true);
    setOpen(false);
  };
  const getImage = (restaurantImage) => {
    if (restaurantImage.data !== null && restaurantImage?.data?.length > 0) {
      return restaurantImage?.data[0]?.images.small.url;
    }
    return '/img/placeholder.jpeg';
  };
  const getAdress = (restaurantAdress) => {
    let address = '';
    if (restaurantAdress.street1 != undefined && restaurantAdress.street1 != '') {
      address = restaurantAdress.street1;
    } else if (restaurantAdress.address_string != undefined && restaurantAdress.address_string != '') {
      address = restaurantAdress.address_string;
    } else return '';

    const formatoRestaurant = address?.length < 40 ? address : `${address?.slice(0, 37)}...`;
    return formatoRestaurant;
  };
  return (
    <>
      <h2 style={{ marginLeft: '30px' }}>Restaurantes</h2>
      <Carrusel>
        {restaurantData?.map((restaurant) => (
          <Box sx={styles.card} key={restaurant.location_id}>
            <Card>
              <CardMedia
                component='img'
                sx={styles.media}
                image={getImage(restaurant)}
                //image={restaurant?.data[0]?.images.small.url}
                title={restaurant?.data[0]?.user.username}
              />
              <CardContent>
                <Typography gutterBottom variant='h5' component='h2'>
                  {restaurant.name}
                </Typography>
                <Typography variant='body2' color='textSecondary' component='p'>
                  {getAdress(restaurant.address_obj)}
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
          </Box>
        ))}
      </Carrusel>
      {open && selectedRestaurant !== null && (
        <CardDetalle
          data={selectedRestaurant}
          open={open}
          closeCard={closeCard}
          categoria={'restaurant'}
          openForm={funcionOpen}
        />
      )}
      {openForm && selectedRestaurant !== null && (
        <PopupForm data={selectedRestaurant} openForm={openForm} closeForm={closeForm} />
      )}
    </>
  );
}

export default RestaurantCard;
