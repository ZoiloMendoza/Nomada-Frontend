import { Box, TextField, Grid, Card, CardContent } from '@mui/material';
import CheckboxFormulario from './Checkbox';
import ButtonForm from './ButtonForm';
import BoxRegistro from './BoxRegistro';

function Formulario() {
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
                        <Grid item xs={18} sm={18} md={18} lg={18} xl={18}>
                          <Card>
                            <CardContent>
                              <TextField
                                error={false}
                                label='confirmar contraseña'
                                type='text'
                                name='confirmar contraseña'
                                margin='dense'
                                fullWidth
                                variant='outlined'
                              />
                            </CardContent>
                            <CheckboxFormulario />
                            <ButtonForm />
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
