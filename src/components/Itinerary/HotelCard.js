import { useState, useEffect } from 'react';
import { Card, CardContent, CardMedia, Typography, IconButton, Collapse, TextField } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Save as SaveIcon, Cancel as CancelIcon } from '@mui/icons-material';
import { ExpandMore } from '@mui/icons-material';
import HotelIcon from '@mui/icons-material/Hotel';
import { Tooltip } from '@mui/material';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
const URLRAILWAY = process.env.NEXT_PUBLIC_BACKEND;
const styles = {
  card: {
    marginBottom: '5px',
    margin: 2,
    backgroundColor: '#FFFFFF',
    borderRight: '10px solid #E91E63',
  },
  media: {
    maxHeight: 300,
    paddingTop: '56.25%', // 16:9
  },
  expandIcon: {
    transform: 'rotate(0deg)',
    transition: 'ease 0.3s',
  },
  expandIconOpen: {
    transform: 'rotate(180deg)',
  },
  icon: {
    width: '50px',
    height: '50px',
    color: '#E91E62',
  },
};

const HotelCard = ({ rutaParaHoteles }) => {

  const [expanded, setExpanded] = useState(false);
  const [hotelData, setHotelData] = useState(null);
  const [startDates, setStartDates] = useState([]);//guarda cambios de fecha inicio
  const [endDates, setEndDates] = useState([]);//guarda cambios de fecha final
  const [editingDates, setEditingDates] = useState({});
  const [statusesEditar, setStatusesEditar] = useState({});
  const [statusesEliminar, setStatusesEliminar] = useState({});
  const [inicio, setInicio] = useState(''); //limites de calendario
  const [final, setFinal] = useState(''); //limites de calendario
  //console.log(rutaParaHoteles, 'hotel entrada');
  useEffect(() => {
    const getHoteles = async () => {
      try {
        const rutaSinHotelEliminado = await axios.get(`${URLRAILWAY}/api/v1/rutas/${rutaParaHoteles._id}`);
        if(rutaSinHotelEliminado.status === 200){
          setHotelData(rutaSinHotelEliminado.data.hospedajes);
          console.log(rutaSinHotelEliminado.data.hospedajes, 'hotel api');
          const initialStartDates = rutaSinHotelEliminado.data.hospedajes.map((hospedaje) => hospedaje.fechaInicio);
          const initialEndDates = rutaSinHotelEliminado.data.hospedajes.map((hospedaje) => hospedaje.fechaFinal);
          setStartDates(initialStartDates);
          setEndDates(initialEndDates);
          setInicio(rutaSinHotelEliminado.data.fechaInicial);
          setFinal(rutaSinHotelEliminado.data.fechaFinal);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (rutaParaHoteles._id) {
      getHoteles();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rutaParaHoteles._id]);
  
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
  const timer = () => new Promise((resolve) => {
      setTimeout(() => {
        setStatusesEditar({});
        setStatusesEliminar({});
        resolve(true);
      }, 1500);
    });
  
  const handleSaveDates = async (cardIndex, idHospedaje) => {
    try {
      if (idHospedaje) {
        const updateActividad = await axios.patch(`${URLRAILWAY}/api/v1/hospedajes/${idHospedaje}`, {
          fechaInicial: startDates[cardIndex],
          fechaFinal: endDates[cardIndex],
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
          setStatusesEditar((prevStatuses) => ({ ...prevStatuses, [cardIndex]: 'success' }));
          timer();
        }
      }
    } catch (error) {
      console.log(error);
      setStatusesEditar((prevStatuses) => ({ ...prevStatuses, [cardIndex]: 'error' }));
      timer();
    }
  };
  const handleDelete = async (id, cardIndex) => {
    try {
      if (id) {
        const eliminarHospedaje = await axios.delete(`${URLRAILWAY}/api/v1/hospedajes/${id}`);
        if(eliminarHospedaje.status === 200){
          setStatusesEliminar((prevStatuses) => ({ ...prevStatuses, [cardIndex]: 'success' }));
          const alertTimer = await timer();
          if (alertTimer) {
            setHotelData((prevData) => prevData.filter((hotel) => hotel._id !== id));
          }
        }
      }
    } catch (error) {
      console.log(error);
      setStatusesEliminar((prevStatuses) => ({ ...prevStatuses, [cardIndex]: 'error' }));
      timer();
    }
  };
  
  //console.log(hotelData, 'hotel Datos');
  return (
    <>
      {hotelData
        && hotelData.map((hotelData, index) => (
            <Card sx={styles.card} key={hotelData?._id}>
              <Stack sx={{ width: '100%' }} spacing={2}>
              {statusesEditar[index] === 'success' && (
                <Alert severity='success'>{` Fechas actualizadas correctamente!`}</Alert>
              )}
              {statusesEditar[index] === 'error' && (
                <Alert severity='error'>
                  <AlertTitle>Error</AlertTitle>
                  {`No se pudieron actualizar fechas, intentelo más tarde.`}
                </Alert>
              )}
              </Stack>
              <Stack sx={{ width: '100%' }} spacing={2}>
              {statusesEliminar[index] === 'success' && (
                <Alert severity='success'>{`Hospedaje eliminado correctamente!`}</Alert>
              )}
              {statusesEliminar[index] === 'error' && (
                <Alert severity='error'>
                  <AlertTitle>Error</AlertTitle>
                  {`No se pudieron eliminar, intentelo más tarde.`}
                </Alert>
              )}
              </Stack>
              {statusesEliminar[index] === 'success' ? null :
              <CardContent>
                <Tooltip title='Eliminar este hospedaje'>
                 
                    <IconButton aria-label='delete' onClick={() => handleDelete(hotelData._id, index)}>
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
                    <CardMedia sx={styles.media} image={hotelData?.imagen} title={hotelData.nombreHospedaje} />
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant='h5'>{hotelData?.name}</Typography>
                    <Typography variant='subtitle1'>{hotelData?.direccion}</Typography>
                    <CardContent>
                      {editingDates[index] ? (
                        <div>
                           <TextField
                              label='Check-in:'
                              value={startDates[index] || hotelData?.fechaInicio}
                              onChange={(e) => {
                                const updatedStartDates = [...startDates];
                                updatedStartDates[index] = e.target.value;
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
                              label='Check-out:'
                              value={endDates[index] || activityData?.fechaFinal}
                              onChange={(e) => {
                                const updatedendDates = [...endDates];
                                updatedendDates[index] = e.target.value;
                                setEndDates(updatedendDates);
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
                           <IconButton onClick={() => handleSaveDates(index, hotelData._id)}>
                            <SaveIcon
                              sx={{
                              color: '#D2D2D2',
                              borderRadius: '50%',
                              }}
                            />
                          </IconButton>
                          <IconButton onClick={() => handleCancelEditDates(index)}>
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
                            <Typography variant='body1' color='textSecondary' component='p'>
                              {`Check-in: ${startDates[index] || hotelData?.fechaInicio}`}
                            </Typography>
                            <Typography variant='body1' color='textSecondary' component='p'>
                              {`Check-out: ${endDates[index] || hotelData?.fechaFinal}`}
                            </Typography>
                          </Grid>
                          <Grid item>
                        <IconButton onClick={() => handleEditDates(index)}>
                            <EditIcon style={{ color: '#D2D2D2', borderRadius: '40%' }} />
                        </IconButton>
                          </Grid>
                        </Grid>                    
                      )}
                    </CardContent>
                  </Grid>
                  <Grid item xs={2}>
                    <HotelIcon sx={styles.icon} />
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
                    <Typography variant='h6'>Precio Total: ${hotelData?.totalPrice}</Typography>
                    <Typography variant='h6'>Número de reservación:</Typography>
                    <Typography variant='body1'>{hotelData?.reservation}</Typography>
                  </CardContent>
                </Collapse>
              </CardContent>
              }
            </Card>
          ))}
    </>
  );
};

export default HotelCard;
