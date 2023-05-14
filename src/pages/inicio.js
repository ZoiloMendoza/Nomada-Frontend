import NavbarTwo from '@/components/Navbar/NavbarTwo';
import Footer from '@/components/Footer/Footer';
import CrearViaje from '@/components/BoxCrearViaje/CrearViaje';
import MisViajes from '@/components/BoxCrearViaje/MisViajes';
import { Box } from '@mui/material';
import { getUser } from '@/utils/auth';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
export default function Inicio() {
  const router = useRouter();

  useEffect(() => {
    const usuario = getUser();
    console.log(usuario);
    if (!usuario) {
      router.push('/login');
    }
  }, [router]);
  return (
    <>
      <NavbarTwo />

      <Box>
        <CrearViaje />
        <MisViajes />
      </Box>

      <Footer />
    </>
  );
}
