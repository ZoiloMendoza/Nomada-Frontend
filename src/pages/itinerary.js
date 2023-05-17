import { useEffect, useState } from 'react';
//import Head from 'next/head';

import HeroImage from '@/components/Itinerary/HeroImage';
import FlightCard from '@/components/Itinerary/FlightCard';
import HotelCard from '@/components/Itinerary/HotelCard';
import ActivityCard from '@/components/Itinerary/ActivityCard';
import axios from 'axios';
import { useRouter } from 'next/router';
import Add from '@/components/Add/Add';
import { flightData } from '@/components/Itinerary/flightData';
import { hotelData } from '@/components/Itinerary/hotelData';
import { activityData } from '@/components/Itinerary/activityData';
import { getData } from './api/proxy/findSearch';
import Box from '@mui/material/Box';

export default function Itinerary({ contentApi, contentViaje }) {
  const router = useRouter();
  const [tripData, setTripData] = useState({});
  console.log('contentApi', contentApi);
  console.log('contentViaje', contentViaje);
  //setTripData(contentViaje);
  //console.log(contentApi);
  return (
    <>
      <HeroImage viajeData={contentViaje} imagenFondo={contentApi.data[0].images.original.url} />
      <Add destino={{ latitude: contentApi?.latitude, longitude: contentApi?.longitude }} />

      <Box
        sx={{
          margin: 5,
        }}
      >
        <FlightCard flightData={flightData} />

        <HotelCard hotelData={hotelData} />

        <ActivityCard activityData={activityData} />
      </Box>
    </>
  );
}

export const getServerSideProps = async (context) => {
  const tripId = context.query.id;
  
  try {
    const response = await axios.get(`https://nomada-backend-production.up.railway.app/api/v1/viajes/${tripId}`);

    if (response.status === 200) {
      const tripData = response.data;
      const params = { destino: tripData.destino, paisDestino: tripData.paisDestino };
      const contentApi = await getData({ params });
      return {
        props: {
          contentApi: contentApi,
          contentViaje: tripData,
        },
      };
    }
  } catch (error) {
    return {
      props: {
        contentApi: null,
        contentViaje: null,

      },
    };
  }
};
