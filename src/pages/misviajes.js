//import ButtonMisViajes from '@/components/misViajes/ButtonMisViajes';
import ButtonNuevoViaje from '@/components/misViajes/ButtonNuevoViaje';
//import CardMisViajes from '@/components/misViajes/CardMisViajes';
import MisViajesCard from '@/components/misViajes/MisViajesCard';
import { Grid, Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
const URLRAILWAY = process.env.NEXT_PUBLIC_BACKEND;

const NoViajesMessage = () => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f5f5f5',
    }}
  >
    Usuario no tiene viajes por el momento ...
  </Box>
);

export default function MisViajes() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [viajesDelUsuario, setViajesDelUsuario] = useState([]);
  const [viajesInvidatos, setViajesInvitados] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usuario = JSON.parse(localStorage.getItem('usuarioLogeado'));
        if (!usuario) {
          router.push('/login');
          return;
        }
        const viajesDelUsuario = await axios.get(`${URLRAILWAY}/api/v1/users/${usuario.idUser}`);
        if (viajesDelUsuario.status === 200) {
          setViajesDelUsuario(viajesDelUsuario.data.viajes);
          console.log(viajesDelUsuario.data.viajes, 'viajes del usuario');
          setLoading(false);
        }
        const viajesColaborativos = await axios.get(`${URLRAILWAY}/api/v1/colaboradores/search/${usuario.idUser}`);
        if (viajesColaborativos.status === 200) {
          setViajesInvitados(viajesColaborativos.data);
          console.log(viajesColaborativos.data, 'viajes JUNTOS');
        }
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };
    fetchData();
  }, [router]);

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

  return (
    <Box sx={{ width: '100%', minHeight: '100vh', padding: '5px', backgroundColor: '#EAEDED' }}>
      <ButtonNuevoViaje />
      <Grid sx={{ padding: '15px' }} container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {viajesDelUsuario.length > 0 ? (
          viajesDelUsuario.map((viajes) => (
            <Grid item xs={12} md={6} key={viajes._id}>
              <MisViajesCard datosViajes={viajes} />
            </Grid>
          ))
        ) : (
          <NoViajesMessage />
        )}
        {viajesInvidatos.length > 0 ? (
          viajesInvidatos.map((viaje) => (
            <Grid item xs={12} md={6} key={viaje._id}>
              <h2>{`Viaje compartido por ${viaje.administradorViaje.name}`}</h2>
              <MisViajesCard datosViajes={viaje} />
            </Grid>
          ))
        ) : (
          <NoViajesMessage />
        )}
      </Grid>
    </Box>
  );
}
