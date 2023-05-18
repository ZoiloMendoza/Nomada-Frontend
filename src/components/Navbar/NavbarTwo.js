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
  Divider,
} from '@mui/material';
import { Menu as MenuIcon, AccountCircle, Dashboard, ExitToAppIcon, ExitToApp } from '@mui/icons-material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import Link from 'next/link';
import Image from 'next/image';
<<<<<<< HEAD
//import { useRouter } from 'next/router';

=======
import { useRouter } from 'next/router';
>>>>>>> 03ed7d064772c9d009d17bc3fc6a0cf9cb6fceb7
function NavbarTwo() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Replace with your login state
  const [mobileAnchorEl, setMobileAnchorEl] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  //const theme = useTheme();
  //const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isMobile = useMediaQuery((theme) => (theme ? theme.breakpoints.down('sm') : '(max-width:600px)'));
  //const router = useRouter();

  useEffect(() => {
    const usuario = JSON.parse(localStorage.getItem('usuarioLogeado'));
    console.log(localStorage);

    if (!usuario) {
      //router.push('/login');
    }
    setIsLoggedIn(true);
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
            <ListItemText primary='Mis Viajes' />
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
        <IconButton edge='start' color='inherit' aria-label='menu' onClick={handleMobileMenuOpen}>
          <MenuIcon />
        </IconButton>
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
                  <MenuItem onClick={handleClose}>
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
      {mobileMenu}
    </AppBar>
  );
}

export default NavbarTwo;
