import SearchBar from '@/components/Search/Search';
import MapButton from '@/components/common/MapButton';
//import { cityData } from '@/components/Search/cityData';
import RestaurantCard from '@/components/Search/RestaurantCard';
import ActivityCard from '@/components/Itinerary/ActivityCard';
//import { restaurantData } from '@/components/Search/restaurantData';

import { getData } from './api/proxy/restaurantSearch';
//import Spinner from '@/components/common/Spinner';
import axios from 'axios';
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
      <Box>
        {
          /*contentRestaurant === undefined || contentRestaurant.lengh === 0 ? <Spinner/> :*/
          <ActivityCard />
        }
      </Box>

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
