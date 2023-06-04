import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, TextField, Button, List, ListItem, ListItemText } from '@mui/material';
import axios from 'axios';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { useRouter } from 'next/router';
import { Delete as DeleteIcon } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';

const URLRAILWAY = process.env.NEXT_PUBLIC_BACKEND;
const styles = {
  modal: {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalContent: {
    backgroundColor: '#FFFFFF',
    padding: '20px',
    borderRadius: '5px',
  },

  emailList: {
    marginTop: '20px',
    listStyle: 'none',
  },
};

const AddToGroup = ({ viajeData, openModal, closeModal }) => {
  const router = useRouter();
  const { id } = router.query;
  const [email, setEmail] = useState('');
  const [collaborators, setCollaborators] = useState([]);
  const [status, setStatus] = useState('');
  const [roleInvitado, setRoleInvitado] = useState('staff')
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
 
  useEffect(() => {
    if (id) {
      const fetchCollaborators = async () => {
        try {
          const response = await axios.get(`${URLRAILWAY}/api/v1/viajes/${id}`);
          setCollaborators(response.data.colaboradores);
        } catch (error) {
          console.error(error);
        }
      };
      fetchCollaborators();
    }  
}, [openModal]);

  const handleClose = () => {
    closeModal();
  };
 
  const guardarCorreo = async (e) => {
    e.preventDefault();
    try {
      if (email.trim() !== '' && !collaborators.some(collaborator => collaborator.email === email)) {
        console.log(email, ' validacion ultima')
        const buscarCorreo = await axios.post(`${URLRAILWAY}/api/v1/colaboradores/search`, { email: email });
        if (buscarCorreo.status == 200) {
          setStatus('success');
          const { idUser, name, email } = buscarCorreo.data;
          console.log(buscarCorreo.data, 'buscar correo')
          const nuevoColaborador = { viajeId: id, usuarioId: idUser, nombre: name, email: email, role: roleInvitado };
          console.log(nuevoColaborador, 'nuevo colaborador')
          const registroColaborador = await axios.post(`${URLRAILWAY}/api/v1/colaboradores`, nuevoColaborador);
          console.log(registroColaborador.data, 'validacion del post')
          const nuevoColaboradorConId = registroColaborador.data;
          setCollaborators([...collaborators, nuevoColaboradorConId]);
          setEmail('');
          return
        }
      }
    } catch (error) {
      setStatus('error');
    }
  };
  
  



  const borrarColaborador = async (idColaborador) => {
    try {
      const colaboradorEliminado = await axios.delete(`${URLRAILWAY}/api/v1/colaboradores/${idColaborador}`)
      if (colaboradorEliminado.status === 200) {
        setCollaborators((prevCollaborators) => prevCollaborators.filter((colaborador) => colaborador._id !== idColaborador));
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Modal sx={styles.modal} open={openModal} onClose={handleClose}>
        <Box sx={styles.modalContent}>
          <Stack sx={{ width: '100%' }} spacing={2}>
            {status == 'success' && <Alert severity='success'>Viaje compartido!</Alert>}
            {status == 'error' && <Alert severity='error'>Error </Alert>}
          </Stack>
          <Typography variant='h5'>Ingresa el email de tus acompañantes</Typography>
          <form>
            <TextField
              type='email'
              value={email}
              onChange={handleEmailChange}
              placeholder='Ingresa email'
              fullWidth
              margin='normal'
              variant='filled'
            />
            <FormControl sx={{ display: 'block'}}>
              <FormLabel id="demo-row-radio-buttons-group-label">Permisos</FormLabel>
                <RadioGroup
                row
                 aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                value={roleInvitado}
                onChange={(e) => setRoleInvitado(e.target.value)}
                >
                <FormControlLabel value="admin" control={<Radio />} label="Editar" />
                <FormControlLabel value="staff" control={<Radio />} label="Lectura" />
                </RadioGroup>
            </FormControl>
            <Button type='button' variant='contained' color='primary' onClick={guardarCorreo} role='button'>
              Agregar
            </Button>

            <List sx={styles.emailList}>
              <Typography variant='h5'>Viajeros:</Typography>
              {collaborators.map((collaborator, index) => (
                <ListItem key={collaborator._id}>
                  <ListItemText primary={collaborator.email} />
                  <IconButton onClick={() => borrarColaborador(collaborator._id)}>
                    <DeleteIcon
                      sx={{
                        width: '20px',
                        color: '#E91E63',
                        opacity: '0.5',
                      }}
                    />
                  </IconButton>
                </ListItem>
              ))}
            </List>
            {/*<Button type='submit' variant='contained' color='primary'>
              Guardar
            </Button>*/}
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default AddToGroup;
