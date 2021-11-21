import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import App from './app';
import { Router } from 'react-router-dom';
import { APIRoute, AppRoute, AuthorizationStatus } from '../../utils/const';
import MockAdapter from 'axios-mock-adapter';
import { createAPI } from '../../services/api';
import { State } from '../../types/store/state';
import { Action } from '@reduxjs/toolkit';
import thunk, { ThunkDispatch } from 'redux-thunk';

const onFakeUnauthorized = jest.fn();
const api = createAPI(onFakeUnauthorized());
const mockAPI = new MockAdapter(api);
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<State, Action, ThunkDispatch<State, typeof api, Action>>(middlewares);

const history = createMemoryHistory();

const store = mockStore({
  OFFERS: {
    offers: [],
    isDataLoaded: true,
    nearByPlaces: [],
    offerDetails: undefined,
    favoriteOffers: [],
  },
  USER: {authorizationStatus: AuthorizationStatus.Auth},
  OFFER_LIST: {cityName: 'Amsterdam'},
  PROPERTY_COMMENTS: {propertyComments: []},
});

describe('App routing', () => {
  it('should render 404 page', () => {
    history.push('/there-is-definitely-no-such-route');

    render(
      <Provider store={store}>
        <Router history={history}>
          <App/>
        </Router>
      </Provider>,
    );

    expect(screen.getByText(/404/i)).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveTextContent(/home/);
  });

  it(`should render "MainPage" when user navigate "${AppRoute.Main}"`, () => {
    history.push(AppRoute.Main);

    render(
      <Provider store={store}>
        <Router history={history}>
          <App/>
        </Router>
      </Provider>,
    );

    expect(screen.getByRole('heading')).toHaveTextContent('Cities');
  });

  it(`should render "PropertyPage" when user navigate "${AppRoute.Room}/:id"`, () => {
    history.push(`${AppRoute.Room}/1`);

    mockAPI.onGet(`${APIRoute.Comments}/1`).reply(200, []);
    mockAPI.onGet(`${APIRoute.Hotels}/1/nearby`).reply(200, []);

    render(
      <Provider store={store}>
        <Router history={history}>
          <App/>
        </Router>
      </Provider>,
    );

    expect(screen.getByRole('heading')).toHaveTextContent('Other places in the neighbourhood');
  });

  it(`should render "LoginPage" when user navigate "${AppRoute.SignIn}"`, () => {
    history.push(AppRoute.SignIn);

    const storeNoAuth = mockStore({
      OFFERS: {
        offers: [],
        isDataLoaded: true,
        nearByPlaces: [],
        offerDetails: undefined,
        favoriteOffers: [],
      },
      USER: {authorizationStatus: AuthorizationStatus.NoAuth},
      OFFER_LIST: {cityName: 'Amsterdam'},
      PROPERTY_COMMENTS: {propertyComments: []},
    });

    render(
      <Provider store={storeNoAuth}>
        <Router history={history}>
          <App/>
        </Router>
      </Provider>,
    );

    expect(screen.getByRole('button')).toHaveTextContent('Sign in');
  });

  it(`should render "FavoritesPage" when user navigate "${AppRoute.Favorites}"`, () => {
    history.push(AppRoute.Favorites);

    render(
      <Provider store={store}>
        <Router history={history}>
          <App/>
        </Router>
      </Provider>,
    );

    expect(screen.getByTestId('favorites-page')).toBeInTheDocument();
  });

});
describe('Component: "App"', () => {
  it('should render "LoadingScreen" when data is not loaded', () => {
    history.push(AppRoute.Main);

    const storeDataNotLoaded = mockStore({
      OFFERS: {
        offers: [],
        isDataLoaded: false,
        nearByPlaces: [],
        offerDetails: undefined,
        favoriteOffers: [],
      },
      USER: {authorizationStatus: AuthorizationStatus.NoAuth},
      OFFER_LIST: {cityName: 'Amsterdam'},
      PROPERTY_COMMENTS: {propertyComments: []},
    });

    render(
      <Provider store={storeDataNotLoaded}>
        <Router history={history}>
          <App/>
        </Router>
      </Provider>,
    );

    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });

});
