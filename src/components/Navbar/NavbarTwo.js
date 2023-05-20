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
  //useTheme,
} from '@mui/material';
import { AccountCircle, Dashboard, ExitToApp } from '@mui/icons-material';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useUserContext } from '@/context/userLogin';

function NavbarTwo() {
  const { variableState } = useUserContext();
  const [anchorEl, setAnchorEl] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Replace with your login state
  //const theme = useTheme();
  //const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isMobile = useMediaQuery((theme) => (theme ? theme.breakpoints.down('sm') : '(max-width:600px)'));
  const router = useRouter();

  useEffect(() => {
    console.log(variableState);
    const usuario = variableState;
    if (usuario == false) {
      return; //router.push('/login');
    }
    setIsLoggedIn(true);
  }, [variableState]);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDashboardClick = () => {
    setAnchorEl(null);
    router.push('/misviajes');
  };

  const handleLogout = () => {
    localStorage.removeItem('usuarioLogeado');
    setIsLoggedIn(false);
    handleClose();
    router.push('/');
  };

  return (
    <AppBar position='static' sx={{ backgroundColor: '#2B2E4A' }}>
      <Toolbar>
        <Link legacyBehavior href='/'>
          <a>
            <Image src='/img/logo3.svg' alt='Logo' height='40' width='40' sx={{ color: '#FFFFFF' }} />
          </a>
        </Link>

        <Typography variant='h6' style={{ flexGrow: 1, justifyContent: 'center' }}>
          <Image src='/img/logo2.svg' alt='Logo' height='40' width='130' sx={{ color: '#FFFFFF' }} />
        </Typography>

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
                  <MenuItem onClick={handleDashboardClick}>
                    <ListItemIcon>
                      <Dashboard />
                    </ListItemIcon>
                    <ListItemText primary='Mis Viajes' />
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
                <Link href='/misviajes'>
                  <Button sx={{ color: '#FFFFFF' }}>Mis Viajes</Button>
                </Link>

                <Button sx={{ color: '#FFFFFF' }} onClick={handleLogout}>
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
