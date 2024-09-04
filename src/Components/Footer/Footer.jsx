import React from 'react';
import { AppBar, Toolbar, Typography, Tooltip, Box, Switch } from '@mui/material';
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";


const Footer = ({ isLightTheme, toggleTheme }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <AppBar position="fixed" sx={{ top: 'auto', bottom: 0 }}>
      <Toolbar
      sx={{
        justifyContent: isMobile ? 'center' : 'space-between',
        flexDirection: isMobile ? 'column' : 'row',
        alignItems: isMobile ? 'center' : 'flex-start',
        padding: '10px 20px',
      }}
    >
      <Box
        className="theme-toggle"
        sx={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: isMobile ? 2 : 0,
        }}
      >
        <Tooltip title="Toggle Light/Dark Mode">
          <Switch
            color="secondary"
            checked={isLightTheme}
            onChange={toggleTheme}
          />
        </Tooltip>
        <Typography variant="body1" color="inherit" sx={{ ml: 1 }}>
          Dark / Light mode
        </Typography>
      </Box>
      <Typography
        variant="body1"
        color="inherit"
        sx={{
          textAlign: 'center',
        }}
      >
        © 2024 Fanshawe OER Design Studio made available under the MIT License.
      </Typography>
    </Toolbar>
    </AppBar>
  );
};

export default Footer;