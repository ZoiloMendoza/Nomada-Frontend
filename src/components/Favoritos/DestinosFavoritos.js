import { Card, CardContent, CardMedia, Typography, IconButton, Button, Tooltip, DeleteIcon } from '@mui/material';
import { useState } from 'react';
import PopupForm from '../Search/PopupForm';
import { Add } from '@mui/icons-material';

const styles = {
  card: {
    maxWidth: 345,
    height: '350px',
    margin: '0 80px',
    padding: '10px',
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

function DestinosFavoritos({ restaurantData }) {
  const [open, setOpen] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

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

  const handleDelete = async (id, index) => {
    try {
      if (id) {
        await axios.delete(`${URLRAILWAY}/api/v1/hospedajes/${id}`);
        setStatuses((prevStatuses) => ({ ...prevStatuses, [index]: 'success' }));
        setHotelData((prevData) => prevData.filter((hotel) => hotel._id !== id));
        setCardEliminada('Hotel');
      }
    } catch (error) {
      console.log(error);
      setStatuses((prevStatuses) => ({ ...prevStatuses, [index]: 'error' }));
    }
  };
  return (
    <>
      <h2 style={{ marginLeft: '30px' }}>Destinos</h2>

      {restaurantData?.map((restaurant) => (
        <Card sx={styles.card} key={restaurant.location_id}>
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
          <Tooltip title='Eliminar este hospedaje'>
            <IconButton aria-label='delete' onClick={() => handleDelete(hotelData._id, index)}>
              <DeleteIcon
                sx={{
                  width: '20px',
                  color: '#D2D2D2',
                }}
              />
            </IconButton>
          </Tooltip>
        </Card>
      ))}

      {openForm && selectedRestaurant !== null && (
        <PopupForm data={selectedRestaurant} openForm={openForm} closeForm={closeForm} />
      )}
    </>
  );
}

export default DestinosFavoritos;
