import { useState, useEffect } from 'react';
import PopupBox from '../common/PopupBox';
import { styled } from '@mui/system';
import axios from 'axios';
import { IconButton } from '@mui/material';
import { Add, Favorite, FavoriteBorder } from '@mui/icons-material';
import CircularProgress from '@mui/material/CircularProgress';
import { Rating } from '@mui/material';

import { Typography, CardMedia, CardContent, Box } from '@mui/material';

const BoxItem = styled(Box)(({ theme }) => ({
  padding: '5px',
  [theme.breakpoints.down('sm')]: {
    maxHeight: '90vh',
    overflow: 'scroll',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    zIndex: 100,
    background: '#fff',
    borderTop: '1px solid #ccc',
    borderBottom: '1px solid #ccc',
    padding: '5px',
  },
}));

const styles = {
  card: {
    maxHeight: '90vh',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
    width: '100%',
  },

  closeButton: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    color: '#FFFFF',
  },
  reviewsContainer: {
    marginTop: '30vh',
    display: 'block',
    maxWidth: '300px',
    maxHeight: '90%',
    textOverflow: 'ellipsis',
  },
};

const CardDetalleActivity = ({ data, open, closeCard, openForm }) => {
  // const [open, setOpen] = useState(false);
  const [item, setItem] = useState({});
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);
    console.log('Favorite button clicked!');
  };

  const handleClose = () => {
    closeCard();
  };

  useEffect(() => {
    const fetchDetalles = async () => {
      const response = await axios.get(`/api/proxy/tripadvisor/${data.location_id}`);
      setItem(response.data);
      setLoading(false);
    };
    fetchDetalles();
  }, [data.location_id]);

  console.log('cardetalleActivity info', data);
  console.log('detallesActivity de la card', item);
  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  const getImage = (data) => {
    if (data.data !== null && data?.data?.length > 0) {
      return data?.data[0]?.images.small.url;
    }
    return '/img/placeholder.jpeg';
  };

  console.log(item.hours);

  return (
    <>
      <PopupBox open={open} onClose={handleClose}>
        {item && (
          <BoxItem
            key={item.location_id}
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '90%' }}
          >
            <Box sx={{ width: '50%', height: 300 }}>
              <CardMedia sx={styles.media} image={getImage(data)} />
              <CardContent>
                <Typography variant='h6' gutterBottom>
                  {item?.name}
                </Typography>
                <Box display='flex' alignItems='center' mb={1}>
                  <Rating value={item.rating} precision={0.5} readOnly />
                  <Typography variant='body2' color='textSecondary' ml={1}>
                    ({item?.num_reviews} reviews)
                  </Typography>
                </Box>
                <Typography variant='body2' color='textSecondary' gutterBottom>
                  <strong>Ranking:</strong> <br /> {item?.ranking_data?.ranking_string}
                </Typography>
                <Typography variant='body1' gutterBottom>
                  <strong>Dirección: </strong>
                  <br /> {item?.address_obj?.address_string}
                </Typography>

                <Typography variant='body1' gutterBottom>
                  <strong>Horarios:</strong> <br />
                  <div sx={{ display: 'flex', flexDirection: 'column' }}>
                    {(item?.hours?.weekday_text &&
                      item.hours.weekday_text.map((day, index) => (
                        <small key={`day-${index}`}>
                          {day} <br />
                        </small>
                      ))) ||
                      'Horarios no disponibles...'}
                  </div>
                </Typography>
              </CardContent>
              <IconButton sx={styles.addIcon} aria-label='Add to itinerary' onClick={openForm}>
                <Add />
              </IconButton>
              <IconButton sx={styles.iconButton} aria-label='favorite' onClick={handleFavoriteClick}>
                {isFavorite ? <Favorite /> : <FavoriteBorder />}
              </IconButton>
            </Box>
            <CardContent sx={styles.reviewsContainer}>
              <small
                variant='body1'
                gutterBottom
                sx={{
                  paddingTop: '20vh',
                  paddingBottom: '20vh',
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                }}
              >
                <strong> Descripción:</strong> <br />
                {item?.description || 'No hay ninguna descripción disponible por el momento...'}
              </small>
            </CardContent>
          </BoxItem>
        )}
      </PopupBox>
    </>
  );
};

export default CardDetalleActivity;
