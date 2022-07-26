import { BrowserRouter } from 'react-router-dom';
import './App.css';
import { Provider } from 'react-redux';
import reducer from './store/reducer';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, Store } from 'redux';

import Home from './pages/home';
import {
  DispatchType,
  ICachedJWT,
  ICachedJWTEmpty,
  JWTAction,
} from './interface/authTypes';

export default function App() {
  const store: Store<ICachedJWT | ICachedJWTEmpty, JWTAction> & {
    dispatch: DispatchType;
  } = createStore(reducer, applyMiddleware(thunk));

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    </Provider>
  );
}
