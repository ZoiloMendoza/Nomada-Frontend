import { Card, CardContent, CardMedia, Typography, IconButton, Button } from '@mui/material';
import Carrusel from '../common/Carrusel';
import { useState } from 'react';
import CardDetalleActivity from './cardDetalleActivity';
import PopupActivity from './PopupActivity';
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

function ActivityCard({ activityData }) {
  const actividades = activityData.rutas[0].actividades;
  const [open, setOpen] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [infoRuta, setinfoRuta] = useState([]);
  useEffect(() => {
    const getRuta = async () => {
      try {
        const get = await axios.get(
          `https://nomada-backend-production.up.railway.app/api/v1/actividades/${'6469267dbbcdff8d071aaa06'}`,
        );
        if (get) {
          console.log(get.status);
          setinfoRuta(get.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getRuta();
  }, []);
  const handleClick = (location_id) => {
    const selectedActivity = activityData.find((activity) => activity.location_id === location_id);
    setSelectedRestaurant(selectedActivity);
    setOpen(true);
  };

  const handleAddClick = (location_id) => {
    const selectedActivity = activityData.find((activity) => activity.location_id === location_id);
    setSelectedActivity(selectedActivity);
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

  return (
    <>
      <h2 style={{ marginLeft: '30px' }}>Actividades</h2>
      <Carrusel>
        {activityData?.map((activity) => (
          <Card sx={styles.card} key={activity.location_id}>
            <CardMedia
              sx={styles.media}
              image={activity?.data[0]?.images.original.url}
              title={activity?.data[0]?.user.username}
            />
            <CardContent>
              <Typography gutterBottom variant='h5' component='h2'>
                {activity.name}
              </Typography>
              <Typography variant='body2' color='textSecondary' component='p'>
                {activity.address_obj.street1}
              </Typography>
            </CardContent>

            <Button
              sx={styles.button}
              size='small'
              variant='outlined'
              color='primary'
              onClick={() => {
                handleClick(activity.location_id);
              }}
            >
              Ver detalles
            </Button>

            <IconButton
              sx={styles.addIcon}
              aria-label='Add to itinerary'
              onClick={() => {
                handleAddClick(activity.location_id);
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
        <CardDetalleActivity data={selectedActivity.data} open={open} closeCard={closeCard} />
      )}
      {openForm && selectedRestaurant !== null && (
        <PopupActivity data={selectedActivity} openForm={openForm} closeForm={closeForm} />
      )}
    </>
  );
}

export default ActivityCard;
