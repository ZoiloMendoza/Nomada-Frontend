import React from 'react';
import MapComponent from './mapGoogle';
import CardComponent from './CardComponent';
import { Grid } from '@mui/material';
import { Box } from '@mui/material';

const styles = {
  grid: {
    padding: '20px',
  },
  cards: {
    overflow: 'scroll',
    height: '100vh',
    width: '100%',
    padding: '0 10px 0 0',
  },
};

const MapDisplay = ({ ruta }) => (
    <Grid container sx={styles.grid}>
      <Grid item xs={3}>
        <Box sx={styles.cards}>
          {ruta?.actividades &&
            ruta?.actividades?.map((actividad) => <CardComponent key={actividad.location_id} actividad={actividad} />)}
        </Box>
      </Grid>
      <Grid item xs={9}>
        <MapComponent latitud={ruta?.transporte?.latitud} longitud={ruta?.transporte?.longitud} />
      </Grid>
    </Grid>
  );

export default MapDisplay;
