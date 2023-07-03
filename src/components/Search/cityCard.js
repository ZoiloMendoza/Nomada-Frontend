import React, { useState } from 'react';
import { styled } from '@mui/system';
import { Card, CardMedia, CardContent, Typography, IconButton } from '@mui/material';
import { Favorite, Add, FavoriteBorder } from '@mui/icons-material';
import Carrusel from '../common/Carrusel';
import PopupDestino from './PopupDestino';
import { SkeletonSearch } from '../SkeletonsCards/SkeletonSearch';
const RootCard = styled(Card)(({}) => ({
  maxWidth: 345,
  margin: '1rem',
  position: 'relative',
  transition: 'transform 0.3s',
  '&:hover': {
    transform: 'scale(1.05)',
  },
}));

const Media = styled(CardMedia)(({}) => ({
  width: '100%',
  //maxHeight: '30vh',
  maxHeight: '180px',
  margin: 'auto',
  objectFit: 'cover',
  overflow: 'hidden',
  transition: 'width 0.3s',
  '&:hover': {
    width: '100%',
  },
}));

const Content = styled(CardContent)(({}) => ({
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
}));

const IconButtonStyled = styled(IconButton)(({}) => ({
  color: '#FFF',
}));

const CityCard = ({ contentApi, view }) => {
  const [open, setOpen] = useState(false);
  const [selectedDestino, setSelectedDestino] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  const handleClick = (location_id) => {
    const selectedDestino = contentApi.find((item) => item.location_id === location_id);
    setSelectedDestino(selectedDestino);
    setOpen(true);
    console.log('Add button clicked!');
  };
  const getImage = (destinoImage) => {
    if (destinoImage.data !== null && destinoImage?.data.length > 0) {
      return destinoImage?.data[0]?.images.small.url;
    }
    return '/img/placeholder.jpeg';
  };

  const closeDestino = () => {
    setOpen(false);
  };

  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);
    console.log('Favorite button clicked!');
  };
  if(view){
    return;
  }
  return (
    <>
      <h2 style={{ marginLeft: '30px' }}>Destinos</h2>
      {contentApi ? <Carrusel>
        {contentApi
          && contentApi?.map((item) => (
              <RootCard key={item.location_id} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <Media component='img' image={getImage(item)} title={item.name} />
                {hovered && (
                  <Content>
                    <Typography variant='h5' gutterBottom>
                      {item.name}
                    </Typography>
                    <Typography variant='subtitle1' gutterBottom>
                      {item.address_obj.addres_string}
                    </Typography>
                    <IconButtonStyled
                      aria-label='add'
                      onClick={() => {
                        handleClick(item.location_id);
                      }}
                    >
                      <Add />
                    </IconButtonStyled>
                    <IconButtonStyled aria-label='favorite' onClick={handleFavoriteClick}>
                      {isFavorite ? <Favorite /> : <FavoriteBorder />}
                    </IconButtonStyled>
                  </Content>
                )}
              </RootCard>
            ))
        }
      </Carrusel> : <SkeletonSearch/>}
      {open && selectedDestino !== null && (
        <PopupDestino data={selectedDestino} open={open} closeDestino={closeDestino} categoria={'geos'} />
      )}
    </>
  );
};

export default CityCard;
