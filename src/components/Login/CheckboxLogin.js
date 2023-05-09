import * as React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export default function CheckboxLogin() {
  return (
    <FormGroup>
      <div>
        <FormControlLabel required control={<Checkbox />} label='Recuérdame' sx={{ fontFamily: 'Inter, sans-serif' }} />
      </div>
    </FormGroup>
  );
}
