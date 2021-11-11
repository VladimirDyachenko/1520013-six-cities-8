import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createAPI } from './services/api';
import App from './components/app/app';
import { fetchOffersAction, checkAuthAction } from './store/api-action';
import { ThunkAppDispatch } from './types/store/actions';
import { setAuthorizationStatus } from './store/action';
import { AuthorizationStatus } from './utils/const';
import { rootReducer } from './store/root-reducer';
import { redirect } from './store/middlewares/redirect';

const api = createAPI(() => store.dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth)));

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk.withExtraArgument(api)),
    applyMiddleware(redirect),
  ),
);

(store.dispatch as ThunkAppDispatch)(fetchOffersAction());
(store.dispatch as ThunkAppDispatch)(checkAuthAction());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App/>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
