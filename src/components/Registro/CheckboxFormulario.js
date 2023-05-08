import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export default function CheckboxFormulario() {
  return (
    <FormGroup>
      <div>
        <FormControlLabel
          sx={{ fontFamily: 'Inter, sans-serif' }}
          control={<Checkbox />}
          label='He leído y acepto los términos y condiciones'
        />
      </div>
    </FormGroup>
  );
}
