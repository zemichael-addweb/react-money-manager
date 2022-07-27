import { BrowserRouter } from 'react-router-dom';
import './App.css';
import { Provider } from 'react-redux';
import { JWTStore } from './store/store';

import Home from './pages/home';

export default function App() {
  return (
    <Provider store={JWTStore}>
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    </Provider>
  );
}
