import { Box, TextField, Grid, Card, CardContent, Typography } from '@mui/material';
import CheckboxFormulario from './CheckboxFormulario';
import ButtonForm from './ButtonForm';
import { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
//import theme from './TemaConfig';
import { useRouter } from 'next/router';

const URLRAILWAY = process.env.NEXT_PUBLIC_BACKEND;
const style = {
  formulario: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '0 auto',
    padding: '5vh 0',
    width: '50vw',
    textAlign: 'center',
  },
};

function Formulario() {
  //  const [isChecked, setIsChecked] = useState(false);
  const router = useRouter();
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
      const userPost = await axios.post(`${URLRAILWAY}/api/v1/signup`, formData);
      console.log('statusCode', userPost.status);
      console;
      if (userPost.status == 201) {
        console.log(userPost);
        console.log('Usuario creado exitosamente');
        const usuario = {
          ...userPost.data,
        };
        localStorage.setItem('usuarioLogeado', JSON.stringify(usuario));

        router.push('/inicio');

        //alert('Usuario creado correctamente', name, email, password);
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
      <Typography align='center' variant='h5' sx={{ paddingTop: '5vh' }}>
        {' '}
        Por favor, ingresa los siguientes datos para crear tu cuenta en Nomadapp{' '}
      </Typography>
      <Box sx={style.formulario}>
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
                            <CheckboxFormulario checked={isChecked} name='checkboxFormulario' />
                          </Grid>
                          <p>¿Ya tienes una cuenta?</p>
                          <Link legacyBehavior href='/login'>
                            <a style={{ color: 'blue', cursor: 'pointer' }}>Inicia sesión</a>
                          </Link>

                          <Grid my={4} justifyContent='center' direction='row' container>
                            <ButtonForm
                              size='medium'
                              onClick={() => handleSubmit(name, email, password)}
                              disabled={!isChecked}
                            />
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
