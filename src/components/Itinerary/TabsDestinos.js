import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { IconButton } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import FlightCard from './FlightCard';
import ActivityCard from '@/components/Itinerary/ActivityCard';
import HotelCard from '@/components/Itinerary/HotelCard';

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
  if (!dataDestino) {
    return <div>Intentalo más tarde TabsDestinos</div>;
  }
  updateDestinoCallback(dataDestino.rutas[0].transporte.destino)

  const handleChange = (event, newValue) => {
    setValue(newValue);
    const destinoSeleccionado = dataDestino.rutas[newValue].transporte.destino;
    updateDestinoCallback(destinoSeleccionado);
    console.log(newValue, 'newValue');
    console.log(destinoSeleccionado, 'destinoSeleccionado');
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
            <Tab key={ruta._id} label={`${ruta?.transporte?.destino}`} {...a11yProps(index)} />
          ))
        ) : (
          <Tab label='Destino Uno' {...a11yProps(0)} />
        )}
      </Tabs>

      {dataDestino.rutas ? (
        dataDestino.rutas.map((ruta, index) => (
          <TabPanel key={index} value={value} index={index}>
            <div>
              <IconButton aria-label='edit' onClick={() => handleEdit(rutaInfo)}>
                <EditIcon
                  sx={{
                    width: '20px',
                    color: '#D2D2D2',
                  }}
                />
              </IconButton>
              <IconButton aria-label='delete' onClick={() => handleDelete(rutaInfo)}>
                <DeleteIcon
                  sx={{
                    width: '20px',
                    color: '#D2D2D2',
                  }}
                />
              </IconButton>
            </div>
            <FlightCard flightData={ruta.transporte} />
            <HotelCard hotelData={ruta.hospedajes} />
            <ActivityCard activityData={dataDestino.rutas[index].actividades} />
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
