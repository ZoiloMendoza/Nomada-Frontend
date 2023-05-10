import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import { Card, CardMedia, CardContent, Typography, IconButton } from '@mui/material';
import { Favorite, Add, FavoriteBorder } from '@mui/icons-material';
import Carrusel from '../common/Carrusel';
//import Slider from 'react-slick';
//import 'slick-carousel/slick/slick.css';
//import 'slick-carousel/slick/slick-theme.css';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    margin: '1rem',
    position: 'relative',
    transition: 'transform 0.3s',
    '&:hover': {
      transform: 'scale(1.05)',
    },
  },
  media: {
    width: '100%',
    margin: 'auto',
    transition: 'width 0.3s',
    '&:hover': {
      width: '100%',
    },
  },
  content: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    color: 'white',
    width: '100%',
    padding: '1rem',
    transition: 'opacity 0.3s',
    opacity: 0,
    '&:hover': {
      opacity: 1,
    },
  },
  iconButton: {
    color: '#FFF',
  },
});

const CityCard = ({ cityData }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const classes = useStyles();
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  const handleClick = () => {
    console.log('Add button clicked!');
  };

  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);
    console.log('Favorite button clicked!');
  };

  console.log(cityData);
  return (
    <>
      <h2>Destinos</h2>
      <Carrusel>
        {cityData === undefined || cityData.length === 0 ? (
          <div> vacío </div>
        ) : (
          cityData.map((cityData) => (
            <Card
              className={classes.root}
              key={cityData.location_id}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <CardMedia component='img' className={classes.media} image={cityData.image} title={cityData.title} />
              <CardContent className={classes.content}>
                {hovered && (
                  <>
                    <Typography className={classes.title} variant='h5' gutterBottom>
                      {cityData.name}
                    </Typography>
                    <Typography className={classes.subtitle} variant='subtitle1' gutterBottom>
                      {cityData.address_obj.state}
                    </Typography>

                    <IconButton className={classes.iconButton} aria-label='add' onClick={handleClick}>
                      <Add />
                    </IconButton>
                    <IconButton className={classes.iconButton} aria-label='favorite' onClick={handleFavoriteClick}>
                      {isFavorite ? <Favorite /> : <FavoriteBorder />}
                    </IconButton>
                  </>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </Carrusel>
    </>
  );
};

export default CityCard;
