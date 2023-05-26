import React from 'react';
import { Box, IconButton, Grid } from '@mui/material';
import { styled } from '@mui/system';
import CloseIcon from '@mui/icons-material/Close';

const GridItem = styled(Grid)(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  maxWidth: '50%',
  minWidth: '50%',
  maxHeight: '70vh',
  minHeight: '50vh',
  overflow: 'scroll',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#fff',
  borderRadius: '5px',
  boxShadow: '0px 3px 12px rgba(0, 0, 0, 0.3)',
  [theme.breakpoints.down('sm')]: {
    maxHeight: '70%',
    minHeight: '55%',
    maxWidth: '90%',
    minWidth: '85%',
    overflow: 'scroll',
    zIndex: 100,
  },
}));

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
  content: {},
  closeIcon: {
    position: 'absolute',
    top: '5px',
    right: '5px',
  },
};

const PopupBox = ({ open, onClose, children }) =>
  open && (
    <Box sx={styles.root}>
      <GridItem>
        <IconButton sx={styles.closeIcon} onClick={onClose}>
          <CloseIcon />
        </IconButton>
        {children}
      </GridItem>
    </Box>
  );

export default PopupBox;
