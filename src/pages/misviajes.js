import NavbarTwo from '@/components/Navbar/NavbarTwo';
import Footer from '@/components/Footer/Footer';
import ButtonMisViajes from '@/components/misViajes/ButtonMisViajes';
import ButtonNuevoViaje from '@/components/misViajes/ButtonNuevoViaje';
import CardMisViajes from '@/components/misViajes/CardMisViajes';
import { Box } from '@mui/material';

export default function Registro() {
  return (
    <>
      <NavbarTwo />

      <Box>
        <ButtonMisViajes />
        <ButtonNuevoViaje />

        <CardMisViajes />
      </Box>

      <Footer />
    </>
  );
}
