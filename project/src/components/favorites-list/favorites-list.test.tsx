import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { generateFakeOffer } from '../../utils/mocks';
import FavoritesList from './favorites-list';
import {configureMockStore} from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { datatype } from 'faker';
import { FavoriteOffersInCity, Offer } from '../../types/offer';

const mockStore = configureMockStore();
const history = createMemoryHistory();
const store = mockStore({});

describe('Component: FavoritesList', () => {
  beforeEach(() => {
    history.push('');
  });

  it('should render empty FavoritesList correctly', () => {
    const fakeOffer: FavoriteOffersInCity[] = [];

    render(
      <Provider store={store}>
        <Router history={history}>
          <FavoritesList favoriteOffersByCity={fakeOffer} onSetCity={jest.fn()}/>
        </Router>
      </Provider>,
    );

    expect(screen.getByTestId('favorites-empty')).toBeInTheDocument();
    expect(screen.queryByTestId('favorites-not-empty')).not.toBeInTheDocument();
  });

  it('should render FavoritesList with offers correctly', () => {
    const fakeOffers = new Array(datatype.number({min: 1, max: 10})).fill(null).map(() => generateFakeOffer(undefined, true));
    const fakeOffersInCity: Array<[string, Offer[]]> = [['City', fakeOffers]];

    render(
      <Provider store={store}>
        <Router history={history}>
          <FavoritesList favoriteOffersByCity={fakeOffersInCity} onSetCity={jest.fn()}/>
        </Router>
      </Provider>,
    );

    expect(screen.queryByTestId('favorites-empty')).not.toBeInTheDocument();
    expect(screen.getAllByRole('article').length).toBe(fakeOffers.length);
  });
});
