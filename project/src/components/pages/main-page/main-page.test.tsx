import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { AuthorizationStatus, AvailableCity } from '../../../utils/const';
import { generateFakeOffer } from '../../../utils/mocks';
import MainPage from './main-page';

const history = createMemoryHistory();
const mockStore = configureMockStore();
const store = mockStore({
  USER: { authorizationStatus: AuthorizationStatus.NoAuth },
  OFFER_LIST: { cityName: AvailableCity.Amsterdam },
  OFFERS: { offers: [] },
});
describe('Component: MainPage', () => {
  beforeEach(() => {
    history.push('test-page');
  });

  it('should render MainPage without offers correctly', () => {
    render(
      <Router history={history}>
        <Provider store={store}>
          <MainPage/>
        </Provider>
      </Router>,
    );

    expect(screen.getByText(/could not find any/i)).toBeInTheDocument();
  });

  it('should render MainPage correctly', () => {
    const fakeOffer = generateFakeOffer();
    fakeOffer.city.name = AvailableCity.Amsterdam;

    const storeWithOffers = mockStore({
      USER: { authorizationStatus: AuthorizationStatus.NoAuth },
      OFFER_LIST: { cityName: AvailableCity.Amsterdam },
      OFFERS: {
        offers: [fakeOffer],
      },
    });

    render(
      <Router history={history}>
        <Provider store={storeWithOffers}>
          <MainPage/>
        </Provider>
      </Router>,
    );

    expect(screen.queryByText(/could not find any/i)).not.toBeInTheDocument();
    expect(screen.getByText(new RegExp(`1 places to stay in ${AvailableCity.Amsterdam}`, 'i'))).toBeInTheDocument();
  });

  it('should correctly render map', () => {
    const fakeOffer = generateFakeOffer();
    fakeOffer.city.name = AvailableCity.Amsterdam;

    const storeWithOffers = mockStore({
      USER: { authorizationStatus: AuthorizationStatus.NoAuth },
      OFFER_LIST: { cityName: AvailableCity.Amsterdam },
      OFFERS: {
        offers: [fakeOffer],
      },
    });

    const { baseElement } = render(
      <Router history={history}>
        <Provider store={storeWithOffers}>
          <MainPage/>
        </Provider>
      </Router>,
    );

    expect(baseElement.querySelector('.cities__map')).toBeInTheDocument();
  });
});
