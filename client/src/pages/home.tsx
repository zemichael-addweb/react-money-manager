import './home.sass';
import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import { Link } from 'react-router-dom';
import LoginUI from './login/login';

import Layout from '../components/layout/layout';

import AuthService from '../services/AuthService';
import Profile from './profile/profile';
import Register from './register/register';
import { JWTStore } from '../store/store';

import { checkCachedJwtStatus } from '../store/actionCreators';
import { ICachedJWT, ICachedJWTEmpty, IState } from '../interface/authTypes';

export default function Home() {
  checkCachedJwtStatus();
  let JWTData: IState = JWTStore.getState();
  return (
    <Layout>
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
