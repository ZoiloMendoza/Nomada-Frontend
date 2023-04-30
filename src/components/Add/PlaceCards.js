import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
// import '@/placeCards.css';
import { Card, CardActionArea, CardContent, CardMedia, Typography, makeStyles } from '@mui/material';
import { Star, StarBorder } from '@mui/icons-material';

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 345,
    margin: 80,
  },
  media: {
    height: 140,
  },
  rating: {
    color: theme.palette.secondary.main,
    marginRight: theme.spacing(1),
  },
}));

function PlaceCards({ data }) {
  const classes = useStyles();

  var settings = {
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

  return (
    <>
      <h2>Recomendaciones</h2>
      <Slider {...settings}>
        {data.map((item) => (
          <Card className={classes.card} key={item.id}>
            <CardActionArea>
              <CardMedia className={classes.media} image={item.image} title={item.title} />
              <CardContent>
                <Typography gutterBottom variant='h5' component='h2'>
                  {item.title}
                </Typography>
                <Typography variant='body2' color='textSecondary' component='p'>
                  {item.description}
                </Typography>
                <div>
                  {[...Array(item.rating)].map((_, index) => (
                    <Star className={classes.rating} key={index} />
                  ))}
                  {[...Array(5 - item.rating)].map((_, index) => (
                    <StarBorder className={classes.rating} key={index} />
                  ))}
                </div>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Slider>
    </>
  );
}

//console.log(data)

export default PlaceCards;
