import React from 'react';
import { makeStyles } from '@mui/styles';
import { Box, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const useStyles = makeStyles((theme) => ({
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
    padding: theme.spacing(4),
    borderRadius: theme.spacing(2),
    boxShadow: '0px 3px 12px rgba(0, 0, 0, 0.3)',
  },
  closeIcon: {
    position: 'absolute',
    top: theme.spacing(1),
    right: theme.spacing(1),
  },
}));

const PopupBox = ({ open, onClose, children }) => {
  const classes = useStyles();

  return (
    open && (
      <Box className={classes.root}>
        <Box className={classes.content}>
          <IconButton className={classes.closeIcon} onClick={onClose}>
            <CloseIcon />
          </IconButton>
          {children}
        </Box>
      </Box>
    )
  );
};

export default PopupBox;
