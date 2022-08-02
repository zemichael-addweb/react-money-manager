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

import { useContext } from 'react';
import { UserDetailsContext } from '../../services/context/UserDetailsContext';
import { useNavigate } from 'react-router';
import RegisterExpenseModal from './components/RegisterExpenseModal';

export default function Profile(props: any) {
  console.log('Profile rendered!');
  const navigate = useNavigate();
  const { userDetails } = useContext(UserDetailsContext);
  const [accounts, setAccounts] = useState([]);
  console.log('userDetails', userDetails);

  //register modal
  const [registerAccountModalOpen, setRegisterAccountModalOpen] =
    useState(false);
  //register modal
  const [registerExpenseModalOpen, setRegisterExpenseModalOpen] =
    useState(false);
  const fetchAccount = () => {
    if (accounts.length > 0) {
    } else {
      if (Object.keys(userDetails).length > 0) {
        const userId = userDetails.userId;
        console.log(`Fetching accounts for userId [${userId}]`);
        const headers = AuthService.returnAuthHeader();
        const account = async (userId: string) => {
          const response: any = await axios.get(
            `http://localhost:4001/api/account?user_id=${userId}`,
            { headers: headers }
          );
          if (response.data.data.length > 0) setAccounts(response.data.data);
        };
        account(userId).catch(console.error);
      } else navigate('/login');
    }
  };

  useEffect(() => fetchAccount, [registerAccountModalOpen]);

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
      <Box sx={{ display: 'flex', marginBottom: '1rem' }}>
        <Button
          variant="outlined"
          startIcon={<RemoveCircleOutlineIcon />}
          onClick={() => setRegisterExpenseModalOpen(true)}
          color="error"
        >
          Register Expense
        </Button>
        <Button
          variant="outlined"
          startIcon={<AddCircleOutlineIcon />}
          // onClick={() => setRegisterForm('income')}
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

        <Box
          sx={{
            margin: 0,
            maxWidth: '100VW',
            overflow: 'auto',
            whiteSpace: 'nowrap',
          }}
        >
          {accounts.map((account: IAccount, index: number) => {
            return (
              <AccountCard
                key={index}
                _id={account._id}
                userId={account.userId}
                accountName={account.accountName}
                accountNumber={account.accountNumber}
                accountBalance={account.accountBalance}
                bank={account.bank}
                created={account.created}
              />
            );
          })}
        </Box>
      </Box>

      <RegisterAccountModal
        open={registerAccountModalOpen}
        setOpen={setRegisterAccountModalOpen}
      />
      <RegisterExpenseModal
        open={registerExpenseModalOpen}
        setOpen={setRegisterExpenseModalOpen}
      />
    </Box>
  );
}
