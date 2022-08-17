import { Navigate, Route, Routes } from 'react-router-dom';
import './App.sass';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { useContext, useEffect, useState } from 'react';
import ColorPicker from './components/ColorPicker';
import Layout from './layout/layout';
import Home from './pages/home/home';
import LoginUI from './pages/login/login';
import Register from './pages/register/register';
import { checkCachedJwtStatus } from './store/actionCreators';

import UserDetailContextProvider from './services/context/UserDetailsContext';
import Profile from './pages/profile/profile';
import ThemeContextProvider, {
  ThemeContext,
} from './services/context/ThemeContext';
import NavBar from './layout/navbar';

function RedirectToHome() {
  return <Navigate to="/home" replace={true} />;
}

export default function App() {
  useEffect(() => {
    checkCachedJwtStatus();
  }, []);

  return (
    <ThemeContextProvider>
      <ColorPicker />
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<RedirectToHome />}></Route>
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
      </Provider>
    </ThemeContextProvider>
  );
}
