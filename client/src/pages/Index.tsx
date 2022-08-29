import React, { useContext } from 'react';
import { Routes, Route } from 'react-router';
import RedirectTo from '../components/RedirectHome';
import Layout from '../layout/layout';
import UserDetailContextProvider, {
  UserDetailsContext,
} from '../services/context/UserDetailsContext';
import LoginUI from './auth/login/login';
import Register from './auth/register/register';
import Home from './home/home';
import Profile from './profile/profile';

export default function Index() {
  const { userDetails } = useContext(UserDetailsContext);
  if (userDetails && userDetails.accessToken) {
    return (
      <UserDetailContextProvider>
        <Layout>
          <Routes>
            <Route
              path="/*"
              element={
                <Routes>
                  <Route path="/home" element={<Home />}></Route>
                  <Route path="/profile" element={<Profile />}></Route>
                </Routes>
              }
            ></Route>
          </Routes>
        </Layout>
      </UserDetailContextProvider>
    );
  } else
    return (
      <Routes>
        <Route path="/" element={<RedirectTo route="home" />}></Route>
        <Route path="/login" element={<LoginUI />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route
          path="*"
          element={
            <main style={{ padding: '1rem' }}>
              <p>There's nothing here!</p>
            </main>
          }
        />
      </Routes>
    );
}
