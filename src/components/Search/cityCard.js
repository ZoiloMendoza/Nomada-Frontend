import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import { Card, CardMedia, CardContent, Typography, IconButton } from '@mui/material';
import { Favorite, Add } from '@mui/icons-material';
import Slider from 'react-slick';
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
    height: 0,
    paddingTop: '56.25%', // 16:9
    width: '50%',
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
});

const settings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 4,
  initialSlide: 0,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

const CityCard = ({ cityData }) => {
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
    console.log('Favorite button clicked!');
  };

  return (
    <>
      <h2>Destinos</h2>
      <Slider {...settings}>
        {cityData.map((cityData) => (
          <Card
            className={classes.root}
            key={cityData.id}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <CardMedia component='img' className={classes.media} image={cityData.image} title={cityData.title} />
            <CardContent className={classes.content}>
              {hovered && (
                <>
                  <Typography className={classes.title} variant='h5' gutterBottom>
                    {cityData.title}
                  </Typography>
                  <Typography className={classes.subtitle} variant='subtitle1' gutterBottom>
                    {cityData.subtitle}
                  </Typography>

                  <IconButton className={classes.iconButton} aria-label='add' onClick={handleClick}>
                    <Add />
                  </IconButton>
                  <IconButton className={classes.iconButton} aria-label='favorite' onClick={handleFavoriteClick}>
                    <Favorite />
                  </IconButton>
                </>
              )}
            </CardContent>
          </Card>
        ))}
      </Slider>
    </>
  );
};

export default CityCard;
