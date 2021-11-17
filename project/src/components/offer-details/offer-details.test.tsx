import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { generateFakeOffer } from '../../utils/mocks';
import OfferDetails from './offer-details';

const mockStore = configureMockStore();
const history = createMemoryHistory();
const store = mockStore({OFFER_LIST: {cityName: 'Amsterdam'}});

describe('Component: OfferDetails', () => {
  beforeEach(() => {
    history.push('');
  });

  it('should render OfferDetails correctly when not authorized', () => {
    const fakeOffer = generateFakeOffer();
    render(
      <Provider store={store}>
        <Router history={history}>
          <OfferDetails
            offer={fakeOffer}
            comments={[]}
            nearOffers={[]}
            isAuthorized={false}
            addCommentHandler={jest.fn()}
            onToggleFavorite={jest.fn()}
          />
        </Router>
      </Provider>,
    );

    expect(screen.getAllByAltText(/Apartment/i).length).toBeLessThanOrEqual(6);
    expect(screen.getByText(fakeOffer.title)).toBeInTheDocument();
    expect(screen.getByText('To bookmarks')).toBeInTheDocument();
    expect(screen.queryByText('Submit')).not.toBeInTheDocument();
  });

  it('should render OfferDetails correctly when authorized', () => {
    const fakeOffer = generateFakeOffer();
    render(
      <Provider store={store}>
        <Router history={history}>
          <OfferDetails
            offer={fakeOffer}
            comments={[]}
            nearOffers={[]}
            isAuthorized
            addCommentHandler={jest.fn()}
            onToggleFavorite={jest.fn()}
          />
        </Router>
      </Provider>,
    );

    expect(screen.getAllByAltText(/Apartment/i).length).toBeLessThanOrEqual(6);
    expect(screen.getByText(fakeOffer.title)).toBeInTheDocument();
    expect(screen.getByText('To bookmarks')).toBeInTheDocument();
    expect(screen.queryByText('Submit')).toBeInTheDocument();
  });

});
