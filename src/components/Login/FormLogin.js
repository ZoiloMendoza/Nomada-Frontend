import { Box, TextField, Grid, Card, CardContent } from '@mui/material';
import { useState } from 'react';
import ButtonLogin from './ButtonLogin';
import CheckboxLogin from './CheckboxLogin';
import axios from 'axios';
import Link from 'next/link';

function FormLogin() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const handleOnChange = (e) => {
    console.log([e.target.name], e.target.value);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const addUser = async () => {
    const userPost = await axios.post('https://nomada-backend-production.up.railway.app/api/v1/login', formData);
    console.log('statusCode', userPost.status);
    if (userPost.status !== 200) {
      console.log('error al insertar');
    } else {
      console.log('Logeado');
      setFormData({
        email: '',
        password: '',
      });
      alert('Usuario logeado correctamente');
    }
  };
  console.log(formData);

  return (
    <Grid justifyContent='center'>
      <h2> Inicia sesión con correo electrónico </h2>
      <Box my={6}>
        <Grid container justifyContent='center' direction='row'>
          <Card>
            <CardContent>
              <TextField
                error={false}
                label='correo electrónico'
                type='text'
                name='email'
                margin='dense'
                value={formData.email || ''}
                onChange={handleOnChange}
                fullWidth
                variant='outlined'
              />
            </CardContent>

            <CardContent>
              <TextField
                error={false}
                label='contraseña'
                type='password'
                name='password'
                margin='dense'
                value={formData.password || ''}
                onChange={handleOnChange}
                fullWidth
                variant='outlined'
              />
            </CardContent>
            <Grid item xs={50} style={{ textAlign: 'center' }}>
              <CheckboxLogin />
            </Grid>
            <Grid item xs={50} style={{ textAlign: 'center' }}>
              <p>¿Aún no tienes una cuenta?</p>
              <Link legacyBehavior href='/registro'>
                <a style={{ color: 'blue', cursor: 'pointer' }}>Regístrate aquí</a>
              </Link>
            </Grid>
          </Card>
        </Grid>
      </Box>
      <Grid my={4} justifyContent='center' direction='row' container>
        <Link href='/misviajes'>
          <ButtonLogin sx={{ fontSize: 24 }} onClick={addUser} />
        </Link>
      </Grid>
    </Grid>
  );
}
export default FormLogin;
