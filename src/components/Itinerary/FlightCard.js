import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, Typography, Collapse, IconButton } from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import FlightIcon from '@mui/icons-material/Flight';
import Tooltip from '@mui/material/Tooltip';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
const URLRAILWAY = process.env.NEXT_PUBLIC_BACKEND;
const styles = {
  card: {
    marginBottom: '10px',
    margin: 2,
    backgroundColor: '#F6F6F6',
    borderRight: '10px solid #2B2E4A',
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
    color: '#434565',
  },
};

const FlightCard = ({ flightData }) => {
  const [expanded, setExpanded] = useState(false);
  const [vuelo, setVuelo] = useState(null);
  const [status, setStatus] = useState(null);

  const timer = () => new Promise((resolve) => {
      setTimeout(() => {
        setStatus(null);
        resolve(true);
      }, 1500);
    });
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  useEffect(() => {
    const getTransporte = async () => {
      try {
        const transporte = await axios.get(`${URLRAILWAY}/api/v1/transportes/${flightData._id}`);
        setVuelo(transporte.data);
      } catch (error) {
        console.log(error);
      }
    };
    if (flightData._id) {
      getTransporte();
    }
  }, [flightData._id]);

  const handleDelete = async () => {
    try {
      if (flightData._id) {
        await axios.patch(`${URLRAILWAY}/api/v1/transportes/${flightData._id}`, { numeroVuelo: '' });
        setStatus('success');
        const alertTimer = await timer();
        if (alertTimer) {
            setVuelo('');
        }
      }
    } catch (error) {
      console.log(error);
      setStatus('error');
      timer();
    }
  };

  return (
    <>
      {vuelo?.numeroVuelo && (
        <Card sx={styles.card}>
          <Stack sx={{ width: '100%' }} spacing={2}>
              {status === 'success' && (
                <Alert severity='success'>{`Vuelo se elimino correctamente!`}</Alert>
              )}
              {status === 'error' && (
                <Alert severity='error'>
                  {`Intentelo más tarde.`}
                </Alert>
              )}
          </Stack>
          {status === 'success' ? null :
          <>
          <div sx={styles.editDeleteIcons}>
            <Tooltip title='Eliminar este vuelo'>
              <IconButton aria-label='delete' onClick={() => handleDelete()}>
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
            <Grid item xs={10}>
              <CardHeader
                title={`${vuelo?.origen?.split(',')[0].trim()} a ${vuelo?.destino?.split(',')[0].trim()}`}
                subheader={`${vuelo.fechaIda?.split(',')[0].trim()} | ${vuelo?.aerolinea}`}
              />
            </Grid>
            <Grid item xs={2}>
              <FlightIcon sx={styles.icon} />
            </Grid>
          </Grid>
          <CardContent>
            <Typography variant='h6' component='p'>
              {`${vuelo?.fechaIda} - ${vuelo?.fechaRegreso?.split(',')[1]?.trim()}`}
            </Typography>
            <Typography variant='subtitle1' component='p'>
              {`Duración: ${Math.floor(parseInt(vuelo.duracionVuelo) / 60)}:${parseInt(vuelo.duracionVuelo) % 60} Hrs`}
            </Typography>
          </CardContent>
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
              <Typography variant='subtitle1' component='p'>
                {`Status: ${vuelo?.status}`}
              </Typography>
              <Typography variant='subtitle1' component='p'>
                {`Número de vuelo: ${vuelo?.numeroVuelo}`}
              </Typography>
              <Typography variant='subtitle1' component='p'>
                {`Aeropuerto salida: ${vuelo?.aeropuertoOrigen}`}
              </Typography>
              <Typography variant='subtitle1' component='p'>
                {`Terminal: ${vuelo?.terminalOrigen}`}
              </Typography>
              <Typography variant='subtitle1' component='p'>
                {`Aeropuerto llegada: ${vuelo?.aeropuertoDestino}`}
              </Typography>
              <Typography variant='subtitle1' component='p'>
                {`Terminal: ${vuelo?.terminalDestino}`}
              </Typography>
            </CardContent>
          </Collapse>
          </>}
        </Card>
      )}
    </>
  );
};

export default FlightCard;
