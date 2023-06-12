import { styled } from '@mui/system';
import { Button, ButtonGroup } from '@mui/material';
import { Link } from '@mui/material';
import { useRouter } from 'next/router';
import FlightIcon from '@mui/icons-material/Flight';
import HotelIcon from '@mui/icons-material/Hotel';
import MapIcon from '@mui/icons-material/Map';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';

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

export default function Add({ destinoSeleccionado, ruta}) {
  
  const router = useRouter();
  const { id } = router.query;
  const encodedDestino = encodeURIComponent(destinoSeleccionado);
  return (
    <AddSection>
      <AddButtonGroup aria-label='button group'>
        <Link href={`/crear-viaje?id=${id}`}>
          <AddButton>
            <FlightIcon />
            &nbsp; Nuevo destino
          </AddButton>
        </Link>
        <Link href={`/addhotel?destino=${destinoSeleccionado}&idRuta=${ruta._id}`}>
          <AddButton>
            <HotelIcon />
            &nbsp; Hospedaje
          </AddButton>
        </Link>
        <Link href={`/search?destino=${encodedDestino}&idRuta=${ruta._id}`}>
          {/*`/search?latitude=${destino?.latitude}&longitude=${destino?.longitude}&idRuta=${destino?.idRuta}`*/}

          <AddButton>
            <LocalActivityIcon />
            &nbsp; Buscar actividades
          </AddButton>
        </Link>
        <Link href={`/mapa?destino=${destinoSeleccionado}&idRuta=${ruta._id}&latitud=${ruta.transporte.latitud}&longitud=${ruta.transporte.longitud}`}>
          <AddButtonTwo>
            <MapIcon />
            &nbsp; Mapa
          </AddButtonTwo>
        </Link>
      </AddButtonGroup>
    </AddSection>
  );
}
