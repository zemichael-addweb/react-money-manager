import { Box, Button, Typography, Divider } from '@mui/material';
import { useNavigate } from 'react-router';
import AuthService from '../../services/AuthService';
import { removeCachedJWT } from '../../store/actionCreators';

export default function Profile(props: any) {
  const navigate = useNavigate();
  const handleLogout = () => {
    removeCachedJWT();
    navigate('/login');
  };
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography variant="h5">Profile</Typography>
      <Divider
        sx={{
          width: '80%',
          height: '.1rem',
          backgroundColor: 'gray',
          marginBottom: '2rem',
        }}
      />
      <Button
        onClick={(e) => {
          handleLogout();
        }}
      >
        Logout
      </Button>
    </Box>
  );
}
