import { ReactElement, useEffect, useState } from 'react';
import {
  Box,
  Button,
  Card,
  TextField,
  Typography,
  Divider,
} from '@mui/material';
import AuthService from '../../services/AuthService';
import { login } from '../../services/authApiService';
import { useNavigate } from 'react-router';
import { saveJWT } from '../../store/actionCreators';
import { ICachedJWT } from '../../interface/authTypes';

import { useSelector } from 'react-redux';

import { AuthError } from '../../components/AuthError';

export default function LoginUI(props: any) {
  const navigate = useNavigate();

  //states for username and password
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState({});

  //functions to handle login form
  async function handleLogin(e: any) {
    //send username and password to login method
    try {
      let response: any = await login(email, password);
      console.log('response', response);
      if (response.data.data.token) {
        console.log('successfully logged in!');
        const JWT: ICachedJWT = AuthService.returnAccessTokenAsCachedJwt(
          response.data
        );
        saveJWT(JWT);
        setError({});
        navigate('/profile');
      }
    } catch (error: any) {
      if (error?.response?.data?.error) {
        let errorData = error.response.data.error;
        setError(errorData);
      } else {
        setError(error);
      }
      return null;
    }
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography variant="h5">Login</Typography>
      <Divider
        sx={{
          width: '80%',
          height: '.1rem',
          backgroundColor: 'gray',
          marginBottom: '2rem',
        }}
      />
      <TextField
        sx={{ marginBottom: '1rem' }}
        onChange={(e) => setEmail(e.target.value)}
        required
        id="standard-email-input"
        label="Email"
      />
      <TextField
        sx={{ marginBottom: '1rem' }}
        onChange={(e) => setPassword(e.target.value)}
        id="standard-password-input"
        label="Password"
        type="password"
        autoComplete="current-password"
        required
      />
      <Box sx={{ display: 'flex', marginBottom: '1rem' }}>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          onClick={(e) => {
            handleLogin(e);
          }}
        >
          Login
        </Button>
      </Box>
      {error ? <AuthError error={error} /> : ''}
    </Box>
  );
}
