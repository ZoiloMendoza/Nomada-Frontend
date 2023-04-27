import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, CardMedia, Typography, IconButton, Collapse } from '@material-ui/core';
import { Edit as EditIcon, Delete as DeleteIcon } from '@material-ui/icons';
import { ExpandMore } from "@material-ui/icons";
import HotelIcon from '@mui/icons-material/Hotel';

import Grid from '@mui/material/Grid';

const useStyles = makeStyles((theme) => ({
  card: {
    marginBottom: theme.spacing(2),
    margin: 2,
  },
  media: {
    maxHeight: 300,
    paddingTop: '56.25%', // 16:9
  },
  expandIcon: {
    transform: "rotate(0deg)",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandIconOpen: {
    transform: "rotate(180deg)",
  },
}));


const HotelCard = ({ hotelData, handleEdit, handleDelete }) => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <>
    {hotelData.map((hotelData) => (
    <Card className={classes.card} key={hotelData.id}>
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
        <Grid item xs={4}>
          <CardMedia
            className={classes.media}
            image={hotelData.image}
            title={hotelData.title}
          />
          </Grid>
          <Grid item  xs={6}>
            <Typography variant="h5">{hotelData.name}</Typography>
            <Typography variant="subtitle1">{hotelData.address}</Typography>
            <Typography variant="body1">Check-in: {hotelData.checkIn}</Typography>
            <Typography variant="body1">Check-out: {hotelData.checkOut}</Typography>
          </Grid>
          <Grid item  xs={2}>
            <HotelIcon/>
          </Grid>
        </Grid>
        
        <IconButton
        className={`${classes.expandIcon} ${
          expanded ? classes.expandIconOpen : ""
        }`}
        onClick={handleExpandClick}
        aria-expanded={expanded}
        aria-label="mostrar más"
      >
        <ExpandMore />
      </IconButton>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
            <Typography variant="h6">Precio Total: ${hotelData.totalPrice}</Typography>
            <Typography variant="h6">Número de reservación:</Typography>
            <Typography variant="body1">
              {hotelData.reservation}
            </Typography>
            </CardContent>
      </Collapse>
      </CardContent>
    </Card>
    ))}
    </>
  );
};

export default HotelCard;
