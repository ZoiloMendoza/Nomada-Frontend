import SearchBar from '@/components/Search/Search';
import MapButton from '@/components/common/MapButton';
import RestaurantCard from '@/components/Search/RestaurantCard';
import Box from '@mui/material/Box';
import CityCard from '@/components/Search/cityCard';
import ActivityCard from '@/components/Search/activityCard';
import { useState, useEffect } from 'react';
import axios from 'axios';
export default function Search() {
  const [restaurantData, setRestaurantData] = useState(null);
  const [destinoData, setDestinoData] = useState(null);
  const [actividadesData, setActividadesData] = useState(null);

 useEffect(() => {
    const params = '19.7059504';
   
    const url = `/api/proxy/search/${params}`;
    axios.get(url)
      .then((response) => {
        const data = response.data;
        setRestaurantData(data.contentRestaurant);
        setDestinoData(data.contentDestino);
        setActividadesData(data.contentActividades);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <>
      <SearchBar />

      <Box>
        {destinoData && <CityCard contentApi={destinoData} />}
      </Box>
      <Box>
        {restaurantData && <RestaurantCard restaurantData={restaurantData} />}
      </Box>
      <Box>
        {actividadesData && <ActivityCard activityData={actividadesData} />}
      </Box>

      <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <MapButton />
      </Box>
    </>
  );
}

