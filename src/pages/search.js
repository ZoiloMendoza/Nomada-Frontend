import SearchBar from '@/components/Search/Search';
import MapButton from '@/components/common/MapButton';
import RestaurantCard from '@/components/Search/RestaurantCard';
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

export const getServerSideProps = async () => {
  try {
    const params = {
      latitude: '19.7059504',
      longitude: '-101.1949825',
    }
    const url = `/api/proxy/search/${params}`;

    const response = await axios.get(url);
    const data = response.data;

    const contentRestaurant = data.contentRestaurant;
    const contentDestino = data.contentDestino;
    const contentActividades = data.contentActividades;

    return {
      props: {
        contentRestaurant,
        contentDestino,
        contentActividades,
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

