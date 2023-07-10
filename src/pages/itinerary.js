import { useState, useEffect, useContext } from 'react';
import { useUserContext } from '@/context/userLogin';
import { RoleContext} from '@/context/roleContext';
import ScrollToTop from '@/components/common/ScrollToTop';
import HeroImage from '@/components/Itinerary/HeroImage';
import axios from 'axios';
import Add from '@/components/Add/Add';
import Box from '@mui/material/Box';
import { useMediaQuery } from '@mui/material';
import TabDestinos from '@/components/Itinerary/TabsDestinos';
import TabsDestinosMobile from '@/components/Itinerary/TabsDestinosMobile';
import { useRouter } from 'next/router';
import { SkeletonImagenItinerario } from '@/components/SkeletonsCards/SkeletonImagenItinerario';
import { SkeletonContenedorItinerario } from '@/components/SkeletonsCards/SkeletonContenedorItinerario';

const URLRAILWAY = process.env.NEXT_PUBLIC_BACKEND;

export default function Itinerary() {
  const { variableState } = useUserContext();
  const router = useRouter();
  const { id: tripId } = router.query;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [contentViaje, setContentViaje] = useState(null);
  const [destinoSeleccionado, setDestinoSeleccionado] = useState(null);
  const isMobile = useMediaQuery((theme) => (theme ? theme.breakpoints.down('sm') : '(max-width:600px)'));
  const usuario = variableState?.idUser;
  //const [roleInvitado, setRoleInvitado] = useState('staff');
  //const [roleUsuario, setRoleUsuario] = useState('staff');
  const { roleInvitado, setRoleInvitado, roleUsuario, setRoleUsuario } = useContext(RoleContext);
  useEffect(() => {
    const fetchTripData = async () => {
      try {
        const response = await axios.get(`${URLRAILWAY}/api/v1/viajes/${tripId}`);
        if (response.status === 200) {
          const tripData = response.data;
          setContentViaje(tripData);
          setDestinoSeleccionado(tripData?.rutas[0]?.transporte?.destino ?? '');
          setLoading(false);
        }
      } catch (error) {
        setError(error);
      }
    };

    if (tripId) {
      fetchTripData();
    }
  }, [tripId]);

  useEffect(() => {
    const validacionViaje = () => {
      try {
        if (contentViaje.administradorViaje === usuario) {
          setRoleUsuario('admin');
        } else {
          setRoleUsuario('staff');
        }
        if (contentViaje.colaboradores.length > 0) {
          const invitado = contentViaje.colaboradores.find((colaborador) => colaborador.usuarioId === usuario);
          if (invitado) {
            setRoleInvitado(invitado.role);
          }
        }
      } catch (error) {
        console.error('Error ValidacionViaje', error);
        setError(error);
      }
    };
    if (usuario && contentViaje) {
      validacionViaje();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usuario, contentViaje]);

  if (error) return <p>Error: {error.message}</p>;

  const updateDestinoSeleccionado = (destino) => {
    setDestinoSeleccionado(destino);
  };
  const arregloDestinos = contentViaje?.rutas.map((transporte) => transporte?.transporte?.destino);
  const idRutaElegida = arregloDestinos?.indexOf(destinoSeleccionado);
  const imagenFondo = contentViaje?.rutas[idRutaElegida]?.transporte?.imagen;
  
  console.log(roleInvitado, 'roleInvitado');
  console.log(roleUsuario, 'roleUsuario');
  

  return (
    <Box sx={{ backgroundColor: '#EAEDED' }}>
      {loading ? <SkeletonImagenItinerario /> : <HeroImage ruta={contentViaje?.rutas[idRutaElegida]} imagenFondo={imagenFondo} />}
      {(roleUsuario === 'admin' || roleInvitado === 'admin') && (
        <Add destinoSeleccionado={destinoSeleccionado} ruta={contentViaje?.rutas[idRutaElegida]} />
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
          {loading ? <SkeletonContenedorItinerario/> : <TabDestinos dataDestino={contentViaje} updateDestinoCallback={updateDestinoSeleccionado} />}
        </Box>
      )}
      <ScrollToTop />
    </Box>
  );
}
