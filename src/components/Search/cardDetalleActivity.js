import React, { useState } from 'react';
import PopupBox from '../common/PopupBox';
import { styled } from '@mui/system';

import { Grid, Typography, CardMedia, CardContent, Box, IconButton } from '@mui/material';
import { Rating } from '@mui/lab';
import { Add, Favorite, FavoriteBorder } from '@mui/icons-material';

const GridItem = styled(Grid)(({ theme }) => ({
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
  },
  addIcon: {
    fontSize: '2rem',
    color: '#FFFFFF',
  },
  favoriteIcon: {
    fontSize: '2rem',
    color: '#FFFFFF',
  },
  closeButton: {
    position: 'absolute',
    top: '10px',
    right: '10px',
  },
  reviewsContainer: {
    marginTop: '10px',
  },
  review: {
    marginBottom: '10px',
  },
};

const CardDetalleActivity = ({ data, open, closeCard }) => {
  // const [open, setOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleClose = () => {
    closeCard();
  };

  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);
    console.log('Favorite button clicked!');
  };

  console.log(data);

  return (
    <>
      <PopupBox open={open} onClose={handleClose}>
        <Grid container>
          {data &&
            data.map((item) => (
              <GridItem item key={item.location_id}>
                <CardMedia sx={styles.media} image={item.images.small.url} />
                <CardContent>
                  <Typography variant='h6' gutterBottom>
                    {item.name}
                  </Typography>
                  <Box display='flex' alignItems='center' mb={1}>
                    <Rating value={item.rating} precision={0.5} readOnly />
                    <Typography variant='body2' color='textSecondary' ml={1}>
                      ({item.numReviews} reviews)
                    </Typography>
                  </Box>
                  <Typography variant='body1' gutterBottom>
                    {item.address}
                  </Typography>
                  <IconButton sx={styles.addIcon} aria-label='Add to itinerary'>
                    <Add />
                  </IconButton>
                  <IconButton sx={styles.iconButton} aria-label='favorite' onClick={handleFavoriteClick}>
                    {isFavorite ? <Favorite /> : <FavoriteBorder />}
                  </IconButton>
                </CardContent>

                <Box sx={styles.reviewsContainer}>
                  {item?.reviews?.map((review) => (
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
                  ))}
                </Box>
              </GridItem>
            ))}
        </Grid>
      </PopupBox>
    </>
  );
};

export default CardDetalleActivity;
