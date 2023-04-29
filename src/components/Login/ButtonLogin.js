import Button from '@mui/material/Button';

const ButtonLogin = () => {
  const customColor = '#E91E63';

  return (
    <Button
      variant='contained'
      style={{
        backgroundColor: customColor,
        borderRadius: '10px',
        padding: '10px 40px',
        textTransform: 'none',
      }}
    >
      Iniciar sesión
    </Button>
  );
};

export default ButtonLogin;
