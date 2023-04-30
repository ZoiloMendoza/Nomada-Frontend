import Button from '@mui/material/Button';

const ButtonAdd = () => {
  const customColor = '#E91E63';

  return (
    <Button
      variant='contained'
      style={{
        backgroundColor: customColor,
        borderRadius: '50px',
        padding: '10px 20px',
        textTransform: 'none',
      }}
    >
      Agregar
    </Button>
  );
};

export default ButtonAdd;
