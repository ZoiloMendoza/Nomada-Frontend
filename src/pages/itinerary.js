import { useState, useEffect } from 'react';
import ScrollToTop from '@/components/common/ScrollToTop';
import HeroImage from '@/components/Itinerary/HeroImage';
import axios from 'axios';
import Add from '@/components/Add/Add';
import Box from '@mui/material/Box';
import { useMediaQuery } from '@mui/material';
import TabDestinos from '@/components/Itinerary/TabsDestinos';
import TabsDestinosMobile from '@/components/Itinerary/TabsDestinosMobile';
import { useAuth } from '@/utils/useAuth';
import { useRouter } from 'next/router';
import CircularProgress from '@mui/material/CircularProgress';
const URLRAILWAY = process.env.NEXT_PUBLIC_BACKEND;

export default function Itinerary() {
  const usuario = useAuth();
  const router = useRouter();
  const tripId = router.query.id;
  const [contentViaje, setContentViaje] = useState(null);
  const [loading, setLoading] = useState(true);
  const [roleInvitado, setRoleInvitado] = useState(null);
  const [roleUsuario, setRoleUsiario] = useState(null);
  const [error, setError] = useState(null);
  const [destinoSeleccionado, setDestinoSeleccionado] = useState(contentViaje?.rutas[0]?.transporte?.destino ?? '');
  const isMobile = useMediaQuery((theme) => (theme ? theme.breakpoints.down('sm') : '(max-width:600px)'));
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${URLRAILWAY}/api/v1/viajes/${tripId}`);
        if (response.status === 200) {
          setContentViaje(response.data);
          setLoading(false);
        }
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    if(tripId){
    fetchData();
    }
  }, [tripId]);

  useEffect(() => {
    const validacionViaje = () => {
      try {
        if (usuario && usuario.idUser === contentViaje?.administradorViaje) {
          setRoleUsiario('admin');
          return;
        }
        if (contentViaje.colaboradores.length > 0) {
          const invitado = contentViaje.colaboradores.find((colaborador) => colaborador.usuarioId === usuario?.idUser);
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
    if (usuario && contentViaje) {
      validacionViaje();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usuario, contentViaje]);
  
  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }
  if (error) {
    return <p>Error: {error.message}</p>;
  }

  //console.log('contentViaje', contentViaje);

  const updateDestinoSeleccionado = (destino) => {
    setDestinoSeleccionado(destino);
    console.log('hola', destino)
  };
 
  const arregloDestinos = contentViaje?.rutas.map((transporte) => transporte?.transporte?.destino);
  const idRutaElegida = arregloDestinos?.indexOf(destinoSeleccionado);
  console.log(idRutaElegida, 'idRUta')
  const imagenFondo = contentViaje?.rutas[idRutaElegida === -1 ? 0 : idRutaElegida]?.transporte?.imagen;
  
  return (
    <Box sx={{ backgroundColor: '#EAEDED' }}>
      <HeroImage viajeData={contentViaje} imagenFondo={imagenFondo} />
      {(roleUsuario === 'admin' || roleInvitado === 'admin') && (
        <Add destinoSeleccionado={destinoSeleccionado} destino={contentViaje?.rutas[idRutaElegida === -1 ? 0 : idRutaElegida]?._id} />
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
