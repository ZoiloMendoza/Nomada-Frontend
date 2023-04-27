import { useState } from 'react';
import { Card, CardHeader, CardMedia, CardContent, Typography, IconButton, Collapse } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ExpandMore } from "@material-ui/icons";
import { Edit as EditIcon, Delete as DeleteIcon } from '@material-ui/icons';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';

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
  

const ActivityCard = ({ activityData, handleEdit, handleDelete }) => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <>
    {activityData.map((activityData) => (
    <Card className={classes.card} key={activityData.id}>
        <IconButton aria-label="edit" onClick={() => handleEdit(activityInfo)}>
            <EditIcon />
          </IconButton>
          <IconButton aria-label="delete" onClick={() => handleDelete(activityInfo)}>
            <DeleteIcon />
          </IconButton>
        <Grid container spacing={2}>
          <Grid item xs={4}>
          <CardMedia
            className={classes.media}
            image={activityData.image}
            title={activityData.title}
          />
          </Grid>
          <Grid item xs={6}>
            <CardHeader
              title={activityData.title}
              subheader={activityData.subtitle}
            />
             <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {activityData.time}
        </Typography>
      </CardContent>
          </Grid>  
          <Grid item xs={2}>
            <LocalActivityIcon />
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
          <Typography paragraph>{activityData.description}</Typography>
        </CardContent>
      </Collapse>
    </Card>
     ))}
    </>
  );
};

export default ActivityCard;
