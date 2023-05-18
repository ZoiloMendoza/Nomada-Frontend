//import React, { useState } from 'react';
import PopupBox from '../common/PopupBox';
import { styled } from '@mui/system';
import axios from 'axios';
import { Grid, Typography, CardMedia, CardContent, Box } from '@mui/material';
import { Rating } from '@mui/lab';
import { getData } from '@/pages/api/proxy/tripadvisor';
import { useState, useEffect } from 'react';
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

const CardDetalle = ({ data, open, closeCard }) => {
  // const [open, setOpen] = useState(false);
  const [item, setItem] = useState({});
  const handleClose = () => {
    closeCard();
  };
  useEffect(()=> {
    detallesRestaurant({data})
  }, [])
  const detallesRestaurant = async ({data}) => {
    try {
      const response = await getData({data})
      setItem(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  console.log('cardetalle info',data);
  console.log('detalles de la card',item);
  return (
    <>
      <PopupBox open={open} onClose={handleClose}>
        <Grid container>
          {data &&
              <GridItem>
                <CardMedia sx={styles.media} image={data?.data[0].images.original.url} />
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
                    {/*item?.address_obj.address_string*/}
                  </Typography>
                </CardContent>

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
              </GridItem>
            }
        </Grid>
      </PopupBox>
    </>
  );
};

export default CardDetalle;
