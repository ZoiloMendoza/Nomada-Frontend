import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, TextField, Button, List, ListItem, ListItemText } from '@mui/material';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { useRouter } from 'next/router';
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

const AddToGroup = ({ openModal, closeModal }) => {
  const router = useRouter();
  const { id } = router.query;
  const [email, setEmail] = useState('');
  const [emailsList, setEmailsList] = useState([]);
  const [status, setStatus] = useState('');
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  useEffect(() =>{
    try {
      const consultaDeColaboradores = async () => {
        const listaDeColaboradores = await axios.get(`${URLRAILWAY}/api/v1/colaboradores`)
        if(listaDeColaboradores.status == 200){
          console.log(listaDeColaboradores.data, 'get de colaboradores')
          const listaDeSoloCorreos = listaDeColaboradores.data.map((colaborador)=> colaborador.email);
          setEmailsList(listaDeSoloCorreos);
        }
        //setEmailsList();
      }
      consultaDeColaboradores()
    } catch (error) {
      console.log(error)
    }
  }, [])
  const handleClose = () => {
    closeModal();
  };

  /*const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const resultado = await axios.post(`/`,{email: emailsList});
      if (resultado.status == 200) {
        setStatus('success');
        console.log(resultado.data, 'respuesta api colaboradores')
      } else setStatus('error'); 
    } catch (error) {
      console.log(error);
      setStatus('error');
    }
  };*/

  const guardarCorreos = async (e) => {
    e.preventDefault();
    try {
        if(email.trim() !== '' && !emailsList.includes(email)) {
            const buscarCorreo = await axios.post(`${URLRAILWAY}/api/v1/colaboradores/search`,{ email: email });
            if(buscarCorreo.status == 200) {
                  setStatus('success');
                  console.log(buscarCorreo.data, 'respuesta api colaboradores')
                  const { idUser, name, email }= buscarCorreo.data
                  const nuevoColaborador = {viajeId: id, usuarioId: idUser, nombre: name, email: email, role: 'staff'}
                  console.log(nuevoColaborador, 'nuevoColaborador')
                  const registroColaborador = await axios.post(`${URLRAILWAY}/api/v1/colaboradores`, nuevoColaborador)
                  setEmailsList([...emailsList, email]);
                  setEmail('');
        }
      }
    } catch (error) {
      console.log(error);
      setStatus('error');
    }
  };

  return (
    <>
      <Modal sx={styles.modal} open={openModal} onClose={handleClose}>
        <Box sx={styles.modalContent}>
          <Stack sx={{ width: '100%' }} spacing={2}>
            {status == 'success' && <Alert severity='success'>Viaje compartido!</Alert>}
            {status == 'error' && <Alert severity='error'>Error </Alert>}
          </Stack>
          <Typography variant='h5'>Ingresa el email de tus acompañantes</Typography>
          <form >
            <TextField
              type='email'
              value={email}
              onChange={handleEmailChange}
              placeholder='Ingresa email'
              fullWidth
              margin='normal'
              variant='filled'
            />
            <Button type='button' variant='contained' color='primary' onClick={guardarCorreos} role='button'>
              Agregar
            </Button>

            <List sx={styles.emailList}>
              <Typography variant='h5'>Viajeros:</Typography>
              {emailsList.map((email, index) => (
                <ListItem key={index}>
                  <ListItemText primary={email} />
                </ListItem>
              ))}
            </List>
            <Button type='submit' variant='contained' color='primary'>
              Guardar
            </Button>
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default AddToGroup;
