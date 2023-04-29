import { Box, TextField, Grid, Card, CardContent } from '@mui/material';
import CheckboxFormulario from './CheckboxFormulario';
import ButtonForm from './ButtonForm';
import BoxRegistro from './BoxRegistro';
import { useState, useEffect } from 'react';
import axios from 'axios';

function Formulario() {
  const [trigger, setTrigger] = useState(false);
  const [confirmarPassword, setConfirmarPaswordd] = useState({
    passwordConfirmar: '',
  });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
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

  const handleSubmit = (name, email, password) => {
    console.log('enviado', formData);
    alert('Usuario creado correctamente', name, email, password);
    setTrigger(true);
  };
  useEffect(() => {
    if (trigger) {
      const addUser = async () => {
        const userPost = await axios.post('https://nomada-backend-production.up.railway.app/api/v1/users', formData);
        console.log('statusCode', userPost.status);
        if (userPost.status !== 201) {
          console.log('error al insertar');
        } else {
          setFormData(userPost.data._id);
        }
      };
      addUser();
      setTrigger(false);
    }
  }, [trigger]);
  return (
    <div className='Formulario'>
      <header className='Form-header'>
        <BoxRegistro />
        <h2> Por favor, ingresa los siguientes datos para crear tu cuenta en Nomadapp </h2>
        <Box my={2}>
          <Grid container direction='row' spacing={5}>
            <Grid item xs={18} sm={18} md={18} lg={18} xl={18}>
              <Card>
                <CardContent>
                  <TextField
                    error={false}
                    label='name'
                    type='text'
                    name='name'
                    value={formData.name || ''}
                    onChange={handleOnChange}
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
                        label='email'
                        type='text'
                        name='email'
                        value={formData.email || ''}
                        onChange={handleOnChange}
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
                            label='password'
                            type='password'
                            name='password'
                            value={formData.password || ''}
                            onChange={handleOnChange}
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
                                label='confirmarPassword'
                                type='password'
                                name='confirmarPassword'
                                value={confirmarPassword.passwordConfirmar || ''}
                                onChange={handleOnChangeConfirmarPassword}
                                margin='dense'
                                fullWidth
                                variant='outlined'
                              />
                            </CardContent>
                            <CheckboxFormulario />
                            <ButtonForm size='medium' onClick={() => handleSubmit(name, email, password)} />
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
      </header>
    </div>
  );
}
export default Formulario;
