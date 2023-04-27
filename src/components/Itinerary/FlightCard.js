import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Collapse,
  IconButton,
  makeStyles,
} from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";
import { Edit as EditIcon, Delete as DeleteIcon } from '@material-ui/icons';
import FlightIcon from '@mui/icons-material/Flight';

import Grid from '@mui/material/Grid';



const useStyles = makeStyles((theme) => ({
  card: {
    marginBottom: theme.spacing(2),
    margin: 2,
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

const FlightCard = ({ flightData, handleEdit, handleDelete }) => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <>
    {flightData.map((flightData) => (
    <Card className={classes.card} key={flightData.id}>
        <div className={classes.editDeleteIcons}>
          <IconButton aria-label="edit" onClick={() => handleEdit(flightInfo)}>
            <EditIcon />
          </IconButton>
          <IconButton aria-label="delete" onClick={() => handleDelete(flightInfo)}>
            <DeleteIcon />
          </IconButton>
        </div>
        <Grid container spacing={2}>
          <Grid item xs={10}>
      <CardHeader
        title={`${flightData.origin} a ${flightData.destination}`}
        subheader={`${flightData.date} | ${flightData.airline}`}
      /></Grid>
      <Grid item xs={2}>
      <FlightIcon />
      </Grid>
      </Grid>
      <CardContent>
        <Typography variant="h6" component="p">
          {`${flightData.departureTime} - ${flightData.arrivalTime}`}
        </Typography>
        <Typography variant="subtitle1" component="p">
          {`duración: ${flightData.duration} | escalas: ${flightData.stops}`}
        </Typography>
      </CardContent>
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
          <Typography variant="subtitle1" component="p">
            {`Status: ${flightData.status}`}
          </Typography>
          <Typography variant="subtitle1" component="p">
            {`Número de vuelo: ${flightData.flightNumber}`}
          </Typography>
          <Typography variant="subtitle1" component="p">
            {`Terminal: ${flightData.terminal}`}
          </Typography>
          <Typography variant="subtitle1" component="p">
            {`Puerta: ${flightData.gate}`}
          </Typography>
          <Typography variant="subtitle1" component="p">
            {`Clase: ${flightData.class}`}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
    ))}
    </>
  );

};

export default FlightCard;
