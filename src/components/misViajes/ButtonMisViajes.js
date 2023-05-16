import Button from '@mui/material/Button';
import Link from 'next/link';

const ButtonMisViajes = () => (
  <Link href='/misviajes'>
    <Button
      href='/misviajes'
      variant='contained'
      style={{
        backgroundColor: 'gray',
        borderRadius: '10px',
        padding: '10px 40px',
        textTransform: 'none',
        alignItems: 'center',
      }}
    >
      Mis Viajes
    </Button>
  </Link>
);

export default ButtonMisViajes;
