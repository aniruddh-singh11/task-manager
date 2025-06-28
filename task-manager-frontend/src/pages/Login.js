import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography, TextField, Button, Box, Alert, Link } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import API_BASE_URL from '../api';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const theme = useTheme();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post(`${API_BASE_URL}/users/login`, {
        email,
        password,
      });
      localStorage.setItem('token', response.data.token);
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor={theme.palette.background.default}>
      <Card sx={{ minWidth: 350, maxWidth: 400, boxShadow: 6, borderRadius: 3, bgcolor: theme.palette.background.paper }}>
        <CardContent>
          <Typography variant="h4" align="center" gutterBottom fontWeight={800} color={theme.palette.primary.main}>
            Login
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              required
              margin="normal"
              autoFocus
            />
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              required
              margin="normal"
            />
            {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 3 }}>
              Login
            </Button>
          </Box>
          <Typography align="center" sx={{ mt: 2 }} color={theme.palette.text.secondary}>
            Don't have an account?{' '}
            <Link href="/register" underline="hover" color="primary">
              Register
            </Link>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}

export default Login;