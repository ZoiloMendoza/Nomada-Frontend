import SearchBar from '@/components/Search/Search';
import MapButton from '@/components/common/MapButton';
import RestaurantCard from '@/components/Search/RestaurantCard';
import Box from '@mui/material/Box';
import CityCard from '@/components/Search/cityCard';
import ActivityCard from '@/components/Search/activityCard';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import axios from 'axios';

const styles = {
  title: {
    color: '#E91E63',
    textAlign: 'center',
  },
};

export default function Search() {
  const [contentRestaurant, setContentRestaurant] = useState(null);
  const [contentDestino, setContentDestino] = useState(null);
  const [contentActividades, setContentActividades] = useState(null);
 

  const router = useRouter();
  const { destino, latitud, longitud } = router.query;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const restaurantResponse = await axios.get(`/api/proxy/restaurantSearch?latitude=${latitud}&longitude=${longitud}&category=restaurants`);
        setContentRestaurant(restaurantResponse.data);

        const geoResponse = await axios.get(`/api/proxy/restaurantSearch?latitude=${latitud}&longitude=${longitud}&category=geos`);
        setContentDestino(geoResponse.data);

        const attractionsResponse = await axios.get(`/api/proxy/restaurantSearch?latitude=${latitud}&longitude=${longitud}&category=attractions`);
        setContentActividades(attractionsResponse.data);
        console.log('peticion search')
      } catch (error) {
        console.log(error)
      }
    }

    if (latitud && longitud) {
      fetchData();
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [latitud, longitud, destino]);

  return (
    <>
      <SearchBar />

      <h1 style={styles.title} destino={destino}>
        {' '}
        {`Destinos y Actividades en ${destino}`.split(',')[0]}
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