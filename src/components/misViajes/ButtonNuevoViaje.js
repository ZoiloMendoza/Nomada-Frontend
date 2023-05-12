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
          borderRadius: '10px',
          padding: '10px 20px',
          textTransform: 'none',
          color: 'black',
          fontFamily: 'Inter, sans-serif',
          fontSize: '20px',
        }}
      >
        Agregar un nuevo viaje
      </Button>
    </Link>
  );
};

export default ButtonNuevoViaje;
