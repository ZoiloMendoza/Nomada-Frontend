import { useState } from 'react';
import { Card, CardContent, Typography, Button, IconButton } from '@material-ui/core';
import { Edit as EditIcon, Delete as DeleteIcon } from '@material-ui/icons';

const HotelCard = ({ hotelName, hotelAddress, checkInDate, checkOutDate, totalPrice, handleEdit, handleDelete }) => {
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <Card>
      <CardContent>
      <div className={classes.editDeleteIcons}>
          <IconButton aria-label="edit" onClick={() => handleEdit(flightInfo)}>
            <EditIcon />
          </IconButton>
          <IconButton aria-label="delete" onClick={() => handleDelete(flightInfo)}>
            <DeleteIcon />
          </IconButton>
        </div>
        <Typography variant="h5">{hotelName}</Typography>
        <Typography variant="subtitle1">{hotelAddress}</Typography>
        <Typography variant="body1">Check-in: {checkInDate}</Typography>
        <Typography variant="body1">Check-out: {checkOutDate}</Typography>
        <Typography variant="h6">Total Price: ${totalPrice}</Typography>
        {!showDetails && (
          <Button variant="outlined" color="primary" onClick={toggleDetails}>
            Show Details
          </Button>
        )}
        {showDetails && (
          <>
            <Typography variant="h6">Reservation Details:</Typography>
            <Typography variant="body1">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eleifend, libero vel
              placerat venenatis, urna magna ultricies libero, nec pharetra velit odio eget ex.
              Donec efficitur varius nulla vel sagittis.
            </Typography>
            <Button variant="outlined" color="primary" onClick={toggleDetails}>
              Hide Details
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default HotelCard;
