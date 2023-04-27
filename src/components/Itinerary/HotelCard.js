import { useState } from 'react';
import { Card, CardContent, Typography, Button, IconButton } from '@material-ui/core';
import { Edit as EditIcon, Delete as DeleteIcon } from '@material-ui/icons';
import HotelIcon from '@mui/icons-material/Hotel';

import Grid from '@mui/material/Grid';


const HotelCard = ({ hotelData, handleEdit, handleDelete }) => {
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <>
    {hotelData.map((hotelData) => (
    <Card key={hotelData.id}>
      <CardContent>
      <div >
          <IconButton aria-label="edit" onClick={() => handleEdit(hotelInfo)}>
            <EditIcon />
          </IconButton>
          <IconButton aria-label="delete" onClick={() => handleDelete(hotelInfo)}>
            <DeleteIcon />
          </IconButton>
        </div>
        <Grid container spacing={2}>
          <Grid item  xs={10}>
            <Typography variant="h5">{hotelData.name}</Typography>
            <Typography variant="subtitle1">{hotelData.address}</Typography>
            <Typography variant="body1">Check-in: {hotelData.checkIn}</Typography>
            <Typography variant="body1">Check-out: {hotelData.checkOut}</Typography>
          </Grid>
          <Grid item  xs={2}>
            <HotelIcon/>
          </Grid>
        </Grid>
        
        {!showDetails && (
          <Button variant="outlined" color="primary" onClick={toggleDetails}>
            Mostrar detalles
          </Button>
        )}
        {showDetails && (
          <>
            <Typography variant="h6">Precio Total: ${hotelData.totalPrice}</Typography>
            <Typography variant="h6">Número de reservación:</Typography>
            <Typography variant="body1">
              {hotelData.reservation}
            </Typography>
            <Button variant="outlined" color="primary" onClick={toggleDetails}>
              Ocultar detalles
            </Button>
          </>
        )}
      </CardContent>
    </Card>
    ))}
    </>
  );
};

export default HotelCard;
