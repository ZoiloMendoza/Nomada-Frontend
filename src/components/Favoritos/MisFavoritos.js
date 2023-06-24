import TabsMisFavoritos from './TabMisFavoritos';
import DestinosFavoritos from './DestinosFavoritos';
import RestaurantesFavoritos from './RestaurantesFavoritos';
import ActividadesFavoritas from './ActividadesFavoritas';
import { Box } from '@mui/material';

const styles = {
  title: {
    color: '#E91E63',
    textAlign: 'center',
  },
};
export default function MisFavoritos() {
  return (
    <>
      <TabsMisFavoritos />
      <h1 style={styles.title} destino={destino}>
        {' '}
        {`Destinos y Actividades favoritas en ${destino}`.split(',')[0]}
      </h1>

      <Box>{<DestinosFavoritos contentApi={contentDestino} />}</Box>
      <Box>{<RestaurantesFavoritos restaurantData={contentRestaurant} />}</Box>
      <Box>{<ActividadesFavoritas activityData={contentActividades} />}</Box>
    </>
  );
}
