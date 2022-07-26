import { BrowserRouter } from 'react-router-dom';
import './App.css';

import Home from './pages/home';

export default function App() {
  return (
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  );
}
