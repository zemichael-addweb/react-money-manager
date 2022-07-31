import { Box, Button, Typography, Divider, Grid } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { IAccount } from '../../interface/account';
import AccountCard from './account/AccountCard';
import AuthService from '../../services/AuthService';

import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

import RegisterAccountModal from './account/RegisterAccountModal';

export default function Profile(props: any) {
  console.log('Profile rendered!');
  const [registerForm, setRegisterForm] = useState('');
  const [accounts, setAccounts] = useState([]);
  const [registerAccountModalOpen, setRegisterAccountModalOpen] =
    useState(false);

  const store: any = useSelector((state) => state);

  useEffect(() => {
    const userId = store.userInfo.userId;
    console.log(userId, 'UserID');
    const headers = AuthService.returnAuthHeader();
    const account = async (userId: string) => {
      const response: any = await axios.get(
        `http://localhost:4001/api/account?user_id=${userId}`,
        { headers: headers }
      );
      if (response.data.data.length > 0) setAccounts(response.data.data);
    };
    account(userId).catch(console.error);
  }, [store]);

  console.log(accounts, 'Accounts');

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography
        sx={{ textAlign: 'left' }}
        variant="h6"
        component="h1"
        gutterBottom
      >
        Your current balance is 0 Birr!
      </Typography>
      <Box sx={{ display: 'flex', marginBottom: '1rem' }}>
        <Button
          variant="outlined"
          startIcon={<RemoveCircleOutlineIcon />}
          onClick={() => setRegisterForm('expense')}
          color="error"
        >
          Register Expense
        </Button>
        <Button
          variant="outlined"
          startIcon={<AddCircleOutlineIcon />}
          onClick={() => setRegisterForm('income')}
          color="success"
        >
          Register Income
        </Button>
      </Box>
      <Box
        sx={{
          margin: 0,
          backgroundColor: '#e7ebf0',
          width: '100%',
          padding: '2rem',
          paddingBottom: '3rem',
        }}
      >
        <Box sx={{ display: 'flex' }}>
          <Typography variant="h4">Accounts</Typography>
          <Button
            sx={{ marginLeft: 'auto' }}
            variant="outlined"
            startIcon={<AccountBalanceWalletIcon />}
            onClick={() => setRegisterAccountModalOpen(true)}
          >
            Create Money Account
          </Button>
        </Box>

        <Grid
          justifyContent="center"
          container
          spacing={2}
          sx={{
            margin: 0,
            width: '100%',
            gridAutoFlow: 'column',
            gridTemplateColumns:
              'repeat(auto-fit, minmax(160px,1fr)) !important',
            gridAutoColumns: 'minmax(160px, 1fr)',
          }}
        >
          {accounts.map((account: IAccount, index: number) => {
            return (
              <Grid key={index} item xs>
                <AccountCard
                  _id={account._id}
                  userId={account.userId}
                  accountName={account.accountName}
                  accountNumber={account.accountNumber}
                  accountBalance={account.accountBalance}
                  bank={account.bank}
                  created={account.created}
                />
              </Grid>
            );
          })}
        </Grid>
      </Box>

      <RegisterAccountModal
        open={registerAccountModalOpen}
        setOpen={setRegisterAccountModalOpen}
      />
    </Box>
  );
}
