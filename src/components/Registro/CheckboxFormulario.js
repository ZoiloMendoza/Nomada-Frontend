import * as React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export default function CheckboxFormulario() {
  return (
    <FormGroup>
      <FormControlLabel required control={<Checkbox />} label='He leído y acepto los términos y condiciones' />
    </FormGroup>
  );
}
