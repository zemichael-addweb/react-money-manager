import { BrowserRouter } from 'react-router-dom';
import './App.sass';
import { Provider } from 'react-redux';
import { store } from './store/store';

import ThemeContext from './services/context/ThemeContext';
import Home from './pages/home';
import { useState } from 'react';
import ColorPicker from './components/ColorPicker';

export default function App() {
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
      <Provider store={store}>
        <BrowserRouter>
          <ColorPicker selector={displayThemeSelector} />
          <Home />
        </BrowserRouter>
      </Provider>
    </ThemeContext.Provider>
  );
}
