import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button, List, ListItem, ListItemText } from '@mui/material';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

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
  const [email, setEmail] = useState('');
  const [emailsList, setEmailsList] = useState([]);
  const [status, setStatus] = useState('');
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleClose = () => {
    closeModal();
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const resultado = await axios.post('/fgher', { coreos: emailsList });
      if (resultado.status == 200) {
        setStatus('success');
      } else setStatus('error');
    } catch (error) {
      console.log(error);
      setStatus('error');
    }
  };
  const guardarCorreos = (e) => {
    e.preventDefault();
    if (email.trim() !== '' && !emailsList.includes(email)) {
      setEmailsList([...emailsList, email]);
      setEmail('');
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
          <form onSubmit={handleFormSubmit}>
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
