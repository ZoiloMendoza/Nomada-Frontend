import { useState, useEffect } from 'react';
import PopupBox from '../common/PopupBox';
import { styled } from '@mui/system';
import axios from 'axios';
import { IconButton } from '@mui/material';
import { Add, Favorite, FavoriteBorder } from '@mui/icons-material';
import CircularProgress from '@mui/material/CircularProgress';

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
    marginTop: '10px',
  },
  review: {
    marginBottom: '10px',
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

  return (
    <>
      <PopupBox open={open} onClose={handleClose}>
        {item && (
          <BoxItem key={item.location_id}>
            <CardMedia sx={styles.media} image={data?.data[0]?.images?.original?.url} />
            <CardContent>
              <Typography variant='h6' gutterBottom>
                {item?.name}
              </Typography>
              <Box display='flex' alignItems='center' mb={1}>
                {/*<Rating value={item.rating} precision={0.5} readOnly />*/}
                <Typography variant='body2' color='textSecondary' ml={1}>
                  ({item?.num_reviews} reviews)
                </Typography>
              </Box>
              <Typography variant='body1' gutterBottom>
                {item?.address_obj?.address_string}
              </Typography>
            </CardContent>
            <IconButton sx={styles.addIcon} aria-label='Add to itinerary' onClick={openForm}>
              <Add />
            </IconButton>
            <IconButton sx={styles.iconButton} aria-label='favorite' onClick={handleFavoriteClick}>
              {isFavorite ? <Favorite /> : <FavoriteBorder />}
            </IconButton>
            <Box sx={styles.reviewsContainer}>
              {/*item?.reviews?.map((review) => (
                    <Box key={review._id} sx={styles.review}>
                      <Typography variant='body1' gutterBottom>
                        {review.name}
                      </Typography>
                      <Typography variant='body2' color='textSecondary' gutterBottom>
                        {review.createdAt.substring(0, 10)}
                      </Typography>
                      <Rating value={review.rating} precision={0.5} readOnly />
                      <Typography variant='body1' gutterBottom>
                        {review.comment}
                      </Typography>
                    </Box>
                  ))*/}
            </Box>
          </BoxItem>
        )}
      </PopupBox>
    </>
  );
};

export default CardDetalleActivity;
