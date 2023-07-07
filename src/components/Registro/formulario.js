import { Box, TextField, Grid, Card, CardContent, Typography, Button } from '@mui/material';
//import CheckboxFormulario from './CheckboxFormulario';
//import ButtonForm from './ButtonForm';
import { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
//import theme from './TemaConfig';
import { useRouter } from 'next/router';
//import React from 'react';
//import { Formik, Form, Field } from 'formik';

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

function ButtonForm({ size, onClick, disabled }) {
  return (
    <Button variant='contained' size={size} color='primary' onClick={onClick} disabled={disabled}>
      Crear cuenta
    </Button>
  );
}

function Formulario() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'admin',
    password: '',
    confirmar: '',
  });
  const [status, setStatus] = useState('');

  const handleOnChange = (e) => {
    console.log([e.target.name], e.target.value);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  //const handleOnChangeConfirmarPassword = (e) => {
  //  console.log([e.target.name], e.target.value);
  //  setConfirmarPassword({ ...confirmarPassword, [e.target.name]: e.target.value });
  //};

  const handleSubmit = async (name, email, password, confirmar) => {
    if (password !== confirmar) {
      setStatus('error');
      return;
    }
    console.log('enviado', formData);
    try {
      const userPost = await axios.post(`${URLRAILWAY}/api/v1/signup`, formData);
      console.log('statusCode', userPost.status);
      if (userPost.status == 201) {
        console.log(userPost);
        console.log('Usuario creado exitosamente');
        const usuario = {
          ...userPost.data,
        };
        localStorage.setItem('usuarioLogeado', JSON.stringify(usuario));
        setStatus('success');

        setTimeout(() => {
          router.push('/inicio');
        }, 1500);

        //alert('Usuario creado correctamente', name, email, password);
      } else {
        setStatus('error');
        console.log('Error al insertar');
      }
    } catch (error) {
      console.error('Error en la petición:', error);
      setStatus('error');
    }
  };

  const isFormComplete = () =>
    formData.name !== '' &&
    formData.email !== '' &&
    formData.password !== '' &&
    formData.confirmar !== '' &&
    formData.password === formData.confirmar;

  return (
    <div className='Formulario'>
      <Typography align='center' variant='h5' sx={{ paddingTop: '5vh' }}>
        {' '}
        Por favor, ingresa los siguientes datos para crear tu cuenta en Nomadapp{' '}
      </Typography>

      <Box sx={style.formulario}>
        <Grid container direction='row' spacing={5}>
          <Grid item xs={12}>
            <Card>
              <Stack sx={{ width: '100%' }} autoHideDuration={5000} spacing={2}>
                {status === 'success' && (
                  <Alert severity='success'>
                    <AlertTitle>Éxito</AlertTitle>
                    Usuario creado correctamente!
                  </Alert>
                )}
                {status === 'error' && (
                  <Alert severity='error'>
                    <AlertTitle>Error</AlertTitle>
                    Ocurrió un error, verificar que las contraseñas coincidan.
                  </Alert>
                )}
              </Stack>
              <CardContent>
                <TextField
                  variant='filled'
                  error={false}
                  label='usuario'
                  type='text'
                  name='name'
                  value={formData.name}
                  onChange={handleOnChange}
                  margin='dense'
                  fullWidth
                  sx={{ fontFamily: 'Inter, sans-serif' }}
                />
                <TextField
                  variant='filled'
                  error={false}
                  label='correo electrónico'
                  type='text'
                  name='email'
                  value={formData.email}
                  onChange={handleOnChange}
                  margin='dense'
                  fullWidth
                  sx={{ fontFamily: 'Inter, sans-serif' }}
                />
                <TextField
                  sx={{ fontFamily: 'Inter, sans-serif' }}
                  variant='filled'
                  error={false}
                  label='contraseña'
                  type='password'
                  name='password'
                  helperText='Debe contener minimo 8 digitos, 1 mayuscula y 1 carácter especial.'
                  value={formData.password}
                  onChange={handleOnChange}
                  margin='dense'
                  fullWidth
                  sx={{ fontFamily: 'Inter, sans-serif' }}
                />
                <TextField
                  sx={{ fontFamily: 'Inter, sans-serif' }}
                  variant='filled'
                  error={false}
                  label='confirmar contraseña'
                  type='password'
                  name='confirmar'
                  helperText='Debe contener minimo 8 digitos, 1 mayuscula y 1 carácter especial.'
                  value={formData.confirmar}
                  onChange={handleOnChange}
                  margin='dense'
                  fullWidth
                  sx={{ fontFamily: 'Inter, sans-serif' }}
                />
              </CardContent>
              <CardContent>
                <p>¿Ya tienes una cuenta?</p>
                <Link legacyBehavior href='/login'>
                  <a style={{ color: 'blue', cursor: 'pointer' }}>Inicia sesión</a>
                </Link>
              </CardContent>
              <CardContent>
                <Grid my={4} justifyContent='center' direction='row' container>
                  <ButtonForm
                    size='medium'
                    onClick={() => handleSubmit(formData.name, formData.email, formData.password, formData.confirmar)}
                    disabled={!isFormComplete()}
                  />
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default Formulario;
