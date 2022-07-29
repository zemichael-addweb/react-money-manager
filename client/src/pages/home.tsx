import './home.sass';
import { Routes, Route, useNavigate } from 'react-router-dom';
import LoginUI from './login/login';

import Layout from '../layout/layout';

import Profile from './profile/profile';
import Register from './register/register';
import { checkCachedJwtStatus } from '../store/actionCreators';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export default function Home() {
  const navigate = useNavigate();
  let store: any = useSelector((state) => state);

  useEffect(() => {
    checkCachedJwtStatus();
    if (store.loggedIn) {
      navigate('/profile');
    }
  }, []);

  return (
    <Layout>
      {
        //Routes
      }
      <Routes>
        <Route path="/">
          <Route path="/login" element={<LoginUI />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
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
