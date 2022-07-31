import './navbar.sass';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Button, Container, Typography, IconButton, Box } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import LoginIcon from '@mui/icons-material/Login';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import LoginContext from '../services/context/ThemeContext';

//Componenets
import { removeCachedJWT } from '../store/actionCreators';

export default function NavBar() {
  const [fullName, setFullName] = useState('');
  const store: any = useSelector((state) => state);

  console.log('NavBar Rendered!');

  const navigate = useNavigate();
  const handleLogout = () => {
    removeCachedJWT();
    navigate('/login');
  };

  useEffect(() => {
    setFullName(store.userInfo.fullName ? `${store.userInfo.fullName}` : '');
  }, [store]);

  const { themeBackgroundColor, setThemeBackgroundColor } =
    useContext(LoginContext);

  return (
    <Box
      sx={{
        backgroundColor: themeBackgroundColor,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 'calc(5px + 1vmin)',
        color: 'white',
      }}
    >
      <Container sx={{ display: 'flex', margin: 'auto', my: 4 }}>
        <Box
          sx={{
            display: 'flex',
          }}
        >
          <RequestQuoteIcon fontSize="large" />
          <Typography
            sx={{ marginLeft: '1rem', textAlign: 'left' }}
            variant="h6"
            component="h1"
            gutterBottom
          >
            Money Manager
          </Typography>
        </Box>
        <Box
          sx={{
            margin: 'auto',
            marginRight: '0',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {fullName ? (
            <Box sx={{ margin: 'auto', display: 'flex' }}>
              <Typography
                sx={{ marginRight: '1rem' }}
                variant="h6"
                component="h1"
              >
                {fullName}
              </Typography>
              <Button
                onClick={(e) => {
                  handleLogout();
                }}
                sx={{ marginRight: '1rem' }}
                variant="outlined"
                startIcon={<LogoutIcon fontSize="inherit" />}
              >
                Logout
              </Button>
            </Box>
          ) : (
            <Box sx={{ margin: 'auto', display: 'flex' }}>
              <Link to="/login">
                <Button
                  sx={{ marginRight: '1rem' }}
                  variant="outlined"
                  startIcon={<LoginIcon />}
                >
                  login
                </Button>
              </Link>{' '}
              <Link to="/register">
                <Button variant="outlined" startIcon={<HowToRegIcon />}>
                  Register
                </Button>
              </Link>
            </Box>
          )}
        </Box>
      </Container>
    </Box>
  );
}
