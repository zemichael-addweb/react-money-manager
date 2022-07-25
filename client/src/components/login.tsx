import { useState } from 'react';
import {
  makeStyles,
  Box,
  Button,
  Card,
  TextField,
  Typography,
  Divider,
} from '@mui/material';
import AuthService from '../services/AuthService';
import { Login } from '../services/ApiService';

const useStyles = makeStyles({
  root: {
    margin: 'auto',
    width: '400px',
    marginTop: '50px',
  },
  form: {
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
  },
  divider: {
    width: '80%',
  },
  buttons: {
    display: 'flex',
  },
});

export default function LoginUI(props) {
  const classes = useStyles();

  //states for username and password
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [JwtStatus, setJwtStatus] = useState('');

  //functions to handle login form
  async function handleLogin(e) {
    //send username and password to login method
    e.preventDefault();
    try {
      let response = await Login(username, password);
      console.log(response);
      if (response.data.sign_in.token) {
        AuthService.saveAccessTokenAsCachedJwt(response);
        console.log('successfully logged in!');
        props.history.push('/');
      }
      //redirect to somewhere to check role and render
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  return (
    <Card className={classes.root}>
      <form onSubmit={handleLogin} className={classes.form}>
        <Typography variant="h5">Login</Typography>
        <Divider className={classes.divider} />
        <TextField
          onChange={(e) => setUsername(e.target.value)}
          required
          id="standard-username-input"
          label="User Name"
        />
        <TextField
          onChange={(e) => setPassword(e.target.value)}
          className={classes.password}
          id="standard-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          required
        />
        <Box className={classes.buttons}>
          <Button type="submit" variant="contained" color="primary">
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
      </form>
    </Card>
  );
}
