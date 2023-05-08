import Button from '@mui/material/Button';

const ButtonLogin = ({ onClick }) => {
  const customColor = '#E91E63';
  const click = () => {
    onClick();
  };
  return (
    <Button
      variant='contained'
      sx={{ fontSize: 16, fontFamily: 'Inter, sans-serif' }}
      onClick={click}
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
