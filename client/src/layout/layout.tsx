import { Box, Card } from '@mui/material';
import NavBar from './navbar';
import Footer from './footer';

export default function Layout(props: any) {
  return (
    <>
      <NavBar />
      <Box
        sx={{
          '& > *': {
            marginBottom: '20px',
          },
          margin: 'auto',
          marginTop: '20px',
          marginBottom: '50px',
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
      <Footer />
    </>
  );
}
