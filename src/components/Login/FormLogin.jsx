import { Box, TextField, Grid, Card, CardContent } from '@mui/material';
import { useState } from 'react';

function FormLogin() {
  const [formData, setFormData] = useState({
    correo: '',
    constraseña: '',
  });
  return (
    <div className='Formulario'>
      <header className='Form-header'>
        <h2> Inicia sesión con correo electrónico </h2>
        <Box my={2}>
          <Grid container direction='row' spacing={5}>
            <Grid item xs={18} sm={18} md={18} lg={18} xl={18}>
              <Card>
                <CardContent>
                  <TextField
                    error={false}
                    label='correo electrónico'
                    type='text'
                    name='correo electrónico'
                    margin='dense'
                    fullWidth
                    variant='outlined'
                  />
                </CardContent>
                <Grid item xs={18} sm={18} md={18} lg={18} xl={18}>
                  <Card>
                    <CardContent>
                      <TextField
                        error={false}
                        label='contraseña'
                        type='text'
                        name='contraseña'
                        margin='dense'
                        fullWidth
                        variant='outlined'
                      />
                    </CardContent>
                  </Card>
                </Grid>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </header>
    </div>
  );
}
export default FormLogin;
