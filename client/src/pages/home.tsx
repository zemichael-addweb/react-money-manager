import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import LoginUI from './login/login';

import AuthService from '../services/AuthService';

export default function Home() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (AuthService.checkCachedJwtStatus() === 'OKAY') {
      console.log('JWT Okay');
      setLoggedIn(true);
    }
  }, []);

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {loggedIn ? (
            <>Welcome</>
          ) : (
            <>
              You are not logged in please <Link to="/login">login</Link> or{' '}
              <Link to="/login">register</Link>!
            </>
          )}
        </Typography>
      </Box>
      {
        //Routes here
      }
      <Routes>
        <Route path="/">
          <Route path="/login" element={<LoginUI />}></Route>
          <Route
            path="*"
            element={
              <main style={{ padding: '1rem' }}>
                <p>There's nothing here!</p>
              </main>
            }
          />
        </Route>
      </Routes>
    </Container>
  );
}
