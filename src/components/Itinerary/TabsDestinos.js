import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import FlightCard from './FlightCard';
import { flightData } from '@/components/Itinerary/flightData';
import ActivityCard from '@/components/Itinerary/ActivityCard';
import HotelCard from '@/components/Itinerary/HotelCard';
import { hotelData } from '@/components/Itinerary/hotelData';
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

export default function TabsDestinos({dataDestino}) {
  if(!dataDestino){
    return <div>Intentalo más tarde TabsDestinos</div>
  }
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: '100vh', width: '100%' }}>
      <Tabs
        orientation='vertical'
        variant='scrollable'
        value={value}
        onChange={handleChange}
        aria-label='Vertical tabs example'
        sx={{ borderRight: 1, borderColor: 'divider' }}
      >
        {dataDestino.rutas ? dataDestino.rutas.map((ruta, index) => {
          return <Tab key={ruta._id} label={`${ruta.transporte.destino}`} {...a11yProps(index)} />
        }) : <Tab label='Destino Uno' {...a11yProps(0)} />}
      </Tabs>
      {dataDestino.rutas ? dataDestino.rutas.map((ruta, index) => {
          return <TabPanel key={index} value={value} index={index}>
          <FlightCard flightData={ruta.transporte} />
          <HotelCard hotelData={[]} />
          <ActivityCard activityData={dataDestino.rutas[index].actividades}/>
        </TabPanel>
        }) : <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>}
     
    </Box>
  );
}
