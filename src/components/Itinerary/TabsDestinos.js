import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { IconButton } from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import Tooltip from '@mui/material/Tooltip';
import FlightCard from './FlightCard';
import ActivityCard from '@/components/Itinerary/ActivityCard';
import HotelCard from '@/components/Itinerary/HotelCard';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
import { SkeletonInfoVuelo } from '@/components/SkeletonsCards/SkeletonInfoVuelo';

const URLRAILWAY = process.env.NEXT_PUBLIC_BACKEND;

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3, width: '75vw' }}>
          <Box>{children}</Box>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default function TabsDestinos({ dataDestino, updateDestinoCallback }) {
  const [value, setValue] = React.useState(0);
  const [statuses, setStatuses] = useState({});
  const [cardEliminada, setCardEliminada] = useState('');
  if (!dataDestino) {
    return <div>Intentalo más tarde TabsDestinos</div>;
  }
  
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const timers = [];
    Object.keys(statuses).forEach((index) => {
      if (statuses[index]) {
        const timer = setTimeout(() => {
          setStatuses((prevStatuses) => ({ ...prevStatuses, [index]: null }));
        }, 3000);
  
        timers.push(timer);
      }
    });
    return () => {
      timers.forEach((timer) => clearTimeout(timer));
    };
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statuses]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    const destinoSeleccionado = dataDestino.rutas[newValue].transporte.destino;
    updateDestinoCallback(destinoSeleccionado);
  };
  const handleDelete = async (idRuta) => {
    const rutaDelete = await axios.delete(`${URLRAILWAY}/api/v1/rutas/${idRuta}`);
    console.log(rutaDelete.status);
    //alert('Ruta eliminada');
    setStatus('success');
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: 'background.paper',
        display: 'flex',
        height: '100vh',
        width: '100%',
        overflow: 'scroll',
      }}
    >
      <Tabs
        orientation='vertical'
        variant='scrollable'
        value={value}
        onChange={handleChange}
        aria-label='Vertical tabs example'
        sx={{ borderRight: 1, borderColor: 'divider' }}
      >
        {dataDestino.rutas ? (
          dataDestino.rutas.map((ruta, index) => (
            <Tab key={ruta._id} label={`${ruta?.transporte?.destino}`.split(',')[0]} {...a11yProps(index)} />
          ))
        ) : (
          <Tab label='Destino Uno' {...a11yProps(0)} />
        )}
      </Tabs>

      {dataDestino.rutas ? (
        dataDestino.rutas.map((ruta, index) => (
          <TabPanel key={index} value={value} index={index}>
            <div>
              <Tooltip title='Borrar Destino Completo'>
                <IconButton aria-label='delete' onClick={() => handleDelete(ruta._id)}>
                  <DeleteIcon
                    sx={{
                      width: '20px',
                      color: '#D2D2D2',
                    }}
                  />
                </IconButton>
              </Tooltip>
              <span color='secondary'>Eliminar este destino</span>
            </div>
            <Stack sx={{ width: '100%' }} spacing={2}>
              {statuses[index] === 'success' && (
                <Alert severity='success'>{`${cardEliminada} eliminado correctamente!`}</Alert>
              )}
              {statuses[index] === 'error' && (
                <Alert severity='error'>
                  <AlertTitle>Error</AlertTitle>
                  {`Ocurrió un error al eliminar el ${cardEliminada}`}
                </Alert>
              )}
            </Stack>
            {ruta ? (
              ruta.transporte.numeroVuelo && (
                <FlightCard
                  flightData={ruta.transporte}
                  setStatuses={setStatuses}
                  index={index}
                  setCardEliminada={setCardEliminada}
                />
              )
            ) : (
              <SkeletonInfoVuelo />
            )}
            <HotelCard
              rutaParaHoteles={ruta}
              setStatuses={setStatuses}
              index={index}
              setCardEliminada={setCardEliminada}
            />
            <ActivityCard
              activityData={dataDestino.rutas[index]}
              setStatuses={setStatuses}
              index={index}
              setCardEliminada={setCardEliminada}
            />
          </TabPanel>
        ))
      ) : (
        <TabPanel value={value} index={1}>
          Item Two
        </TabPanel>
      )}
    </Box>
  );
}
