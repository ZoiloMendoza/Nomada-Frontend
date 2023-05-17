import React, { useState } from 'react';
import { styled } from '@mui/system';
import { Card, CardMedia, CardContent, Typography, IconButton } from '@mui/material';
import { Favorite, Add, FavoriteBorder } from '@mui/icons-material';
import Carrusel from '../common/Carrusel';
import PopupDestino from './PopupDestino';

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
  maxHeight: '30vh',
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

const CityCard = ({ contentApi }) => {
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

  const handleClick = () => {
    const selectedDestino = item.find((item) => item.location_id === location_id);
    setSelectedDestino(selectedDestino);
    setOpen(true);
    console.log('Add button clicked!');
  };

  const closeDestino = () => {
    setOpen(false);
  };

  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);
    console.log('Favorite button clicked!');
  };

  return (
    <>
      <h2 style={{ marginLeft: '30px' }}>Destinos</h2>
      <Carrusel>
        {contentApi?.map((item) => (
          <RootCard key={item.location_id} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <Media component='img' image={item.data[0].images.original.url} title={item.name} />
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
        ))}
      </Carrusel>
      {open && selectedDestino !== null && (
        <PopupDestino data={selectedDestino} open={open} closeDestino={closeDestino} />
      )}
    </>
  );
};

export default CityCard;
