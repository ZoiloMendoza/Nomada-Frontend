import { useState } from 'react';
import { Card, CardContent, CardMedia, Typography, IconButton, Collapse } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
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

const HotelCard = ({ hotelData, handleEdit }) => {
  const [expanded, setExpanded] = useState(false);
  const [statuses, setStatuses] = useState({});

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleDelete = async (id, index) => {
    try {
      if (id) {
        await axios.delete(`${URLRAILWAY}/api/v1/hospedajes/${id}`);
        //alert('Vuelo eliminada');
        setStatuses((prevStatuses) => ({ ...prevStatuses, [index]: 'success' }));
      }
    } catch (error) {
      console.log(error);
      setStatus((prevStatuses) => ({ ...prevStatuses, [index]: 'error' }));
    }
  };
  console.log(hotelData, 'hotel Datos');
  return (
    <>
      {hotelData
        ? hotelData.map((hotelData, index) => (
            <Card sx={styles.card} key={index}>
              <Stack sx={{ width: '100%' }} autoHideDuration={5000} spacing={2}>
                {statuses[index] === 'success' && (
                  <Alert severity='success'>
                    <AlertTitle>Éxito</AlertTitle>
                    Hospedaje eliminado correctamente!
                  </Alert>
                )}
                {statuses[index] === 'error' && (
                  <Alert severity='error'>
                    <AlertTitle>Error</AlertTitle>
                    Ocurrió un error.
                  </Alert>
                )}
              </Stack>
              <CardContent>
                <div>
                  <Tooltip title='Editar este hospedaje'>
                    <IconButton aria-label='edit' onClick={() => handleEdit(hotelInfo)}>
                      <EditIcon
                        sx={{
                          width: '20px',
                          color: '#D2D2D2',
                        }}
                      />
                    </IconButton>
                  </Tooltip>
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
                </div>
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <CardMedia sx={styles.media} image={hotelData?.imagen} title={hotelData.nombreHospedaje} />
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant='h5'>{hotelData?.name}</Typography>
                    <Typography variant='subtitle1'>{hotelData?.direccion}</Typography>
                    <Typography variant='body1'>Check-in: {hotelData?.fechaInicio}</Typography>
                    <Typography variant='body1'>Check-out: {hotelData?.fechaFinal}</Typography>
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
            </Card>
          ))
        : 'No hay Hoteles'}
    </>
  );
};

export default HotelCard;
