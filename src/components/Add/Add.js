import { styled } from '@mui/system';
import { Button, ButtonGroup } from '@mui/material';
import { Link } from '@mui/material';

const AddSection = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#EAEDED',
  borderRadius: '5px',
  width: '100%',
  '& > *': {
    margin: theme.spacing(1),
  },
}));

const AddButton = styled(Button)(() => ({
  backgroundColor: '#6C6D7F',
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
}));

const AddButtonTwo = styled(Button)(() => ({
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
}));
const AddButtonGroup = styled(ButtonGroup)(() => ({
  display: 'flex',
  flexDirection: 'column',
  flexWrap: 'wrap',
  justifyContent: 'center',
  alignItems: 'center',
}));

export default function Add() {
  return (
    <AddSection>
      <AddButtonGroup orientation='vertical' color='primary' aria-label='vertical outlined primary button group'>
        <Link href='/crear-viaje'>
          <AddButton>Nuevo destino</AddButton>
        </Link>
        <Link href='/addhotel'>
          <AddButton>Hospedaje</AddButton>
        </Link>
        <Link href='/search'>
          <AddButton>Buscar actividades</AddButton>
        </Link>
        <Link href='/map'>
          <AddButtonTwo>Mapa</AddButtonTwo>
        </Link>
      </AddButtonGroup>
    </AddSection>
  );
}
