import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createAPI } from './services/api';
import App from './components/app/app';
import { fetchOffersAction } from './store/api-action';
import { reducer } from './store/reducer';
import { ThunkAppDispatch } from './types/store/actions';

// eslint-disable-next-line no-console
const api = createAPI(() => console.log('Unauthorized'));

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk.withExtraArgument(api)),
  ),
);

(store.dispatch as ThunkAppDispatch)(fetchOffersAction());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App/>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
