import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import App from './components/app/app';

import { offers } from './mocks/offers';
import { reducer } from './store/reducer';

const store = createStore(
  reducer,
  composeWithDevTools(),
);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App offers={offers}/>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
