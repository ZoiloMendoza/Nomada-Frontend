import { useState } from 'react';
//import Head from 'next/head';
import ScrollToTop from '@/components/common/ScrollToTop';
import HeroImage from '@/components/Itinerary/HeroImage';
import axios from 'axios';
//import { useRouter } from 'next/router';
import Add from '@/components/Add/Add';
import { getDataFindSearch } from './api/proxy/findSearch';
import Box from '@mui/material/Box';
import { useMediaQuery } from '@mui/material';
import TabDestinos from '@/components/Itinerary/TabsDestinos';
import TabsDestinosMobile from '@/components/Itinerary/TabsDestinosMobile';
const URLRAILWAY = process.env.NEXT_PUBLIC_BACKEND;

export default function Itinerary({ contentApi, contentViaje }) {
  const [destinoSeleccionado, setDestinoSeleccionado] = useState(contentViaje?.rutas[0]?.transporte.destino ?? '');
  const isMobile = useMediaQuery((theme) => (theme ? theme.breakpoints.down('sm') : '(max-width:600px)'));
 
  //console.log('contentApi', contentApi);
  console.log('contentViaje', contentViaje);
  //setTripData(contentViaje);
  //console.log(contentApi);
if(!contentViaje){
  return <div>Intentalo más tarde</div>
}
  const updateDestinoSeleccionado = (destino) => {
    setDestinoSeleccionado(destino);
    //const indice = contentViaje.rutas.indexOf(destino);
  };

  const arregloDestinos = contentViaje?.rutas.map((transporte) => transporte.transporte.destino);
  const idRutaElegida = arregloDestinos?.indexOf(destinoSeleccionado);
  //console.log(arregloDestinos)
  //console.log(contentViaje.rutas)
  return (
    <Box sx={{ backgroundColor: '#EAEDED' }}>
      <HeroImage viajeData={contentViaje} imagenFondo={contentViaje?.rutas[idRutaElegida]?.transporte?.imagen} />
      <Add
        destinoSeleccionado={destinoSeleccionado}
        destino={contentViaje?.rutas[idRutaElegida]._id}
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
      //const contentApi = await getDataFindSearch({ params });
      return {
        props: {
          contentApi: null,
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
