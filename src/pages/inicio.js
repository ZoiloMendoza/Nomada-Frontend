import CrearViaje from '@/components/BoxCrearViaje/CrearViaje';
import MisViajes from '@/components/BoxCrearViaje/MisViajes';
import { Box } from '@mui/material';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
export default function Inicio() {
  const router = useRouter();

  useEffect(() => {
    const usuario = JSON.parse(localStorage.getItem('usuarioLogeado'));
    console.log(localStorage);

    if (!usuario) {
      router.push('/login');
    }
  }, []);
  return (
    <>
      <Box>
        <CrearViaje />
        <MisViajes />
      </Box>
    </>
  );
}
