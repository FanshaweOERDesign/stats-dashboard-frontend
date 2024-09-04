import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Box, IconButton, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import './Header.scss';

const Header = ({ isLoggedIn, setIsLoggedIn }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate('/login');
  };

  const handleHome = () => {
    navigate('/');
  };

  const handleEditBooks = () => {
    navigate('/edit-books');
    handleMenuClose();
  };

  return (
    <AppBar position="fixed" sx={{ bottom: 'auto', top: 0 }}>
      <Toolbar>
        <Box sx={{ display: 'flex', flexGrow: 1 }} onClick={handleHome}>
          <img className='logo' src="../assets/Images/oer_logo.png" alt="OER Logo" />
        </Box>
        <Typography variant="h2" sx={{ flexGrow: 1, textAlign: 'center', fontSize: '2em' }}>
          Fanshawe OER Studio Statistics Dashboard
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        {isLoggedIn && (
          <>
            <IconButton
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={handleMenuOpen}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleHome}>Home</MenuItem>
              <MenuItem onClick={handleEditBooks}>Edit Books</MenuItem>
              <MenuItem onClick={handleMenuClose}>Export CSV</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </>
        )}
        {!isLoggedIn && (
          <>
            <IconButton
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={handleMenuOpen}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleHome}>Home</MenuItem>
              <MenuItem onClick={handleLogout}>Login</MenuItem>
            </Menu>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
