import Button from '@mui/material/Button';
import Link from 'next/link';

const ButtonNuevoViaje = () => {
  const customColor = '#E91E63';

  return (
    <Link href='/inicio'>
      <Button
        variant='contained'
        style={{
          backgroundColor: customColor,
          borderRadius: '5px',
          padding: '10px 20px',
          margin: '10px',
          textTransform: 'none',
          color: '#FFFFFF',
        }}
      >
        + NUEVO VIAJE
      </Button>
    </Link>
  );
};

export default ButtonNuevoViaje;
