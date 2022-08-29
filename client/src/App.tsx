import './App.sass';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { useEffect } from 'react';
import ColorPicker from './components/ColorPicker';
import { checkCachedJwtStatus } from './store/actionCreators';
import ThemeContextProvider, {
  ThemeContext,
} from './services/context/ThemeContext';
import Index from './pages/Index';

export default function App() {
  useEffect(() => {
    checkCachedJwtStatus();
  }, []);

  return (
    <div className="App">
      <Provider store={store}>
        <ThemeContextProvider>
          <ColorPicker />
          <Index />
        </ThemeContextProvider>
      </Provider>
    </div>
  );
}
