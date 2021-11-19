import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { Offer } from '../../../types/offer';
import { AppRoute, AuthorizationStatus } from '../../../utils/const';
import { FavoritesPage } from './favorites-page';

const history = createMemoryHistory();
const mockStore = configureMockStore();
const store = mockStore({
  USER: {authorizationStatus: AuthorizationStatus.NoAuth},
});

describe('Component: FavoritesPage', () => {
  beforeEach(() => {
    history.push('test-page');
  });

  it('should render FavoritesPage correctly', () => {
    const fakeOffers: Offer[] = [];
    const loadData = jest.fn();

    render(
      <Router history={history}>
        <Provider store={store}>
          <FavoritesPage favoriteOffers={fakeOffers} loadData={loadData}/>
        </Provider>
      </Router>,
    );

    expect(screen.getByTestId('favorites-page')).toBeInTheDocument();
    expect(loadData).toBeCalledTimes(1);
  });

  it(`should redirect to "${AppRoute.Main}"`, () => {
    const fakeOffers: Offer[] = [];
    const loadData = jest.fn();

    render(
      <Router history={history}>
        <Provider store={store}>
          <FavoritesPage favoriteOffers={fakeOffers} loadData={loadData}/>
        </Provider>
      </Router>,
    );

    userEvent.click(screen.getByTestId('footer-link-to-main'));
    expect(history.location.pathname).toBe(AppRoute.Main);
  });
});
