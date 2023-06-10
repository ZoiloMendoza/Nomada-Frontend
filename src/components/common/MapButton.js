import React from 'react';
import Link from 'next/link';
import Button from '@mui/material/Button';
import MapIcon from '@mui/icons-material/Map';

const styles = {
  button: {
    width: '100%',
    maxWidth: 400,
    margin: '10px',
    backgroundColor: '#E91E63',
    color: '#FFFFFF',
    '&:hover': {
      backgroundColor: '#2B2E4A',
    },
  },
};

function MapButton() {
  return (
    <Link href='/mapa'>
      <Button variant='contained' sx={styles.button} startIcon={<MapIcon />}>
        Mapa
      </Button>
    </Link>
  );
}

export default MapButton;
