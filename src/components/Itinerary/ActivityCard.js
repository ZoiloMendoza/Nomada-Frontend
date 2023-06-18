import { useState, useEffect } from 'react';
import { Card, CardHeader, CardMedia, CardContent, Typography, IconButton, Collapse, TextField } from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import { Edit as EditIcon, Delete as DeleteIcon, Save as SaveIcon, Cancel as CancelIcon } from '@mui/icons-material';
import Tooltip from '@mui/material/Tooltip';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import { DatePicker } from '@mui/lab';
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

const ActivityCard = ({ activityData, handleEdit, setStatuses, index, setCardEliminada }) => {
  const [expanded, setExpanded] = useState(false);
  const [activities, setActivities] = useState(null);
  const [editingDates, setEditingDates] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [minDate, setMinDate] = useState(null);
  const [maxDate, setMaxDate] = useState(null);

  useEffect(() => {
    const getActividades = async () => {
      try {
        const rutaSinActividadeEliminada = await axios.get(`${URLRAILWAY}/api/v1/rutas/${activityData._id}`);
        setActivities(rutaSinActividadeEliminada.data.actividades);
        setStartDate(new Date(rutaSinActividadeEliminada.data.actividades?.fechaInicio));
        const minTransportDate = new Date(rutaSinActividadeEliminada.data.transporte.fechaInicio);
        const maxTransportDate = new Date(rutaSinActividadeEliminada.data.transporte.fechaFin);
        setMinDate(minTransportDate);
        setMaxDate(maxTransportDate);
      } catch (error) {
        console.log(error);
      }
    };
    if (activityData._id) {
      getActividades();
    }
  }, [activityData._id]);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const handleEditDates = () => {
    setEditingDates(true);
  };
  const handleCancelEditDates = () => {
    setEditingDates(false);
  };
  const handleSaveDates = async () => {
    try {
      // Realizar la lógica para guardar las fechas actualizadas
      // utilizando el ID de la actividad
      // ...
      setEditingDates(false); // Después de guardar, se desactiva la edición
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async (idActividad, index) => {
    try {
      if (idActividad) {
        await axios.delete(`${URLRAILWAY}/api/v1/actividades/${idActividad}`);
        setStatuses((prevStatuses) => ({ ...prevStatuses, [index]: 'success' }));
        setActivities(activities.filter((activity) => activity._id !== idActividad));
        setCardEliminada('Actividad');
      }
    } catch (error) {
      console.log(error);
      setStatuses((prevStatuses) => ({ ...prevStatuses, [index]: 'error' }));
    }
  };
 
  return (
    <>
      {activities &&
        activities?.map((activityData) => (
          <Card sx={styles.card} key={activityData?._id}>
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
              <IconButton aria-label='delete' onClick={() => handleDelete(activityData._id, index)}>
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
                  {editingDates ? (
                    <div>
                      <DatePicker
                        label="Fecha de inicio"
                        value={startDate || new Date(activityData?.fechaInicio)}
                        onChange={(date) => setStartDate(date)}
                        renderInput={(params) => <TextField {...params} />}
                        minDate={minDate}
                        maxDate={maxDate}
                      />
                      <IconButton onClick={handleSaveDates}>
                      <SaveIcon />
                      </IconButton>
                      <IconButton onClick={handleCancelEditDates}>
                      <CancelIcon />
                      </IconButton>
                    </div>
                  ) : (
                        <div>
                          <Typography variant='body2' color='textSecondary' component='p'>
                            {activityData?.fechaInicio}
                            </Typography>
                            <IconButton onClick={handleEditDates}>
                            <EditIcon />
                            </IconButton>
                        </div>
                      )}
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
