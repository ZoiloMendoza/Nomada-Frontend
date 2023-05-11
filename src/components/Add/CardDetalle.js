import React, { useState } from 'react';
import PopupBox from '../common/PopupBox';

import { makeStyles } from '@mui/styles';
import { Grid, Typography, Card, CardMedia, CardContent, Box, IconButton } from '@mui/material';
import { Rating } from '@mui/lab';
import { Add, Favorite, FavoriteBorder } from '@mui/icons-material';

const useStyles = makeStyles((theme) => ({
  gridItem: {
    padding: theme.spacing(5),
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
      padding: theme.spacing(4),
    },
  },
  card: {
    maxHeight: '50%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  addIcon: {
    fontSize: '2rem',
    color: theme.palette.primary.main,
  },
  favoriteIcon: {
    fontSize: '2rem',
    color: theme.palette.secondary.main,
  },
  closeButton: {
    position: 'absolute',
    top: theme.spacing(2),
    right: theme.spacing(2),
  },
  reviewsContainer: {
    marginTop: theme.spacing(2),
  },
  review: {
    marginBottom: theme.spacing(2),
  },
  button: {
    backgroundColor: '#E91E62',
    color: '#FFFFFF',
    padding: '10px',
    borderRadius: '5px',
    border: 'none',
    margin: '10px',
  },
}));

const CardDetalle = ({ data }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);
    console.log('Favorite button clicked!');
  };

  return (
    <>
      <button className={classes.button} onClick={handleClick}>
        Ver detalles
      </button>
      <PopupBox open={open} onClose={handleClose}>
        <Grid container>
          {data.map((item) => (
            <Grid item className={classes.gridItem} key={item.id}>
              <Card className={classes.card}>
                <CardMedia className={classes.media} image={item.image} title={item.name} />
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
                  <IconButton className={classes.addIcon} aria-label='Add to itinerary'>
                    <Add />
                  </IconButton>
                  <IconButton className={classes.iconButton} aria-label='favorite' onClick={handleFavoriteClick}>
                    {isFavorite ? <Favorite /> : <FavoriteBorder />}
                  </IconButton>
                </CardContent>
              </Card>
              <Box className={classes.reviewsContainer}>
                {item.reviews.map((review) => (
                  <Box key={review._id} className={classes.review}>
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
            </Grid>
          ))}
        </Grid>
      </PopupBox>
    </>
  );
};

export default CardDetalle;
