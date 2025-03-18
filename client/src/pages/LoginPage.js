import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import axios from 'axios';

const StyledTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#e0e0e0',
    },
    '&:hover fieldset': {
      borderColor: '#e0e0e0',
    },
  },
  marginBottom: '20px',
});

const StyledButton = styled(Button)({
  backgroundColor: '#cc0000',
  color: 'white',
  padding: '12px',
  '&:hover': {
    backgroundColor: '#b30000',
  },
  textTransform: 'none',
  borderRadius: '4px',
});

function LoginPage({ setIsAuthenticated }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      console.log('Attempting login with:', { email, password: '***' });
      const response = await axios.post('http://localhost:5001/api/auth/login', {
        email: email.trim(),
        password: password.trim()
      });

      console.log('Login response received:', response.status);
      const { token, user } = response.data;
      
      if (!token) {
        throw new Error('No token received');
      }

      console.log('Login successful, user:', { email: user.email, role: user.role });
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      setIsAuthenticated(true);
    } catch (err) {
      console.error('Login error details:', {
        status: err.response?.status,
        message: err.response?.data?.message,
        error: err.message
      });
      setError(
        err.response?.data?.message || 
        err.message || 
        'Failed to login. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: '#f5f5f5',
      }}
    >
      <Paper
        elevation={1}
        sx={{
          width: '100%',
          maxWidth: '400px',
          p: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          borderRadius: '8px',
        }}
      >
        <Box sx={{ mb: 3 }}>
          <img 
            src="/impact-logo.png"
            alt="Impact Logo" 
            style={{ 
              width: '32px',
              height: '32px',
              objectFit: 'contain'
            }} 
          />
        </Box>

        <Typography
          variant="h5"
          sx={{
            mb: 4,
            color: '#333',
            fontWeight: 400,
            fontSize: '1.5rem'
          }}
        >
          Project Elevate
        </Typography>

        {error && (
          <Typography color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}

        <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
          <Typography sx={{ mb: 1, color: '#333', fontSize: '0.875rem' }}>Email Address</Typography>
          <StyledTextField
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            variant="outlined"
            size="small"
            disabled={loading}
          />

          <Typography sx={{ mb: 1, color: '#333', fontSize: '0.875rem' }}>Password</Typography>
          <StyledTextField
            fullWidth
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            variant="outlined"
            size="small"
            disabled={loading}
          />

          <StyledButton
            type="submit"
            fullWidth
            variant="contained"
            disabled={loading}
            sx={{ 
              mt: 2,
              mb: 2,
              textTransform: 'none',
              fontSize: '0.875rem'
            }}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </StyledButton>

          <Typography
            sx={{
              textAlign: 'center',
              color: '#cc0000',
              cursor: 'pointer',
              fontSize: '0.875rem',
              '&:hover': {
                textDecoration: 'underline',
              },
            }}
          >
            Need an account? Register here
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}

export default LoginPage; 