import { useState, useEffect } from 'react';
import { Card, CardHeader, CardMedia, CardContent, Typography, IconButton, Collapse, TextField } from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import { Edit as EditIcon, Delete as DeleteIcon, Save as SaveIcon, Cancel as CancelIcon } from '@mui/icons-material';
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

const ActivityCard = ({ activityData, handleEdit, setStatuses, index, setCardEliminada }) => {
  const [expanded, setExpanded] = useState(false);
  const [activities, setActivities] = useState(null);
  const [editingDates, setEditingDates] = useState({});
  const [startDates, setStartDates] = useState([]);
  const [horaDates, setHoraDates] = useState([]);
  const [inicio, setInicio] = useState(''); //limites de calendario
  const [final, setFinal] = useState(''); //limites de calendario
  const [status, setStatus] = useState('');
  const [statuses2, setStatuses2] = useState({});

  useEffect(() => {
    const getActividades = async () => {
      try {
        const rutaSinActividadeEliminada = await axios.get(`${URLRAILWAY}/api/v1/rutas/${activityData._id}`);
        if (rutaSinActividadeEliminada.status === 200) {
          setActivities(rutaSinActividadeEliminada.data.actividades);
          const initialStartDates = rutaSinActividadeEliminada.data.actividades.map((activity) => activity.fechaInicio);
          const initialHoraDates = rutaSinActividadeEliminada.data.actividades.map((activity) => activity.fechaFinal);
          setStartDates(initialStartDates);
          setHoraDates(initialHoraDates);
          setInicio(rutaSinActividadeEliminada.data.fechaInicial);
          setFinal(rutaSinActividadeEliminada.data.fechaFinal);
        }
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
  const handleEditDates = (cardIndex) => {
    setEditingDates((prevEditingDates) => ({
      ...prevEditingDates,
      [cardIndex]: true,
    }));
  };
  const handleCancelEditDates = (cardIndex) => {
    setEditingDates((prevEditingDates) => ({
      ...prevEditingDates,
      [cardIndex]: false,
    }));
  };
  const timer = () => {
    setTimeout(() => {
      setStatuses2({});
    }, 3000);
  };

  const handleSaveDates = async (cardIndex, idActividad) => {
    try {
      if (idActividad) {
        const updateActividad = await axios.patch(`${URLRAILWAY}/api/v1/actividades/${idActividad}`, {
          fechaInicio: startDates[cardIndex],
          fechaFinal: horaDates[cardIndex],
        });
        if (updateActividad.status === 201) {
          console.log(updateActividad.data);
          const updatedStartDates = [...startDates];
          updatedStartDates[cardIndex] = startDates[cardIndex];
          setStartDates(updatedStartDates);
          setEditingDates((prevEditingDates) => ({
            ...prevEditingDates,
            [cardIndex]: false,
          }));

          setStatuses2((prevStatuses) => ({ ...prevStatuses, [cardIndex]: 'success' }));
          timer();
        }
      }
    } catch (error) {
      console.log(error);
      setStatuses2((prevStatuses) => ({ ...prevStatuses, [cardIndex]: 'error' }));
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
  console.log(inicio, final, 'fechas');
  console.log(statuses2, 'identificar');
  return (
    <>
      {activities &&
        activities?.map((activityData, cardIndex) => (
          <Card sx={styles.card} key={activityData?._id}>
            <Stack sx={{ width: '100%' }} spacing={2}>
              {statuses2[cardIndex] === 'success' && (
                <Alert severity='success'>{` Actividad modificada correctamente!`}</Alert>
              )}
              {statuses2[cardIndex] === 'error' && (
                <Alert severity='error'>
                  <AlertTitle>Error</AlertTitle>
                  {`Ocurrió un error.`}
                </Alert>
              )}
            </Stack>
            <Tooltip title='Eliminar esta actividad'>
              <IconButton aria-label='delete' onClick={() => handleDelete(activityData._id, index)}>
                <DeleteIcon
                  sx={{
                    color: '#D2D2D2',
                    borderRadius: '50%',
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
                  {editingDates[cardIndex] ? (
                    <div>
                      <TextField
                        label='Fecha'
                        value={startDates[cardIndex] || activityData?.fechaInicio}
                        onChange={(e) => {
                          const updatedStartDates = [...startDates];
                          updatedStartDates[cardIndex] = e.target.value;
                          setStartDates(updatedStartDates);
                        }}
                        InputProps={{
                          inputProps: {
                            type: 'date',
                            min: inicio,
                            max: final,
                          },
                        }}
                        sx={{
                          marginBottom: '0.6em',
                        }}
                      />
                      <TextField
                        label='Hora'
                        type='time'
                        value={horaDates[cardIndex] || activityData?.fechaFinal}
                        onChange={(e) => {
                          const updatedHoraDates = [...horaDates];
                          updatedHoraDates[cardIndex] = e.target.value;
                          setHoraDates(updatedHoraDates);
                        }}
                      />
                      <IconButton onClick={() => handleSaveDates(cardIndex, activityData._id)}>
                        <SaveIcon
                          sx={{
                            color: '#D2D2D2',

                            borderRadius: '50%',
                          }}
                        />
                      </IconButton>
                      <IconButton onClick={() => handleCancelEditDates(cardIndex)}>
                        <CancelIcon
                          sx={{
                            color: '#D2D2D2',

                            borderRadius: '50%',
                          }}
                        />
                      </IconButton>
                    </div>
                  ) : (
                    <Grid container direction='row' alignItems='center'>
                      <Grid item>
                        <Typography variant='body2' color='textSecondary' component='p'>
                          {`Día: ${startDates[cardIndex] || activityData?.fechaInicio}`}
                        </Typography>
                        <Typography variant='body2' color='textSecondary' component='p'>
                          {`Hora: ${horaDates[cardIndex] || activityData?.fechaFinal}`}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <IconButton onClick={() => handleEditDates(cardIndex)}>
                          <EditIcon style={{ color: '#D2D2D2', borderRadius: '40%' }} />
                        </IconButton>
                      </Grid>
                    </Grid>
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
