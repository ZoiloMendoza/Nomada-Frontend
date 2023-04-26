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

const useStyles = makeStyles((theme) => ({
  card: {
    marginBottom: theme.spacing(2),
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

const FlightCard = ({ flight, handleEdit, handleDelete }) => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.card}>
        <div className={classes.editDeleteIcons}>
          <IconButton aria-label="edit" onClick={() => handleEdit(flightInfo)}>
            <EditIcon />
          </IconButton>
          <IconButton aria-label="delete" onClick={() => handleDelete(flightInfo)}>
            <DeleteIcon />
          </IconButton>
        </div>
      <CardHeader
        title={`${flight.origin} to ${flight.destination}`}
        subheader={`${flight.date} | ${flight.airline}`}
      />
      <CardContent>
        <Typography variant="h6" component="p">
          {`${flight.departureTime} - ${flight.arrivalTime}`}
        </Typography>
        <Typography variant="subtitle1" component="p">
          {`${flight.duration} | ${flight.stops}`}
        </Typography>
      </CardContent>
      <IconButton
        className={`${classes.expandIcon} ${
          expanded ? classes.expandIconOpen : ""
        }`}
        onClick={handleExpandClick}
        aria-expanded={expanded}
        aria-label="show more"
      >
        <ExpandMore />
      </IconButton>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography variant="subtitle1" component="p">
            {`Status: ${flight.status}`}
          </Typography>
          <Typography variant="subtitle1" component="p">
            {`Flight Number: ${flight.flightNumber}`}
          </Typography>
          <Typography variant="subtitle1" component="p">
            {`Terminal: ${flight.terminal}`}
          </Typography>
          <Typography variant="subtitle1" component="p">
            {`Gate: ${flight.gate}`}
          </Typography>
          <Typography variant="subtitle1" component="p">
            {`Class: ${flight.class}`}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default FlightCard;
