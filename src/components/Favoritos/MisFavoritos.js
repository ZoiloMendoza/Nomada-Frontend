import TabsMisFavoritos from './TabMisFavoritos';
//import DestinosFavoritos from './DestinosFavoritos';
//import RestaurantesFavoritos from './RestaurantesFavoritos';
//import ActividadesFavoritas from './ActividadesFavoritas';
//import { Box } from '@mui/material';

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

      {/* <Box>{<DestinosFavoritos contentApi={contentDestino} />}</Box>
      <Box>{<RestaurantesFavoritos restaurantData={contentRestaurant} />}</Box>
  <Box>{<ActividadesFavoritas activityData={contentActividades} />}</Box>*/}
    </>
  );
}
