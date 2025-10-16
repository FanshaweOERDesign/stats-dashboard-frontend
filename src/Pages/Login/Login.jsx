import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useNavigate, Link } from "react-router-dom";

import useAuth from "../../Hooks/useAuth";

const LoginPage = ({ login, message }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorText, setErrorText] = useState ("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (response.ok) {
        login(data.token);
        navigate('/');
        setErrorText("");
      } else {
        setErrorText(data.message || "Invalid username or password.");
      }
    } catch (error) {
      setErrorText("An error occurred. Please try again.");
    }
  }
  
  return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        height: '100vh' 
      }}
    >
      <Typography variant="h4" sx={{ mb: 2 }}>Login</Typography>
      {message && <Typography variant="body1" sx={{color: 'red', m: 2}}>{message}</Typography>}
      <TextField
        label="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        sx={{ mb: 2, width: '300px' }}
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        sx={{ mb: 2, width: '300px' }}
      />
      <Typography variant="body1" sx={{color: 'red', m: 2}}>{errorText}</Typography>
      <Button variant="contained" onClick={handleLogin}>Login</Button>
      <Link to="/" style={{ marginTop: '16px', textDecoration: 'none' }}>
        Back to Home
      </Link>
    </Box>
  );
};

export default LoginPage;
