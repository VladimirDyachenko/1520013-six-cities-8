import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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

  it('should render premium OfferDetails correctly', () => {
    const fakeOffer = generateFakeOffer();
    fakeOffer.isPremium = true;

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

    expect(screen.getByText('Premium')).toBeInTheDocument();
  });

  it('should render favorite OfferDetails correctly', () => {
    const fakeOffer = generateFakeOffer();
    fakeOffer.isFavorite = true;

    const { baseElement } = render(
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

    expect(baseElement.querySelector('.property__bookmark-button--active')).toBeInTheDocument();
  });

  it('should call onToggleFavorite callback', () => {
    const fakeOffer = generateFakeOffer();
    const onToggleFavorite = jest.fn();

    render(
      <Provider store={store}>
        <Router history={history}>
          <OfferDetails
            offer={fakeOffer}
            comments={[]}
            nearOffers={[]}
            isAuthorized
            addCommentHandler={jest.fn()}
            onToggleFavorite={onToggleFavorite}
          />
        </Router>
      </Provider>,
    );

    userEvent.click(screen.getByTestId('favorite-button'));
    expect(onToggleFavorite).toBeCalledTimes(1);
    expect(onToggleFavorite).toBeCalledWith(fakeOffer.id, !fakeOffer.isFavorite);
  });

  it('should render map correctly', () => {
    const fakeOffer = generateFakeOffer();

    const { baseElement } = render(
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

    expect(baseElement.querySelector('.property__map')).toBeInTheDocument();
    expect(baseElement.querySelector('.cities__map')).not.toBeInTheDocument();
  });

});
