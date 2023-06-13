import React from 'react';
import MapComponent from './mapGoogle';
import CardComponent from './CardComponent';
import { useRouter } from 'next/router';
import { Grid } from '@mui/material';
import { Box } from '@mui/material';

const styles = {
  cards: {
    overflow: 'scroll',
    height: '100vh',
    width: '100%',
  },
};

const MapDisplay = ({ actividades }) => {
  const router = useRouter();
  const { latitud, longitud } = router.query;

  return (
    <Grid container>
      <Grid item xs={5}>
        <Box sx={styles.cards}>
          {actividades &&
            actividades.map((actividad) => <CardComponent key={actividad.location_id} actividad={actividad} />)}
        </Box>
      </Grid>
      <Grid item xs={7}>
        <MapComponent latitud={latitud} longitud={longitud} />
      </Grid>
    </Grid>
  );
};

export default MapDisplay;
