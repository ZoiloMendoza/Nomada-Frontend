import React, { useState, useEffect } from 'react';
import { Link } from 'next/link';
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  // List,
  // ListItem,
  Divider,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Image from 'next/image';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileAnchorEl, setMobileAnchorEl] = useState(null);

  useEffect(() => {
    const usuario = JSON.parse(localStorage.getItem('usuarioLogeado'));
    console.log(localStorage);

    if (!usuario) {
      //router.push('/login');
    }
    setIsLoggedIn(true);
  }, []);

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileAnchorEl(event.currentTarget);
    setIsMobileMenuOpen(true);
  };

  const handleMobileMenuClose = () => {
    setMobileAnchorEl(null);
    setIsMobileMenuOpen(false);
  };

  const mobileMenu = (
    <Menu
      anchorEl={mobileAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {isLoggedIn ? (
        <>
          <MenuItem onClick={handleMobileMenuClose}>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary='Dashboard' />
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleMobileMenuClose}>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary='Logout' />
          </MenuItem>
        </>
      ) : (
        <>
          <MenuItem onClick={handleMobileMenuClose}>
            <Button component={Link} href='/login' color='inherit'>
              Login
            </Button>
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleMobileMenuClose}>
            <Button component={Link} href='/register' color='inherit'>
              Register
            </Button>
          </MenuItem>
        </>
      )}
    </Menu>
  );

  return (
    <AppBar position='static' sx={{ backgroundColor: '#2B2E4A' }}>
      <Toolbar>
        <div>
          <IconButton edge='start' color='inherit' aria-label='menu' onClick={handleMobileMenuOpen}>
            <MenuIcon />
          </IconButton>
          <Link legacyBehavior href='/'>
            <a>
              <Image src='/img/logo3.svg' alt='Logo' height='40' width='40' sx={{ color: '#FFFFFF' }} />
            </a>
          </Link>
        </div>
        <div style={{ flexGrow: 1, textAlign: 'center' }}>
          <Link href='/'>
            <a style={{ color: 'white', textDecoration: 'none' }}>
              <h2>N O M A D A P P</h2>
            </a>
          </Link>
        </div>
        <div>
          {isLoggedIn ? (
            <>
              <IconButton color='inherit'>
                <AccountCircleIcon />
              </IconButton>
              <Button color='inherit' component={Link} href='/misviajes'>
                Mis Viajes
              </Button>
              <Button color='inherit' onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button color='inherit' component={Link} href='/login'>
                Login
              </Button>
              <Button color='inherit' component={Link} href='/registro'>
                Register
              </Button>
            </>
          )}
        </div>
      </Toolbar>
      {mobileMenu}
    </AppBar>
  );
};

export default Navbar;
