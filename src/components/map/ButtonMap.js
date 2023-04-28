import React from 'react';
import Button from '@material-ui/core/Button';

const ButtonMap = () => {
  const customColor = '#E91E63';
  return (
    <Button
      variant='contained'
      style={{
        backgroundColor: customColor,
        borderRadius: '10px',
        padding: '10px 20px',
        textTransform: 'none',
      }}
      disableElevation
    >
      Map
    </Button>
  );
};
export default ButtonMap;
