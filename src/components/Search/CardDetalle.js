//import React, { useState } from 'react';
import PopupBox from '../common/PopupBox';
import { styled } from '@mui/system';
import axios from 'axios';
import { Grid, Typography, CardMedia, CardContent, Box } from '@mui/material';
import { Rating } from '@mui/lab';
//import { getData } from '@/pages/api/proxy/tripadvisor/[id]';
import { useState, useEffect } from 'react';
//import List from '@mui/material/List';
//import ListItem from '@mui/material/ListItem';
//import ListItemText from '@mui/material/ListItemText';
import CircularProgress from '@mui/material/CircularProgress';
import { IconButton } from '@mui/material';

import { Add, Favorite, FavoriteBorder } from '@mui/icons-material';

const GridItem = styled(Grid)(({ theme }) => ({
  padding: '5px',
  [theme.breakpoints.down('sm')]: {
    maxHeight: '50vh',
    maxWidth: '90vh',
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
    width: '90%',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },

  closeButton: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    color: '#FFFFF',
  },
  reviewsContainer: {
    padding: '15px',
  },
};

const CardDetalle = ({ data, open, closeCard, openForm }) => {
  // const [open, setOpen] = useState(false);
  const [item, setItem] = useState({});
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleClose = () => {
    closeCard();
  };
  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);
    console.log('Favorite button clicked!');
  };
  useEffect(() => {
    const fetchDetalles = async () => {
      const response = await axios.get(`/api/proxy/tripadvisor/${data.location_id}`);
      setItem(response.data);
      setLoading(false);
    };
    fetchDetalles();
  }, [data.location_id]);

  console.log('cardetalle info', data);
  console.log('detalles de la card', item);
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
        <Grid container>
          {item && (
            <GridItem sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '90%' }}>
              <Box>
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

                  <Typography variant='body1' gutterBottom>
                    {item?.description}
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
                <Typography variant='body2' color='textSecondary' gutterBottom>
                  Ranking: <br /> {item?.ranking_data?.ranking_string}
                </Typography>
                <Typography variant='body1' gutterBottom>
                  Dirección: <br /> {item?.address_obj?.address_string}
                </Typography>

                <Typography variant='body1' gutterBottom>
                  Horarios: <br /> {item?.hours?.weekday_text}
                </Typography>
              </Box>
            </GridItem>
          )}
        </Grid>
      </PopupBox>
    </>
  );
};

export default CardDetalle;
