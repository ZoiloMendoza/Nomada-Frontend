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
  const [status, setStatus] = useState(null);
  const [rutasActualizadas, setRutasActualizadas] = useState(null);
  if (!dataDestino) {
    return <div>Intentalo más tarde TabsDestinos</div>;
  }
  const timer = () => new Promise((resolve) => {
      setTimeout(() => {
        setStatus(null);
        resolve(true);
      }, 1500);
    });

  useEffect(() => {
    const getRutas = async () => {
      try {
        const viajeActualizado = await axios.get(`${URLRAILWAY}/api/v1/viajes/${dataDestino._id}`);
        if(viajeActualizado.status === 200){
          setRutasActualizadas(viajeActualizado.data.rutas)
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (dataDestino._id) {
      getRutas();
    }
  }, [dataDestino._id]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    const destinoSeleccionado = dataDestino.rutas[newValue].transporte.destino;
    updateDestinoCallback(destinoSeleccionado);
  };
  const handleDelete = async (idRuta) => {
    const rutaDelete = await axios.delete(`${URLRAILWAY}/api/v1/rutas/${idRuta}`);
    console.log(rutaDelete.status);
    setStatus('success');
    const alertTimer = await timer();
    if (alertTimer) {
      setRutasActualizadas(rutasActualizadas.filter((ruta) => ruta._id !== idRuta));
    }
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
        {rutasActualizadas ? (
          rutasActualizadas.map((ruta, index) => (
            <Tab key={ruta._id} label={`${ruta?.transporte?.destino}`.split(',')[0]} {...a11yProps(index)} />
          ))
        ) : (
          <Tab label='Destino Uno' {...a11yProps(0)} />
        )}
      </Tabs>
      {rutasActualizadas ? (
        rutasActualizadas.map((ruta, index) => (
          <TabPanel key={index} value={value} index={index}>
            <Stack sx={{ width: '100%' }} spacing={2}>
              {status === 'success' && (
                <Alert severity='success'>{`Ruta eliminada correctamente!`}</Alert>
              )}
              {status === 'error' && (
                <Alert severity='error'>
                  {`Intentalo más tarde`}
                </Alert>
              )}
            </Stack>
            {status === 'success' ? null : 
            <>
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
            {ruta ? (
              ruta.transporte.numeroVuelo && (
                <FlightCard flightData={ruta.transporte}/>
              )
            ) : (
              <SkeletonInfoVuelo />
            )}
            <HotelCard rutaParaHoteles={ruta}/>
            <ActivityCard activityData={dataDestino?.rutas[index]}/>
            </>}
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
