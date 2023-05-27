import SearchBar from '@/components/Search/Search';
import MapButton from '@/components/common/MapButton';
import RestaurantCard from '@/components/Search/RestaurantCard';
import { getData } from './api/proxy/restaurantSearch';
import { searchLocation } from './api/proxy/opencage';
import Box from '@mui/material/Box';
import CityCard from '@/components/Search/cityCard';

export default function Search({ contentRestaurant, contentDestino }) {
  console.log(contentRestaurant);
  console.log(contentDestino);
  return (
    <>
      <SearchBar />

      <Box>{<CityCard contentApi={contentDestino} />}</Box>
      <Box>{<RestaurantCard restaurantData={contentRestaurant} />}</Box>
      <Box></Box>

      <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <MapButton />
      </Box>
    </>
  );
}
export const getServerSideProps = async (context) => {
  const params = context.query;
  console.log(params, 'params search')
  try {
    const datosGeo = await searchLocation(params.destino);
    //console.log(datosGeo, 'frio')
    //const test = await getDataFindSearchSinPhoto({ params })
    const contentRestaurant = await getData({ ...datosGeo, category: 'restaurants' });
    const contentDestino = await getData({ ...datosGeo, category: 'geos' });
    return {
      props: {
        contentRestaurant: contentRestaurant,
        contentDestino: contentDestino,
      },
    };
  } catch (error) {
    return {
      props: {
        contentRestaurant: null,
        contentDestino: null,
      },
    };
  }
};

