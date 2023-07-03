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
  const [datosOk, setDatosOk] = useState({
    restaurant: false,
    geos: false,
    attractions: false
  })
 

  const router = useRouter();
  const { destino, latitud, longitud } = router.query;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const restaurantPromise = axios.get(`/api/proxy/restaurantSearch?latitude=${latitud}&longitude=${longitud}&category=restaurants`);
        const geoPromise = axios.get(`/api/proxy/restaurantSearch?latitude=${latitud}&longitude=${longitud}&category=geos`);
        const attractionsPromise = axios.get(`/api/proxy/restaurantSearch?latitude=${latitud}&longitude=${longitud}&category=attractions`);
        const [restaurantResponse, geoResponse, attractionsResponse] = await Promise.allSettled([
          restaurantPromise,
          geoPromise,
          attractionsPromise
        ]);
        
        if(restaurantResponse.status === 'fulfilled'){
          setContentRestaurant(restaurantResponse.value.data);
          console.log(restaurantResponse.value.data, 'datos de restaurante')
          if(restaurantResponse.value.data.length === 0) setDatosOk(prevDatosOk => ({ ...prevDatosOk, restaurant: true }));
        } else {
          console.log('Error fetching restaurant data:', restaurantResponse.reason);
        }
        if(geoResponse.status === 'fulfilled'){
          setContentDestino(geoResponse.value.data);
          if(geoResponse.value.data.length === 0) setDatosOk(prevDatosOk => ({ ...prevDatosOk, geos: true }))
        } else {
          console.log('Error fetching geo data:', geoResponse.reason);
        }
        if(attractionsResponse.status === 'fulfilled'){
          setContentActividades(attractionsResponse.value.data);
          if(attractionsResponse.value.data.length === 0) setDatosOk(prevDatosOk => ({ ...prevDatosOk, attractions: true }))
        } else {
          console.log('Error fetching attractions data:', attractionsResponse.reason);
        }

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
  
  console.log(datosOk, 'datosOk')
  return (
    <>
      <SearchBar />

      <h1 style={styles.title} destino={destino}>
        {' '}
        {`Destinos y Actividades en ${destino}`.split(',')[0]}
      </h1>

      <Box>{<CityCard contentApi={contentDestino} view={datosOk.geos}/>}</Box>
      <Box>{<RestaurantCard restaurantData={contentRestaurant} view={datosOk.restaurant}/>}</Box>
      <Box>{<ActivityCard activityData={contentActividades} view={datosOk.attractions}/>}</Box>

      <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <MapButton />
      </Box>
    </>
  );
}