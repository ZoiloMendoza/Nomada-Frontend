import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function ButtonForm() {
  return (
    <Stack direction='row' spacing={2}>
      <Button variant='contained' color='success'>
        Crear cuenta
      </Button>
    </Stack>
  );
}
