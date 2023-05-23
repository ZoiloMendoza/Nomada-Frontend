import { useState } from 'react';
//import Head from 'next/head';
import ScrollToTop from '@/components/common/ScrollToTop';
import HeroImage from '@/components/Itinerary/HeroImage';
import FlightCard from '@/components/Itinerary/FlightCard';
import HotelCard from '@/components/Itinerary/HotelCard';
import ActivityCard from '@/components/Itinerary/ActivityCard';
import axios from 'axios';
//import { useRouter } from 'next/router';
import Add from '@/components/Add/Add';
import { flightData } from '@/components/Itinerary/flightData';
import { hotelData } from '@/components/Itinerary/hotelData';
import { activityData } from '@/components/Itinerary/activityData';
import { getData } from './api/proxy/findSearch';
import Box from '@mui/material/Box';
import { useMediaQuery } from '@mui/material';
import TabDestinos from '@/components/Itinerary/TabsDestinos';
import TabsDestinosMobile from '@/components/Itinerary/TabsDestinosMobile';
const URLRAILWAY = process.env.NEXT_PUBLIC_BACKEND;

export default function Itinerary({ contentApi, contentViaje }) {
  const [destinoSeleccionado, setDestinoSeleccionado] = useState('');
  const isMobile = useMediaQuery((theme) => (theme ? theme.breakpoints.down('sm') : '(max-width:600px)'));
  if (!contentApi) {
    return <div>Intentalo más tarde</div>;
  }
  console.log('contentApi', contentApi);
  console.log('contentViaje', contentViaje);
  //setTripData(contentViaje);
  //console.log(contentApi);

  const updateDestinoSeleccionado = (destino) => {
    setDestinoSeleccionado(destino);
  };

  return (
    <Box sx={{ backgroundColor: '#EAEDED' }}>
      <HeroImage viajeData={contentViaje} imagenFondo={contentApi?.data[0]?.images?.original?.url} />
      <Add
        destinoSeleccionado={destinoSeleccionado}
        destino={{
          latitude: contentApi?.latitude,
          longitude: contentApi?.longitude,
          idRuta: contentViaje?.rutas[0]?._id,
        }}
      />
      {isMobile ? (
        <Box
          sx={{
            margin: 2,
          }}
        >
          <TabsDestinosMobile />
        </Box>
      ) : (
        <Box
          sx={{
            margin: 5,
          }}
        >
          <TabDestinos dataDestino={contentViaje} updateDestinoCallback={updateDestinoSeleccionado} />
          {/*<FlightCard flightData={flightData} />+/}

          {/*<HotelCard hotelData={hotelData} />*/}

          {/*<ActivityCard activityData={contentViaje.rutas[0].actividades} />*/}
        </Box>
      )}

      <ScrollToTop />
    </Box>
  );
}

export const getServerSideProps = async (context) => {
  const tripId = context.query.id;

  try {
    const response = await axios.get(`${URLRAILWAY}/api/v1/viajes/${tripId}`);

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
