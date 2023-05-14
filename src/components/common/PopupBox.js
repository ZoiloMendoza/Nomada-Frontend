import React from 'react';
import { Box, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const styles = {
  root: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 9999,
  },
  content: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: '10px',
    borderRadius: '5px',
    boxShadow: '0px 3px 12px rgba(0, 0, 0, 0.3)',
  },
  closeIcon: {
    position: 'absolute',
    top: '5px',
    right: '5px',
  },
};

const PopupBox = ({ open, onClose, children }) =>
  open && (
    <Box sx={styles.root}>
      <Box sx={styles.content}>
        <IconButton sx={styles.closeIcon} onClick={onClose}>
          <CloseIcon />
        </IconButton>
        {children}
      </Box>
    </Box>
  );

export default PopupBox;
