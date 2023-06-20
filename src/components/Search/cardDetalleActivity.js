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
    maxHeight: '50vh',
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
  card: {},
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
    width: '90%',
  },

  closeButton: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    color: '#FFFFF',
  },
  reviewsContainer: {
    margin: '10px',
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
              <CardMedia sx={styles.media} image={data?.data[0]?.images?.original?.url} />
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
                  Ranking: <br /> {item?.ranking_data?.ranking_string}
                </Typography>
                <Typography variant='body1' gutterBottom>
                  Dirección: <br /> {item?.address_obj?.address_string}
                </Typography>

                <Typography variant='body1' gutterBottom>
                  Horarios: <br />
                  <div sx={{ display: 'flex' }}>
                    {item?.hours?.weekday_text &&
                      item.hours.weekday_text.map((day, index) => <p key={`day-${index}`}>{day}</p>)}
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
            <Box sx={styles.reviewsContainer}>
              <Typography variant='body1' gutterBottom>
                {item?.description}
              </Typography>
            </Box>
          </BoxItem>
        )}
      </PopupBox>
    </>
  );
};

export default CardDetalleActivity;
