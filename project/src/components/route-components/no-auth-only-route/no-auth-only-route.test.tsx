import { Router, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { AppRoute, AuthorizationStatus } from '../../../utils/const';
import NoAuthOnlyRoute from './no-auth-only-route';

const mockStore = configureMockStore();
const history = createMemoryHistory();

describe('Component: PrivateRouter', () => {
  const privateRoutePath = '/public-only';
  beforeEach(() => {
    history.push(privateRoutePath);
  });

  it('should render component for public only route, when user not authorized', () => {
    const store = mockStore({
      USER: {authorizationStatus: AuthorizationStatus.NoAuth},
    });

    render(
      <Provider store={store}>
        <Router history={history}>
          <Route exact path={AppRoute.Main}><h1>Public Route</h1></Route>
          <NoAuthOnlyRoute
            exact
            path={privateRoutePath}
            render={() => (<h1>Public only route</h1>)}
          />
        </Router>
      </Provider>,
    );

    expect(screen.getByText(/Public only route/i)).toBeInTheDocument();
    expect(screen.queryByText(/Public Route/i)).not.toBeInTheDocument();
  });

  it('should render component for public Route, when user authorized', () => {
    const store = mockStore({
      USER: {authorizationStatus: AuthorizationStatus.Auth},
    });

    render(
      <Provider store={store}>
        <Router history={history}>
          <Route exact path={AppRoute.Main}><h1>Public Route</h1></Route>
          <NoAuthOnlyRoute
            exact
            path={privateRoutePath}
            render={() => (<h1>Public only route</h1>)}
          />
        </Router>
      </Provider>,
    );

    expect(screen.getByText(/Public Route/i)).toBeInTheDocument();
    expect(screen.queryByText(/Public only route/i)).not.toBeInTheDocument();
  });
});
