import React, {
  createContext,
  useReducer,
  useEffect,
  Component,
  useState,
} from 'react';
import { ICachedJWT } from '../../interface/authTypes';
import useFetchUserDetail from '../userDetailHooks';

type TContext = {};

export const UserDetailsContext: any = createContext({});

function UserDetailContextProvider(props: any) {
  const [userDetails, setUserDetails] = useState({});
  const fetchedUserDetails: ICachedJWT | {} = useFetchUserDetail();

  useEffect(() => {
    setUserDetails(fetchedUserDetails);
  }, []);

  return (
    <UserDetailsContext.Provider
      value={{
        userDetails: userDetails,
      }}
    >
      {props.children}
    </UserDetailsContext.Provider>
  );
}

export default UserDetailContextProvider;
