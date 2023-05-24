import { styled } from '@mui/system';
import { Button, ButtonGroup } from '@mui/material';
import { Link } from '@mui/material';
import { useRouter } from 'next/router';
const AddSection = styled('div')(({ theme }) => ({
  backgroundColor: '#EAEDED',
  borderRadius: '5px',
  width: '100%',
  '& > *': {
    margin: theme.spacing(1),
  },
}));

const AddButton = styled(Button)(() => ({
  backgroundColor: '#E91E63',
  border: 'none',
  color: '#FFFFFF',
  cursor: 'pointer',
  fontSize: '16px',
  fontWeight: 'bold',
  margin: '10px',
  padding: '10px 20px',
  transition: 'all 0.3s ease',
  textAlign: 'center',
  width: '100%;',
  '&:hover': {
    backgroundColor: '#6C6D7F',
    color: '#FFFFFF',
    border: '#6C6D7F',
    transform: 'scale(0.9)',
    transitionDuration: '0.3s ease',
  },
}));

const AddButtonTwo = styled(Button)(() => ({
  backgroundColor: '#2B2E4A',
  border: 'none',
  color: '#FFFFFF',
  cursor: 'pointer',
  fontSize: '16px',
  fontWeight: 'bold',
  margin: '10px',
  padding: '10px 20px',
  transition: 'all 0.3s ease',
  textAlign: 'center',
  width: '100%;',
  '&:hover': {
    backgroundColor: '#6C6D7F',
    color: '#FFFFFF',
    border: '#6C6D7F',
    transform: 'scale(0.9)',
    transitionDuration: '0.3s ease',
  },
}));
const AddButtonGroup = styled(ButtonGroup)(() => ({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'space-evenly',
  alignItems: 'center',
}));

export default function Add({ destino, destinoSeleccionado }) {
  const router = useRouter();
  const { id } = router.query;
  const encodedDestino = encodeURIComponent(destinoSeleccionado);
  console.log(destino,'DESTINO');
  console.log(encodedDestino,'ENCODEDESTINO')

  return (
    <AddSection>
      <AddButtonGroup aria-label='button group'>
        <Link href={`/crear-viaje?id=${id}`}>
          <AddButton>Nuevo destino</AddButton>
        </Link>
        <Link href={`/addhotel?destino=${destinoSeleccionado}`}>
          <AddButton>Hospedaje</AddButton>
        </Link>
        <Link href={`/search?destino=${encodedDestino}`}>
        {/*`/search?latitude=${destino?.latitude}&longitude=${destino?.longitude}&idRuta=${destino?.idRuta}`*/}
          <AddButton>Buscar actividades</AddButton>
        </Link>
        <Link href='/map'>
          <AddButtonTwo>Mapa</AddButtonTwo>
        </Link>
      </AddButtonGroup>
    </AddSection>
  );
}
