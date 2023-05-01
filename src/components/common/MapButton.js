import React from 'react';
import { Link } from 'next/link';
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';
import MapIcon from '@mui/icons-material/Map';

const useStyles = makeStyles((theme) => ({
  button: {
    width: '100%',
    maxWidth: 400,
    margin: theme.spacing(2, 0),
    backgroundColor: '#E91E63',
    color: '#FFFFFF',
    '&:hover': {
      backgroundColor: '#2B2E4A',
    },
  },
}));

export default function MapButton() {
  const classes = useStyles();

  return (
    <Link href='/map'>
      <Button variant='contained' className={classes.button} startIcon={<MapIcon />}>
        Mapa
      </Button>
    </Link>
  );
}
