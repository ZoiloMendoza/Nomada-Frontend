import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

export default function TabDestinos() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant='scrollable'
        scrollButtons
        allowScrollButtonsMobile
        aria-label='scrollable force tabs example'
      >
        <Tab label='Destino Uno' />
        <Tab label='Destino Dos' />
        <Tab label='Destino Tres' />
        <Tab label='Destino Cuatro' />
        <Tab label='Destino Cinco' />
        <Tab label='Destino Seis' />
        <Tab label='Destino Siete' />
      </Tabs>
    </Box>
  );
}
