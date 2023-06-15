import { useState, useEffect } from 'react';
import { Card, CardHeader, CardMedia, CardContent, Typography, IconButton, Collapse } from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import Tooltip from '@mui/material/Tooltip';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
const URLRAILWAY = process.env.NEXT_PUBLIC_BACKEND;
const styles = {
  card: {
    marginBottom: '10px',
    margin: 2,
    backgroundColor: '#FFFFFF',
    borderRight: '10px solid #FFE400 ',
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
  icon: {
    width: '50px',
    height: '50px',
    color: '#FFE400',
  },
};

const ActivityCard = ({ activityData, handleEdit }) => {
  const [expanded, setExpanded] = useState(false);
  const [status, setStatus] = useState('');
  const [activities, setActivities] = useState(null);
  useEffect(() => {
    setActivities(activityData);
  }, [activityData]);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const handleDelete = async (idActividad) => {
    try {
      if (idActividad) {
        await axios.delete(`${URLRAILWAY}/api/v1/actividades/${idActividad}`);
        setActivities(activities.filter((activity) => activity._id !== idActividad));
        //alert('Card eliminada');
        setStatus('success');
      }
    } catch (error) {
      console.log(error);
      setStatus('error');
    }
  };
  //console.log(activityData, 'activitiData');
  return (
    <>
      {activities &&
        activities?.map((activityData) => (
          <Card sx={styles.card} key={activityData?._id}>
            <Stack sx={{ width: '100%' }} autoHideDuration={5000} spacing={2}>
              {status === 'success' && (
                <Alert severity='success'>
                  <AlertTitle>Éxito</AlertTitle>
                  Actividad eliminada correctamente!
                </Alert>
              )}
              {status === 'error' && (
                <Alert severity='error'>
                  <AlertTitle>Error</AlertTitle>
                  Ocurrió un error.
                </Alert>
              )}
            </Stack>
            <Tooltip title='Editar esta actividad'>
              <IconButton aria-label='edit' onClick={() => handleEdit(activityInfo)}>
                <EditIcon
                  sx={{
                    width: '20px',
                    color: '#D2D2D2',
                  }}
                />
              </IconButton>
            </Tooltip>
            <Tooltip title='Eliminar esta actividad'>
              <IconButton aria-label='delete' onClick={() => handleDelete(activityData._id)}>
                <DeleteIcon
                  sx={{
                    width: '20px',
                    color: '#D2D2D2',
                  }}
                />
              </IconButton>
            </Tooltip>
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
                <LocalActivityIcon sx={styles.icon} />
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
