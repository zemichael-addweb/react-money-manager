import { Box, Card, Typography, Divider } from '@mui/material';
import NavBar from './navbar';

export default function Layout(props: any) {
  return (
    <Card
      sx={{
        margin: 'auto',
        maxWidth: 'md',
        marginTop: '50px',
        marginBottom: '100px',
      }}
    >
      <NavBar />
      <Box
        sx={{
          '& > *': {
            marginBottom: '20px',
          },
          margin: 'auto',
          width: '400px',
          marginTop: '50px',
          marginBottom: '50px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {/* <Typography variant="h5">{props.title}</Typography>
        <Divider
          sx={{
            width: '80%',
            height: '.1rem',
            backgroundColor: 'gray',
            marginBottom: '2rem',
          }}
        /> */}
        {props.children}
      </Box>
    </Card>
  );
}
