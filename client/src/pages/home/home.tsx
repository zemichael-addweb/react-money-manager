import './home.sass';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import Profile from '../profile/profile';
import { useContext } from 'react';
import { UserDetailsContext } from '../../services/context/UserDetailsContext';
import { Link } from 'react-router-dom';

export default function Home() {
  const { userDetails } = useContext(UserDetailsContext);

  const [accountBalance, setAccountBalance] = useState(0);

  const navigate = useNavigate();
  console.log('Home Rendered!');
  if (Object.keys(userDetails).length === 0) {
    console.log('no user detail');
    navigate('/login');
  }
  console.log('userDetail', userDetails);

  return (
    <Box>
      <Typography sx={{ marginLeft: '5rem' }} variant="h6">
        Welcome to our home page - <Link to="/profile">Go to profile</Link>
      </Typography>
      <Typography
        sx={{ marginLeft: '5rem', textAlign: 'left' }}
        variant="h6"
        component="h1"
        gutterBottom
      >
        Your current balance is 0 Birr!
      </Typography>
    </Box>
  );
}
