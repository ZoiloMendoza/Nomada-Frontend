import { Card, CardContent, CardMedia, Typography, IconButton, Button, Tooltip, DeleteIcon } from '@mui/material';
import { useState } from 'react';
import PopupForm from '../Search/PopupForm';
import { Add, Favorite, FavoriteBorder } from '@mui/icons-material';
import { useRouter } from 'next/router';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
const URLRAILWAY = process.env.NEXT_PUBLIC_BACKEND;

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

export default function DestinosFavoritos({ contentApi }) {
  // const [open, setOpen] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [editingDates, setEditingDates] = useState({});
  //const router = useRouter();
  //const { idRuta } = router.query;
  // const [showAlert, setShowAlert] = useState({});

  const handleClick = (location_id) => {
    const selectedRestaurant = contentApi.find((restaurant) => restaurant.location_id === location_id);
    setSelectedRestaurant(selectedRestaurant);
    setOpen(true);
  };

  const handleAddClick = (location_id) => {
    const selectedRestaurant = contentApi.find((restaurant) => restaurant.location_id === location_id);
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

  console.log(contentApi, 'mensaje por nosotros');

  const funcionOpen = () => {
    setOpenForm(true);
    setOpen(false);
  };
  const getImage = (restaurantImage) => {
    if (restaurantImage !== null && restaurantImage.fotos != '') {
      return restaurantImage?.fotos;
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
  const timer = () => {
    setTimeout(() => {
      setShowAlert({});
    }, 3000);
  };
  const handleFavoriteClick = async (location_id, cardIndex) => {
    const nextIsFavorite = !editingDates[cardIndex];
    const selectedActivity = activityData.find((activity) => activity.location_id === location_id);

    setEditingDates((prevEditingDates) => ({
      ...prevEditingDates,
      [cardIndex]: nextIsFavorite,
    }));
    if (nextIsFavorite) {
      console.log(nuevaActividad, 'peticion para guardar favorito');
    } else {
      try {
        const crearDestino = await axios.delete(`${URLRAILWAY}/api/v1/favoritos/${location_id}`);
        if (crearDestino.status === 200) console.log('----------Favorito eliminado--------');
      } catch (error) {
        console.log(error);
      }
    }
    setShowAlert((prevShowAlert) => ({
      ...prevShowAlert,
      [cardIndex]: true,
    }));
    timer();
    console.log('Favorite button clicked!');
  };
  return (
    <>
      {contentApi &&
        contentApi?.map((restaurant, index) => (
          <Card sx={styles.card} key={restaurant._id}>
            <CardMedia
              component='img'
              sx={styles.media}
              image={getImage(restaurant)}
              //image={restaurant?.data[0]?.images.small.url}
              //title={restaurant?.nombre}
            />
            <CardContent>
              <Typography gutterBottom variant='h5' component='h2'>
                {restaurant.nombre}
              </Typography>
              <Typography variant='body2' color='textSecondary' component='p'>
                {getAdress(restaurant.direccion)}
              </Typography>
            </CardContent>

            <Button
              sx={styles.button}
              size='small'
              variant='outlined'
              color='primary'
              onClick={() => {
                handleClick(restaurant?.locationId);
              }}
            >
              Ver detalles
            </Button>

            <IconButton
              sx={styles.addIcon}
              aria-label='Add to itinerary'
              onClick={() => {
                handleAddClick(restaurant?.locationId);
              }}
            >
              <Add />
            </IconButton>
            <IconButton
              sx={styles.iconButton}
              aria-label='favorite'
              onClick={() => handleFavoriteClick(restaurant?._id, index)}
            >
              {editingDates[index] ? <Favorite /> : <FavoriteBorder />}
            </IconButton>
          </Card>
        ))}

      {openForm && selectedRestaurant !== null && (
        <PopupForm data={selectedRestaurant} openForm={openForm} closeForm={closeForm} />
      )}
    </>
  );
}
