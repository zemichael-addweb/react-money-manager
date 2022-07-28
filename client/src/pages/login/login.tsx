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

const ErrorUi: React.FC<any> = (errors: any): ReactElement => {
  console.log('Error For UI', errors);
  if (errors.errors.length > 0) {
    return (
      <>
        {errors.errors.map((error: any) => {
          return (
            <div key={error.index}>
              Please fix {error.param} - {error.msg}
            </div>
          );
        })}
      </>
    );
  } else return <></>;
};

export default function LoginUI(props: any) {
  const navigate = useNavigate();
  //states for username and password
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [JwtStatus, setJwtStatus] = useState('');
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    setJwtStatus(AuthService.checkCachedJwtStatus());
  }, []);

  //functions to handle login form
  async function handleLogin(e: any) {
    //send username and password to login method
    e.preventDefault();
    try {
      let response: any = await login(email, password);
      console.log('response', response.data.token);
      if (response.data.token) {
        console.log('successfully logged in!');
        const JWT: ICachedJWT =
          AuthService.returnAccessTokenAsCachedJwt(response);
        saveJWT(JWT);
        navigate('/profile');
      }
    } catch (error: any) {
      console.log(error);
      if (error?.response?.data?.errors) {
        console.log(error.response.data.errors);
        setErrors(error.response.data.errors);
      } else {
        error = [{ msg: error.message }];
        setErrors(error);
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
      <Typography>JWT Status - {JwtStatus}</Typography>
      {errors.length > 0 ? <ErrorUi errors={errors} /> : ''}
    </Box>
  );
}
