import SearchBar from '@/components/Search/Search';
import MapButton from '@/components/common/MapButton';
import RestaurantCard from '@/components/Search/RestaurantCard';
import { cityData } from '@/components/Search/cityData';
import { restaurantData } from '@/components/Search/restaurantData';
import { getData } from './api/proxy/restaurantSearch';
import axios from 'axios';
import Box from '@mui/material/Box';
import CityCard from '@/components/Search/cityCard';

export default function Search({ contentRestaurant, contentDestino }) {
  console.log(contentRestaurant);
  console.log(contentDestino);
  return (
    <>
      <SearchBar />

      <Box>{<CityCard contentApi={cityData} />}</Box>
      <Box>{<RestaurantCard restaurantData={restaurantData} />}</Box>
      <Box></Box>

      <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <MapButton />
      </Box>
    </>
  );
}
export const getServerSideProps = async (context) => {
  const params = context.query;

  try {
    const contentRestaurant = await getData({ ...params, category: 'restaurants' });
    const contentDestino = await getData({ ...params, category: 'geos' });
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
