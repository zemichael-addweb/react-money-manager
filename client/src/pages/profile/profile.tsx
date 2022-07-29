import { Box, Button, Typography, Divider } from '@mui/material';

export default function Profile(props: any) {
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

      <Typography
        sx={{ textAlign: 'left' }}
        variant="h6"
        component="h1"
        gutterBottom
      >
        Your current balance is 0 Birr!
      </Typography>
      <Box>
        <Button>Register Expense</Button>
        <Button>Register Income</Button>
      </Box>
    </Box>
  );
}
