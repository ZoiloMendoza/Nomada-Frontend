import SearchBar from '@/components/Search/Search';
import MapButton from '@/components/common/MapButton';
import RestaurantCard from '@/components/Search/RestaurantCard';
import { getData } from './api/proxy/restaurantSearch';
import { searchLocation } from './api/proxy/opencage';
import Box from '@mui/material/Box';
import CityCard from '@/components/Search/cityCard';
import ActivityCard from '@/components/Search/activityCard';

export default function Search({ contentRestaurant, contentDestino, contentActividades }) {
  //console.log(contentRestaurant);
  //console.log(contentDestino);
  console.log(contentActividades, 'contentActividades');
  return (
    <>
      <SearchBar />

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
    const datosGeo = await searchLocation(params.destino);
    const contentRestaurant = await getData({ ...datosGeo, category: 'restaurants' });
    const contentDestino = await getData({ ...datosGeo, category: 'geos' });
    const contentActividades = await getData({ ...datosGeo, category: 'attractions' });
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
        contentRestaurant: null,
        contentDestino: null,
        contentActividades: null,
      },
    };
  }
};
