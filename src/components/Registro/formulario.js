import { Box, TextField, Grid, Card, CardContent, Typography } from '@mui/material';
import CheckboxFormulario from './CheckboxFormulario';
import ButtonForm from './ButtonForm';
import BoxRegistro from './BoxRegistro';
import { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
//import theme from './TemaConfig';

function Formulario() {
  const [confirmarPassword, setConfirmarPaswordd] = useState({
    confirmar: '',
  });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'admin',
    password: '',
  });
  const { name, email, password } = formData;

  const handleOnChange = (e) => {
    console.log([e.target.name], e.target.value);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleOnChangeConfirmarPassword = (e) => {
    console.log([e.target.name], e.target.value);
    setConfirmarPaswordd({ ...confirmarPassword, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (name, email, password) => {
    if (password !== confirmarPassword.confirmar) {
      alert('Las contraseñas no coinciden.');
      return;
    }
    console.log('enviado', formData);
    try {
      const userPost = await axios.post('https://nomada-backend-production.up.railway.app/api/v1/signup', formData);
      console.log('statusCode', userPost.status);
      if (userPost.status == 201) {
        console.log('Usuario creado exitosamente');
        setFormData({
          name: '',
          email: '',
          password: '',
        });
        setConfirmarPaswordd({
          confirmar: '',
        });
        alert('Usuario creado correctamente', name, email, password);
      } else {
        console.log('Error al insertar');
      }
    } catch (error) {
      console.error('Error en la petición:', error);
      alert('Error al crear el usuario. Por favor, inténtalo de nuevo.');
    }
  };

  return (
    <div className='Formulario'>
      <BoxRegistro />
      <Typography align='center' variant='h4' sx={{ fontFamily: 'Inter, sans-serif', fontSize: 30 }}>
        {' '}
        Por favor, ingresa los siguientes datos para crear tu cuenta en Nomadapp{' '}
      </Typography>
      <Box
        my={1}
        style={{
          margin: '10px',
          width: '50vw',
          textAlign: 'center',
        }}
      >
        <Grid container direction='row' spacing={5}>
          <Grid item xs={18} sm={18} md={18} lg={18} xl={18}>
            <Card>
              <CardContent>
                <TextField
                  variant='filled'
                  error={false}
                  label='usuario'
                  type='text'
                  name='name'
                  value={formData.name || ''}
                  onChange={handleOnChange}
                  margin='dense'
                  fullWidth
                  sx={{ fontFamily: 'Inter, sans-serif' }}
                />
              </CardContent>
              <Grid item xs={18} sm={18} md={18} lg={18} xl={18}>
                <Card>
                  <CardContent>
                    <TextField
                      variant='filled'
                      error={false}
                      label='correo electrónico'
                      type='text'
                      name='email'
                      value={formData.email || ''}
                      onChange={handleOnChange}
                      margin='dense'
                      fullWidth
                      sx={{ fontFamily: 'Inter, sans-serif' }}
                    />
                  </CardContent>
                  <Grid item xs={18} sm={18} md={18} lg={18} xl={18}>
                    <Card>
                      <CardContent>
                        <TextField
                          sx={{ fontFamily: 'Inter, sans-serif' }}
                          variant='filled'
                          error={false}
                          label='contraseña'
                          type='password'
                          name='password'
                          value={formData.password || ''}
                          onChange={handleOnChange}
                          margin='dense'
                          fullWidth
                        />
                      </CardContent>
                      <Grid item xs={18} sm={18} md={18} lg={18} xl={18}>
                        <Card>
                          <CardContent>
                            <TextField
                              sx={{ fontFamily: 'Inter, sans-serif' }}
                              variant='filled'
                              error={false}
                              label='confirmar contraseña'
                              type='password'
                              name='confirmar'
                              value={confirmarPassword.confirmar || ''}
                              onChange={handleOnChangeConfirmarPassword}
                              margin='dense'
                              fullWidth
                            />
                          </CardContent>
                          <Grid item xs={12} style={{ textAlign: 'center' }}>
                            <CheckboxFormulario />
                          </Grid>
                          <Link legacyBehavior href='/login'>
                            <p>
                              ¿Ya tienes una cuenta? <a style={{ color: 'blue', cursor: 'pointer' }}>Inicia sesión</a>
                            </p>
                          </Link>
                          <Grid my={4} justifyContent='center' direction='row' container>
                            <Link href='/login'>
                              <ButtonForm size='medium' onClick={() => handleSubmit(name, email, password)} />
                            </Link>
                          </Grid>
                        </Card>
                      </Grid>
                    </Card>
                  </Grid>
                </Card>
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
export default Formulario;
