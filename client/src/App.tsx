import { BrowserRouter } from 'react-router-dom';
import './App.css';
import { Provider } from 'react-redux';
import { store } from './store/store';

import Home from './pages/home';

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    </Provider>
  );
}
