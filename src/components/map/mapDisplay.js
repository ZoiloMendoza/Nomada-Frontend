import React from 'react';
import MapComponent from './mapGoogle';
import CardComponent from './CardComponent';
import { Grid } from '@mui/material';
import { Box } from '@mui/material';
import { useState, useEffect } from 'react';
import axios from 'axios';
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

const MapDisplay = ({ ruta }) => {
  console.log(ruta.actividades, 'datos de mapDisplay');
  //const [ruta, setRuta] = useState(null);
  const [actividadesDeRuta, setActividadesDeRuta] = useState([]);
  useEffect(() => {
    const fetchActividades = async () => {
      try {
        const actividadesPromises = ruta.actividades.map((actividad) =>
          axios.get(`/api/proxy/tripadvisor/${actividad.locationId}`),
        );
        const actividadesResponses = await Promise.all(actividadesPromises);
        const actividadesData = actividadesResponses.map((response) => response.data);
        setActividadesDeRuta(actividadesData);
        
        console.log('me estoy ejecutando');
      } catch (error) {
        console.log(error);
      }
    };
    if (ruta.actividades && ruta.actividades != actividadesDeRuta) {
      fetchActividades();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ruta]);
  console.log(actividadesDeRuta, 'respuesta de tripad')
  return (
    <Grid container sx={styles.grid}>
      <Grid item xs={3}>
        <Box sx={styles.cards}>
          {ruta?.actividades &&
            ruta.actividades.map((actividad) => <CardComponent key={actividad.nombre} actividad={actividad} />)}
        </Box>
      </Grid>
      <Grid item xs={9}>
        <MapComponent
          latitud={ruta?.transporte?.latitud}
          longitud={ruta?.transporte?.longitud}
          actividadesDeRuta={actividadesDeRuta}
        />
      </Grid>
    </Grid>
  );
};

export default MapDisplay;
