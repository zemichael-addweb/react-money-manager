import { Button, Container, Typography, IconButton, Box } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import './navbar.sass';

import { useNavigate } from 'react-router';
import { removeCachedJWT } from '../store/actionCreators';

export default function NavBar() {
  const [fullName, setFullName] = useState('');
  const JWTData: any = useSelector((state) => state);

  const navigate = useNavigate();
  const handleLogout = () => {
    removeCachedJWT();
    navigate('/login');
  };

  useEffect(() => {
    setFullName(
      JWTData.savedJWT.fullName ? `${JWTData.savedJWT.fullName}` : ''
    );
  }, [JWTData]);

  return (
    <div className="App-header">
      <Container sx={{ display: 'flex', margin: 'auto', my: 4 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Typography
            sx={{ textAlign: 'left' }}
            variant="h6"
            component="h1"
            gutterBottom
          >
            Welcome to Money Manager!
          </Typography>
        </Box>
        {fullName ? (
          <Box
            sx={{
              margin: 'auto',
              marginRight: '0',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Typography variant="h6" component="h1">
              {fullName}
            </Typography>
            <IconButton
              onClick={(e) => {
                handleLogout();
              }}
              aria-label="delete"
              size="large"
              color="info"
            >
              <LogoutIcon fontSize="inherit" />
            </IconButton>
          </Box>
        ) : (
          <>
            <Link to="/login">Login</Link> or
            <Link to="/register">Register</Link>
          </>
        )}
      </Container>
    </div>
  );
}
