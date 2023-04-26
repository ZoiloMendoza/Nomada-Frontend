import { useState } from 'react';
import { Card, CardHeader, CardMedia, CardContent, Typography, IconButton, Collapse } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ExpandMore as ExpandMoreIcon } from '@material-ui/icons';
import { Edit as EditIcon, Delete as DeleteIcon } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 345,
    margin: theme.spacing(2),
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
}));

const ActivityCard = ({ title, subtitle, image, description, handleEdit, handleDelete }) => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.card}>
        <IconButton aria-label="edit" onClick={() => handleEdit(flightInfo)}>
            <EditIcon />
          </IconButton>
          <IconButton aria-label="delete" onClick={() => handleDelete(flightInfo)}>
            <DeleteIcon />
          </IconButton>
      <CardHeader
        title={title}
        subheader={subtitle}
      />
      <CardMedia
        className={classes.media}
        image={image}
        title={title}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {description.substring(0, 100)}...
        </Typography>
      </CardContent>
      <IconButton
        className={expanded ? classes.expandOpen : classes.expand}
        onClick={handleExpandClick}
        aria-expanded={expanded}
        aria-label="show more"
      >
        <ExpandMoreIcon />
      </IconButton>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>{description}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default ActivityCard;
