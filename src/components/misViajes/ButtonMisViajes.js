import Button from '@mui/material/Button';

const ButtonMisViajes = () => {
  const customColor = '#6C6D7F';

  return (
    <Button
      variant='contained'
      style={{
        backgroundColor: customColor,
        borderRadius: '10px',
        padding: '10px 20px',
        textTransform: 'none',
        alignItems: 'center',
      }}
    >
      Mis Viajes
    </Button>
  );
};

export default ButtonMisViajes;
