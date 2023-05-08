import { Box, TextField, Grid, Card, CardContent, Typeography } from '@mui/material';
import { useState, useEffect } from 'react';
import ButtonLogin from './ButtonLogin';
import CheckboxLogin from './CheckboxLogin';

//nose si agregar lo siguiente
function FormLogin() {
  const [formData, setFormData] = useState({
    correo: '',
    constraseña: '',
  });
  const addUser = async () => {
    const userPost = await axios.post('https://nomada-backend-production.up.railway.app/api/v1/login', formData);
    console.log('statusCode', userPost.status);
    if (userPost.status !== 201) {
      console.log('error al insertar');
    } else {
      setFormData(userPost.data._id);
    }
  };

  return (
    <Grid containter justifyContent='center'>
      <h2> Inicia sesión con correo electrónico </h2>
      <Box my={6}>
        <Grid container justifyContent='center' direction='row'>
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
      </Box>
      <Grid my={4} justifyContent='center' direction='row' container>
        <ButtonLogin variant='contained' sx={{ fontSize: 24 }} onClick={addUser} />
      </Grid>
      <Grid item xs={50} style={{ textAlign: 'center' }}>
        <CheckboxLogin />
      </Grid>
    </Grid>
  );
}
export default FormLogin;
