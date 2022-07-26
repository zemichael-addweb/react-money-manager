import { ReactElement, useState } from 'react';
import {
  Box,
  Button,
  Card,
  TextField,
  Typography,
  Divider,
} from '@mui/material';
import AuthService from '../../services/AuthService';
import { Login } from '../../services/authApiService';
import { useNavigate } from 'react-router';

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
  const [username, setUsername] = useState('');
  const [JwtStatus, setJwtStatus] = useState('');
  const [errors, setErrors] = useState([]);

  //functions to handle login form
  async function handleLogin(e: any) {
    //send username and password to login method
    e.preventDefault();
    try {
      let response: any = await Login(username, password);
      console.log('response', response.data.token);
      if (response.data.token) {
        console.log('successfully logged in!');
        AuthService.saveAccessTokenAsCachedJwt(response);
        navigate('/profile');
      }
    } catch (error: any) {
      console.log(error.response.data.errors);
      setErrors(error.response.data.errors);
      return null;
    }
  }

  return (
    <Card sx={{ margin: 'auto', width: '400px', marginTop: '50px' }}>
      <Box
        sx={{
          '& > *': {
            marginBottom: '20px',
          },
          margin: 'auto',
          width: '400px',
          marginTop: '50px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography variant="h5">Login</Typography>
        <Divider sx={{ width: '80%' }} />
        <TextField
          onChange={(e) => setUsername(e.target.value)}
          required
          id="standard-username-input"
          label="User Name"
        />
        <TextField
          onChange={(e) => setPassword(e.target.value)}
          id="standard-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          required
        />
        <Box sx={{ display: 'flex' }}>
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
        <Button
          onClick={(e) => {
            setJwtStatus(AuthService.checkCachedJwtStatus());
          }}
          variant="contained"
          color="primary"
        >
          Check JWT
        </Button>
        <Typography>{JwtStatus}</Typography>
        {errors.length > 0 ? <ErrorUi errors={errors} /> : ''}
      </Box>
    </Card>
  );
}
