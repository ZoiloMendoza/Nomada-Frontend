import { Box, TextField, Grid, Card, CardContent, Typography } from '@mui/material';
import { useState, useContext } from 'react';
import ButtonLogin from './ButtonLogin';
import CheckboxLogin from './CheckboxLogin';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { UserContext } from '@/context/userLogin';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
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

function FormLogin() {
  const userContextValues = useContext(UserContext);
  const { variableState, setVariableState } = userContextValues;
  const [status, setStatus] = useState('');
  console.log(variableState);
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const handleOnChange = (e) => {
    console.log([e.target.name], e.target.value);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const addUser = async () => {
    const userPost = await axios.post(`${URLRAILWAY}/api/v1/login`, formData);

    console.log('statusCode', userPost.status);
    if (userPost.status !== 200) {
      setStatus('error'); //console.log('error al insertar');
    } else {
      setStatus('seccess');
      console.log('Logeado');
      const usuario = {
        ...userPost.data,
      };
      setVariableState(usuario);
      localStorage.setItem('usuarioLogeado', JSON.stringify(usuario));
      router.push('/inicio');

      //alert('Usuario logeado correctamente');
    }
  };
  console.log(formData);

  return (
    <Grid justifyContent='center'>
      <Typography align='center' variant='h5' sx={{ paddingTop: '5vh' }}>
        {' '}
        Por favor, ingresa los siguientes datos de tu cuenta en Nomadapp{' '}
      </Typography>
      <Box my={8} sx={style.formulario}>
        <Grid container justifyContent='center' direction='row'>
          <Stack sx={{ width: '100%' }} spacing={2}>
            {status == 'success' && <Alert severity='success'>Usuario correcto!</Alert>}
            {status == 'error' && <Alert severity='error'>Error </Alert>}
          </Stack>
          <Grid item xs={18} sm={18} md={18} lg={18} xl={18}>
            <Card sx={{ padding: '3vh' }}>
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
                  variant='filled'
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
                  variant='filled'
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
        </Grid>
      </Box>
      <Grid my={4} justifyContent='center' direction='row' container>
        <ButtonLogin sx={{ fontSize: 24 }} onClick={addUser} />
      </Grid>
    </Grid>
  );
}
export default FormLogin;
