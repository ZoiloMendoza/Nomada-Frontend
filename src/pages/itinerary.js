import { useEffect, useState } from 'react';
import Head from 'next/head';
import NavbarTwo from '@/components/Navbar/NavbarTwo';
import HeroImage from '@/components/Itinerary/HeroImage';
import FlightCard from '@/components/Itinerary/FlightCard';
import HotelCard from '@/components/Itinerary/HotelCard';
import ActivityCard from '@/components/Itinerary/ActivityCard';
import axios from 'axios';
import Footer from '@/components/Footer/Footer';
import { useRouter } from 'next/router';
import Add from '@/components/Add/Add';
import { flightData } from '@/components/Itinerary/flightData';
import { hotelData } from '@/components/Itinerary/hotelData';
import { activityData } from '@/components/Itinerary/activityData';
import { getData } from './api/proxy/findSearch';
import Box from '@mui/material/Box';

export default function Itinerary({ contentViaje = [] }) {
  const router = useRouter();
  const [tripData, setTripData] = useState({});
  const [findSearch, setFindSearch] = useState({});

  const { id } = router.query;
  console.log(tripData, 'tripData');
  console.log(router, 'se armooooooo');
  useEffect(() => {
    getIntineraryData(id);
  }, [id]);
  
  const getIntineraryData = async (tripId) => {
    //console.log(tripId, 'tripIdtripIdtripId');
    try {
      const response = await axios.get(`https://nomada-backend-production.up.railway.app/api/v1/viajes/${tripId}`);
      console.log('statusCode', contentViaje);

      if (response.status === 200) {
        setTripData(response.data);
        const params = {destini: tripData.destino, paisDestino: tripData.paisDestino}
        setFindSearch(async() =>  await getData({params}))
      }
    } catch (error) {
      console.log(error);
      return {
        props: {
          contentViaje: [],
        },
      };
    }
  };
console.log(findSearch)
  return (
    <>
      <NavbarTwo />

      <HeroImage viajeData={tripData} />
      <Add destino={{ ciudad: tripData.destino, pais: tripData.paisDestino }} />

      <Box
        sx={{
          margin: 5,
        }}
      >
        <FlightCard flightData={flightData} />

        <HotelCard hotelData={hotelData} />

        <ActivityCard activityData={activityData} />
      </Box>

      <Footer />
    </>
  );
}
