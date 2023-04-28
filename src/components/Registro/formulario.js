import { Box, TextField, Grid, Card, CardContent } from '@mui/material';
import CheckboxFormulario from './Checkbox';
import ButtonForm from './ButtonForm';
import BoxRegistro from './BoxRegistro';
import { useState } from 'react';

function Formulario() {
  const [formData, setFormData] = useState({
    usuario: '',
    correo: '',
    contraseña: '',
  });
  const { usuario, correo, contraseña } = formData;
  const handleOnChange = (e) => {
    console.log([e.target.name], e.target.value);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (usuario, correo, contraseña) => {
    alert('datos formulario', usuario.correo, contraseña);
  };
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
                    label='usuario'
                    type='text'
                    name='usuario'
                    value={formData.usuario}
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
                        label='correo electronico'
                        type='text'
                        name='correo electronico'
                        value={formData.correo}
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
                            label='contraseña'
                            type='password'
                            name='contraseña'
                            value={formData.contraseña}
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
                                label='confirmar contraseña'
                                type='password'
                                name='confirmar contraseña'
                                margin='dense'
                                fullWidth
                                variant='outlined'
                              />
                            </CardContent>
                            <CheckboxFormulario />
                            <ButtonForm size='medium' onClick={() => handleSubmit(usuario, correo, contraseña)} />
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
