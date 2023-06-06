import { useState, useEffect } from 'react';
import ScrollToTop from '@/components/common/ScrollToTop';
import HeroImage from '@/components/Itinerary/HeroImage';
import axios from 'axios';
import Add from '@/components/Add/Add';
import Box from '@mui/material/Box';
import { useMediaQuery } from '@mui/material';
import TabDestinos from '@/components/Itinerary/TabsDestinos';
import TabsDestinosMobile from '@/components/Itinerary/TabsDestinosMobile';
import { useRouter } from 'next/router';
const URLRAILWAY = process.env.NEXT_PUBLIC_BACKEND;

export default function Itinerary({ contentViaje }) {
  //const [loading, setLoading] = useState(true);
  const [roleInvitado, setRoleInvitado] = useState(null);
  const [roleUsuario, setRoleUsiario] = useState(null);
  const [error, setError] = useState(null);
  const [destinoSeleccionado, setDestinoSeleccionado] = useState(contentViaje?.rutas[0]?.transporte?.destino ?? '');
  const isMobile = useMediaQuery((theme) => (theme ? theme.breakpoints.down('sm') : '(max-width:600px)'));
  const router = useRouter();

  useEffect(() => {
    const validacionViaje = () => {
      try {
        const usuario = JSON.parse(localStorage.getItem('usuarioLogeado'));
        if (!usuario) {
          router.replace('/login');
          return;
        }
        if (usuario.idUser === contentViaje.administradorViaje) {
          setRoleUsiario('admin');
          return;
        }
        if (contentViaje.colaboradores.length > 0) {
          const invitado = contentViaje.colaboradores.find((colaborador) => colaborador.usuarioId === usuario.idUser);
          if (invitado) {
            setRoleInvitado(invitado.role);
          }
        } else {
          //router.replace('/misviajes');
          return;
        }
      } catch (error) {
        console.error('Error fetching data', error);
        setError(error);
      }
    };
    validacionViaje();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (error) {
    return <p>Error: {error.message}</p>;
  }

  console.log('contentViaje', contentViaje);
  const updateDestinoSeleccionado = (destino) => {
    setDestinoSeleccionado(destino);
  };
  const arregloDestinos = contentViaje?.rutas.map((transporte) => transporte?.transporte?.destino);
  const idRutaElegida = arregloDestinos?.indexOf(destinoSeleccionado);

  return (
    <Box sx={{ backgroundColor: '#EAEDED' }}>
      <HeroImage viajeData={contentViaje} imagenFondo={contentViaje?.rutas[idRutaElegida]?.transporte?.imagen} />
      {(roleUsuario === 'admin' || roleInvitado === 'admin') && (
        <Add destinoSeleccionado={destinoSeleccionado} destino={contentViaje?.rutas[idRutaElegida]?._id} />
      )}
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
      return {
        props: {
          contentViaje: tripData,
        },
      };
    }
  } catch (error) {
    return {
      props: {
        contentViaje: null,
      },
    };
  }
};
