import { ReactElement, useEffect, useState } from 'react';
import { Box, Button, TextField, Typography, Divider } from '@mui/material';
import AuthService from '../../services/AuthService';
import { register } from '../../services/authApiService';
import { useNavigate } from 'react-router';
import { Dispatch } from 'redux';
import { useDispatch } from 'react-redux';

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

export default function Register(props: any) {
  const navigate = useNavigate();
  //states for username and password
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [JwtStatus, setJwtStatus] = useState('');
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    setJwtStatus(AuthService.checkCachedJwtStatus());
  }, []);

  //functions to handle login form
  async function handleRegister(e: any) {
    //send username and password to login method
    e.preventDefault();
    try {
      let response: any = await register(name, email, password, repeatPassword);
      console.log('response', response);
      if (response.data._id) {
        console.log('successfully Registered!');
        navigate('/login');
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
      <Typography variant="h5">Register</Typography>
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
        onChange={(e) => setName(e.target.value)}
        required
        id="standard-username-input"
        label="Full Name"
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
        required
      />
      <TextField
        sx={{ marginBottom: '1rem' }}
        onChange={(e) => setRepeatPassword(e.target.value)}
        id="standard-password-input"
        label="Repeat Password"
        type="password"
        required
      />
      <Box sx={{ display: 'flex', marginBottom: '1rem' }}>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          onClick={(e) => {
            handleRegister(e);
          }}
        >
          Register
        </Button>
      </Box>
      <Typography>JWT Status - {JwtStatus}</Typography>
      {errors.length > 0 ? <ErrorUi errors={errors} /> : ''}
    </Box>
  );
}
