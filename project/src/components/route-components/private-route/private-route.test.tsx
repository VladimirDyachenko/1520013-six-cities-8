import { Router, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { AppRoute, AuthorizationStatus } from '../../../utils/const';
import PrivateRoute from './private-route';

const mockStore = configureMockStore();
const history = createMemoryHistory();

describe('Component: PrivateRouter', () => {
  const privateRoutePath = '/private';
  beforeEach(() => {
    history.push(privateRoutePath);
  });

  it('should render component for public route, when user not authorized', () => {
    const store = mockStore({
      USER: {authorizationStatus: AuthorizationStatus.NoAuth},
    });

    render(
      <Provider store={store}>
        <Router history={history}>
          <Route exact path={AppRoute.SignIn}><h1>Public Route</h1></Route>
          <PrivateRoute
            exact
            path={privateRoutePath}
            render={() => (<h1>Private Route</h1>)}
          />
        </Router>
      </Provider>,
    );

    expect(screen.getByText(/Public Route/i)).toBeInTheDocument();
    expect(screen.queryByText(/Private Route/i)).not.toBeInTheDocument();
  });

  it('should render component for private route, when user authorized', () => {
    const store = mockStore({
      USER: {authorizationStatus: AuthorizationStatus.Auth},
    });

    render(
      <Provider store={store}>
        <Router history={history}>
          <Route exact path={AppRoute.SignIn}><h1>Public Route</h1></Route>
          <PrivateRoute
            exact
            path={privateRoutePath}
            render={() => (<h1>Private Route</h1>)}
          />
        </Router>
      </Provider>,
    );

    expect(screen.getByText(/Private Route/i)).toBeInTheDocument();
    expect(screen.queryByText(/Public Route/i)).not.toBeInTheDocument();
  });
});
