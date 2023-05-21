import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button, List, ListItem, ListItemText } from '@mui/material';

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

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleClose = () => {
    closeModal();
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (email.trim() !== '') {
      setEmailsList([...emailsList, email]);
      setEmail('');
    }
  };

  return (
    <>
      <Modal sx={styles.modal} open={openModal} onClose={handleClose}>
        <Box sx={styles.modalContent}>
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
            <Button type='submit' variant='contained' color='primary'>
              Submit
            </Button>
          </form>
          <List sx={styles.emailList}>
            <Typography variant='h5'>Viajeros:</Typography>
            {emailsList.map((email, index) => (
              <ListItem key={index}>
                <ListItemText primary={email} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Modal>
    </>
  );
};

export default AddToGroup;
