import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import MainEmpty from './main-empty';

const mockStore = configureMockStore();
const history = createMemoryHistory();
const store = mockStore({OFFER_LIST: {cityName: 'Amsterdam'}});

describe('Component: MainEmpty', () => {
  beforeEach(() => {
    history.push('');
  });

  it('should render MainEmpty correctly when authorized', () => {

    render(
      <Provider store={store}>
        <Router history={history}>
          <MainEmpty/>
        </Router>
      </Provider>,
    );

    expect(screen.getByText(/in Amsterdam/i)).toBeInTheDocument();
  });

});
