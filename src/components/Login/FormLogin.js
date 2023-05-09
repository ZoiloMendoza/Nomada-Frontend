import { Box, TextField, Grid, Card, CardContent } from '@mui/material';
import { useState } from 'react';
import ButtonLogin from './ButtonLogin';
import CheckboxLogin from './CheckboxLogin';
import axios from 'axios';

//nose si agregar lo siguiente
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
    const userPost = await axios.post('http://localhost:5001/api/v1/login', formData);
    console.log('statusCode', userPost.status);
    if (userPost.status !== 200) {
      console.log('error al insertar');
    } else {
    }
  };
  console.log(formData);

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
                name='email'
                value={formData.email || ''}
                onChange={handleOnChange}
                margin='dense'
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
                value={formData.password || ''}
                onChange={handleOnChange}
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
