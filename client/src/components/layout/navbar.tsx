import { Button, Container, Typography } from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { IState } from '../../interface/authTypes';
import { checkCachedJwtStatus } from '../../store/actionCreators';
import { JWTStore } from '../../store/store';

export default function NavBar() {
  const [fullName, setFullName] = useState('');
  let JWTData: IState = JWTStore.getState();
  let JWT: any = JWTData.savedJWT ? JWTData.savedJWT : {};
  const unsubscribe = JWTStore.subscribe(() => {
    setFullName(JWT.fullName ? `[${JWT.fullName}]` : '');
  });

  return (
    <div className="App-header">
      <Container sx={{ margin: 'auto', my: 4 }}>
        <Typography
          sx={{ textAlign: 'center' }}
          variant="h4"
          component="h1"
          gutterBottom
        >
          Welcome {fullName} to Money Manager!
        </Typography>
        {JWT.fullName ? (
          ''
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
