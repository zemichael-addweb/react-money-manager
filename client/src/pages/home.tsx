import './home.sass';
import { Routes, Route } from 'react-router-dom';
import LoginUI from './login/login';

import Layout from '../layout/layout';

import Profile from './profile/profile';
import Register from './register/register';
import { store } from '../store/store';
import { checkCachedJwtStatus } from '../store/actionCreators';
import { IState } from '../interface/authTypes';
import { useState } from 'react';

export default function Home() {
  const [loggedIn, setLoggedIn] = useState(false);
  checkCachedJwtStatus();
  let JWTData: IState = store.getState();

  return (
    <Layout loggedIn={loggedIn}>
      {
        //Routes here
      }
      <Routes>
        <Route path="/">
          <Route path="/login" element={<LoginUI />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route
            path="/profile"
            element={!JWTData.loggedIn ? <LoginUI /> : <Profile />}
          ></Route>
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
    </Layout>
  );
}
