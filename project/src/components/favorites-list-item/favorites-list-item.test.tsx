import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { generateFakeOffer } from '../../utils/mocks';
import FavoritesListItem from './favorites-list-item';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { datatype } from 'faker';

const mockStore = configureMockStore();
const history = createMemoryHistory();
const store = mockStore({});
describe('Component: FavoritesListItem', () => {
  beforeEach(() => {
    history.push('');
  });

  it('should render FavoritesListItem correctly', () => {
    const fakeOffers = new Array(datatype.number({min: 1, max: 10})).fill(null).map(() => generateFakeOffer(undefined, true));

    render(
      <Provider store={store}>
        <Router history={history}>
          <FavoritesListItem cityName={fakeOffers[0].city.name} offers={fakeOffers}/>
        </Router>
      </Provider>,
    );

    expect(screen.getAllByRole('article').length).toBe(fakeOffers.length);
    expect(screen.getByText(fakeOffers[0].city.name)).toBeInTheDocument();
  });
});
