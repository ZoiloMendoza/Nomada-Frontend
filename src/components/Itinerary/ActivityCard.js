import { useState } from 'react';
import { Card, CardHeader, CardMedia, CardContent, Typography, IconButton, Collapse } from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';

import Grid from '@mui/material/Grid';

const styles = {
  card: {
    marginBottom: '10px',
    margin: 2,
  },
  media: {
    maxHeight: 300,
    paddingTop: '56.25%', // 16:9
  },
  expandIcon: {
    transform: 'rotate(0deg)',
    transition: '0.3s ease',
  },
  expandIconOpen: {
    transform: 'rotate(180deg)',
  },
};

const ActivityCard = ({ activityData, handleEdit, handleDelete }) => {
  const [expanded, setExpanded] = useState(false);
  console.log(activityData)
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      {activityData?.map((activityData) => (
        <Card sx={styles.card} key={activityData?._id}>
          <IconButton aria-label='edit' onClick={() => handleEdit(activityInfo)}>
            <EditIcon
              sx={{
                width: '20px',
                color: '#D2D2D2',
              }}
            />
          </IconButton>
          <IconButton aria-label='delete' onClick={() => handleDelete(activityInfo)}>
            <DeleteIcon
              sx={{
                width: '20px',
                color: '#D2D2D2',
              }}
            />
          </IconButton>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <CardMedia sx={styles.media} image={activityData?.fotos} title={activityData?.nombre} />
            </Grid>
            <Grid item xs={6}>
              <CardHeader title={activityData?.nombre} subheader={activityData?.direccion} />
              <CardContent>
                <Typography variant='body2' color='textSecondary' component='p'>
                  {activityData?.fechaInicio}
                </Typography>
              </CardContent>
            </Grid>
            <Grid item xs={2}>
              <LocalActivityIcon />
            </Grid>
          </Grid>

          <IconButton
            className={`${styles.expandIcon} ${expanded ? styles.expandIconOpen : ''}`}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label='mostrar más'
          >
            <ExpandMore />
          </IconButton>
          <Collapse in={expanded} timeout='auto' unmountOnExit>
            <CardContent>
              <Typography paragraph>{activityData?.direccion}</Typography>
            </CardContent>
          </Collapse>
        </Card>
      ))}
    </>
  );
};

export default ActivityCard;
