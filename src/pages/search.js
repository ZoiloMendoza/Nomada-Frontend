import SearchBar from '@/components/Search/Search';
import MapButton from '@/components/common/MapButton';
import { cityData } from '@/components/Search/cityData';
import RestaurantCard from '@/components/Search/RestaurantCard';
import ActivityCard from '@/components/Itinerary/ActivityCard';
import { restaurantData } from '@/components/Search/restaurantData';

import { getData } from './api/proxy/restaurantSearch';
//import Spinner from '@/components/common/Spinner';
import axios from 'axios';
import Box from '@mui/material/Box';
import CityCard from '@/components/Search/cityCard';

export default function Search({ contentApi }) {
  console.log(contentApi);
  return (
    <>
      <SearchBar />

      <Box>
        {
          /*contentApi === undefined || contentApi.lengh === 0 ? <Spinner/> :*/
          <CityCard contentApi={cityData} />
        }
      </Box>
      <Box>
        {
          /*contentApi === undefined || contentApi.lengh === 0 ? <Spinner/> :*/
          <RestaurantCard restaurantData={restaurantData.data} />
        }
      </Box>
      <Box>
        {
          /*contentApi === undefined || contentApi.lengh === 0 ? <Spinner/> :*/
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
  //console.log(params);
  try {
    //const contentApi = await axios.get('./api/proxy/tripadvisor');

    const contentApi = await getData({ params });

    // console.log('response', contentApi);
    return {
      props: {
        contentApi: contentApi,
      },
    };
  } catch (error) {
    return {
      props: {
        contentApi: { error: JSON.stringify(error) },
      },
    };
  }
};
