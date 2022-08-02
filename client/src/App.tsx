import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useNavigate,
} from 'react-router-dom';
import './App.sass';
import { Provider } from 'react-redux';
import { store } from './store/store';

import ThemeContext from './services/context/ThemeContext';
import { useEffect, useState } from 'react';
import ColorPicker from './components/ColorPicker';
import Layout from './layout/layout';
import Home from './pages/home/home';
import LoginUI from './pages/login/login';
import Register from './pages/register/register';
import { checkCachedJwtStatus } from './store/actionCreators';

import UserDetailContextProvider from './services/context/UserDetailsContext';
import Profile from './pages/profile/profile';

function RedirectToHome() {
  return <Navigate to="/home" replace={true} />;
}

export default function App() {
  useEffect(() => {
    checkCachedJwtStatus();
  }, []);

  const [themeBackgroundColor, setThemeBackgroundColor] =
    useState('rgb(0, 0, 0)');
  const [displayThemeSelector, setDisplayThemeSelector] = useState('none');

  return (
    <ThemeContext.Provider
      value={{
        themeBackgroundColor,
        setThemeBackgroundColor,
        displayThemeSelector,
        setDisplayThemeSelector,
      }}
    >
      <ColorPicker selector={displayThemeSelector} />
      <Provider store={store}>
        <Layout>
          {
            //Routes
          }
          <Routes>
            <Route path="/" element={<RedirectToHome />}></Route>
            <Route
              path="/*"
              element={
                <UserDetailContextProvider>
                  <Routes>
                    <Route path="/home" element={<Home />}></Route>
                    <Route path="/profile" element={<Profile />}></Route>
                  </Routes>
                </UserDetailContextProvider>
              }
            ></Route>
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
        </Layout>
      </Provider>
    </ThemeContext.Provider>
  );
}
