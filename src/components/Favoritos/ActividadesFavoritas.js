import { Card, CardContent, CardMedia, Typography, IconButton, Button } from '@mui/material';
import Carrusel from '../common/Carrusel';
import { useState } from 'react';
import PopupActivity from './PopupActivity';
import { Add, Tooltip, DeleteIcon } from '@mui/icons-material';

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

function ActividadesFavoritas({ activityData }) {
  //const actividades = activityData.rutas[0].actividades;
  const [open, setOpen] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);

  //const [infoRuta, setinfoRuta] = useState([]);

  const handleClick = (location_id) => {
    const selectedActivity = activityData.find((activity) => activity.location_id === location_id);
    setSelectedActivity(selectedActivity);
    setOpen(true);
  };

  console.log(activityData);

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
  const funcionOpen = () => {
    setOpenForm(true);
    setOpen(false);
  };
  const getImage = (activityImage) => {
    if (activityImage.data !== null && activityImage?.data?.length > 0) {
      return activityImage?.data[0]?.images.small.url;
    }
    return '/img/placeholder.jpeg';
  };
  const getAdress = (activityAdress) => {
    let address = '';
    if (activityAdress.street1 != undefined && activityAdress.street1 != '') {
      address = activityAdress.street1;
    } else if (activityAdress.address_string != undefined && activityAdress.address_string != '') {
      address = activityAdress.address_string;
    } else return '';
    const formatoActivity = address?.length < 40 ? address : `${address?.slice(0, 37)}...`;
    return formatoActivity;
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
      <h2 style={{ marginLeft: '30px' }}>Actividades</h2>
      <Carrusel>
        {activityData?.map((activity) => (
          <Card sx={styles.card} key={activity.location_id}>
            <CardMedia
              sx={styles.media}
              image={getImage(activity)}
              //  title={activity?.data[0]?.user.username}
            />
            <CardContent>
              <Typography gutterBottom variant='h5' component='h2'>
                {activity.name}
              </Typography>
              <Typography variant='body2' color='textSecondary' component='p'>
                {getAdress(activity.address_obj)}
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
      </Carrusel>
      {open && selectedActivity !== null && (
        <CardDetalleActivity
          data={selectedActivity}
          open={open}
          openForm={funcionOpen}
          categoria={'attraction'}
          closeCard={closeCard}
        />
      )}
      {openForm && selectedActivity !== null && (
        <PopupActivity data={selectedActivity} openForm={openForm} closeForm={closeForm} />
      )}
    </>
  );
}

export default ActividadesFavoritas;
