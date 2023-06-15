import SearchBar from '@/components/Search/Search';
import MapButton from '@/components/common/MapButton';
import RestaurantCard from '@/components/Search/RestaurantCard';
import { getData } from './api/proxy/restaurantSearch';
import Box from '@mui/material/Box';
import CityCard from '@/components/Search/cityCard';
import ActivityCard from '@/components/Search/activityCard';

const styles = {
  title: {
    color: '#E91E63',
    textAlign: 'center',
  },
};

export default function Search({ contentRestaurant, contentDestino, contentActividades, mensaje, destino }) {
  //console.log(contentRestaurant);
  //console.log(contentDestino);
  console.log(mensaje);

  return (
    <>
      <SearchBar />

      <h1 style={styles.title} destino={destino}>
        {' '}
        Destinos y Actividades en {destino}
      </h1>

      <Box>{<CityCard contentApi={contentDestino} />}</Box>
      <Box>{<RestaurantCard restaurantData={contentRestaurant} />}</Box>
      <Box>{<ActivityCard activityData={contentActividades} />}</Box>

      <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <MapButton />
      </Box>
    </>
  );
}
export const getServerSideProps = async (context) => {
  const params = context.query;
  console.log(params, 'params search');
  try {
    const contentRestaurant = await getData({
      latitude: params.latitud,
      longitude: params.longitud,
      category: 'restaurants',
    });
    const contentDestino = await getData({ latitude: params.latitud, longitude: params.longitud, category: 'geos' });
    const contentActividades = await getData({
      latitude: params.latitud,
      longitude: params.longitud,
      category: 'attractions',
    });
    return {
      props: {
        contentRestaurant: contentRestaurant,
        contentDestino: contentDestino,
        contentActividades: contentActividades,
      },
    };
  } catch (error) {
    return {
      props: {
        mensaje: JSON.stringify(error, Object.getOwnPropertyNames(error)),
        contentRestaurant: null,
        contentDestino: null,
        contentActividades: null,
      },
    };
  }
};
