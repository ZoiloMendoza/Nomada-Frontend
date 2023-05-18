import { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Menu as MenuIcon, AccountCircle, Dashboard, Settings, ExitToApp } from '@mui/icons-material';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
function NavbarTwo() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Replace with your login state
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  //const router = useRouter();

  useEffect(() => {
    const usuario = JSON.parse(localStorage.getItem('usuarioLogeado'));
    console.log(localStorage);

    if (!usuario) {
      //router.push('/login');
    }
    setIsLoggedIn(true)
  }, []);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    // Add your logout logic here
    setIsLoggedIn(false);
    handleClose();
  };

  return (
    <AppBar position='static' sx={{ backgroundColor: '#2B2E4A' }}>
      <Toolbar>
        <IconButton edge='start' color='inherit' aria-label='menu'>
          <MenuIcon />
        </IconButton>
        <Link legacyBehavior href='/'>
          <a>
            <Image src='/img/logo3.svg' alt='Logo' height='40' width='40' sx={{ color: '#FFFFFF' }} />
          </a>
        </Link>

        {!isMobile && (
          <Typography variant='h6' style={{ flexGrow: 1, justifyContent: 'center' }}>
            <Image src='/img/logo2.svg' alt='Logo' height='40' width='130' sx={{ color: '#FFFFFF' }} />
          </Typography>
        )}

        {isLoggedIn ? (
          <>
            {isMobile ? (
              <>
                <IconButton
                  edge='end'
                  aria-label='account of current user'
                  aria-haspopup='true'
                  onClick={handleMenu}
                  color='inherit'
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id='menu-appbar'
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                      <Dashboard />
                    </ListItemIcon>
                    <ListItemText primary='Dashboard' />
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                      <Settings />
                    </ListItemIcon>
                    <ListItemText primary='Account Settings' />
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                      <ExitToApp />
                    </ListItemIcon>
                    <ListItemText primary='Log Out' />
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <>
                <Button color='inherit'>Dashboard</Button>
                <Button color='inherit'>Configurar Cuenta</Button>
                <Button color='inherit' onClick={handleLogout}>
                  Log Out
                </Button>
              </>
            )}
          </>
        ) : (
          <>
            <Link href='/registro'>
              <Button sx={{ color: '#FFFFFF' }}>Regístrate</Button>
            </Link>
            <Link href='/login'>
              <Button sx={{ color: '#FFFFFF' }}>Log In</Button>
            </Link>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default NavbarTwo;
