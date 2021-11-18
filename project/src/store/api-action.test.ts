import { Action } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createAPI } from '../services/api';
import {
  addPropertyCommentsAction,
  checkAuthAction,
  fetchFavoriteOffersAction,
  fetchOffersAction,
  loadNearByAction,
  loadOfferDetailsAction,
  loadPropertyCommentsAction,
  loginAction,
  logOutAction,
  toggleFavoriteStatusAction
} from './api-action';
import { APIRoute, AppRoute, AuthorizationStatus } from '../utils/const';
import { State } from '../types/store/state';
import {
  loadOffers,
  logOut,
  redirectToRoute,
  setAuthorizationStatus,
  setFavoriteOffers,
  setNearByOffers,
  setOfferDetails,
  setPropertyComments,
  setUserData,
  updateOffer
} from './action';
import { PrivateAuthInfo } from '../types/auth-info';
import { generateFakeOfferApiRes } from '../utils/mocks';
import { APIAdapter } from '../utils/adapter';

describe('test async actions', () => {
  const onFakeUnauthorized = jest.fn();
  const api = createAPI(onFakeUnauthorized);
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];
  const mockStore = configureMockStore<State, Action, ThunkDispatch<State, typeof api, Action>>(middlewares);

  it('fetchOffersAction: should set offer data when server respond with 200', async () => {
    const store = mockStore();
    mockAPI.onGet(APIRoute.Hotels).reply(200, []);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(fetchOffersAction());

    expect(store.getActions()).toEqual([
      loadOffers([]),
    ]);
  });

  it('checkAuthAction: should set authorization status "AUTH" and user data when server respond with 200', async () => {
    const store = mockStore();
    mockAPI.onGet(APIRoute.Login).reply(200, []);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(checkAuthAction());

    expect(store.getActions()).toEqual([
      setUserData({} as PrivateAuthInfo),
      setAuthorizationStatus(AuthorizationStatus.Auth),
    ]);
  });

  it('loginAction: should set authorization status "AUTH", token and user data when server respond with 200 on login route', async () => {
    const store = mockStore();
    const apiResponse = {
      'avatar_url': 'undefined',
      'email': 'undefined',
      'id': 1,
      'is_pro': false,
      'name': 'undefined',
      'token': 'token',
    };
    const expectedUserData = {
      avatarUrl: 'undefined',
      email: 'undefined',
      id: 1,
      isPro: false,
      name: 'undefined',
      token: 'token',
    };

    mockAPI.onPost(APIRoute.Login).reply(200, apiResponse);
    Storage.prototype.setItem = jest.fn();

    expect(store.getActions()).toEqual([]);

    await store.dispatch(loginAction({password: 'password', email: 'email@email.com'}));

    expect(store.getActions()).toEqual([
      setAuthorizationStatus(AuthorizationStatus.Auth),
      setUserData(expectedUserData),
    ]);

    expect(Storage.prototype.setItem).toBeCalledTimes(1);
    expect(Storage.prototype.setItem).toBeCalledWith('authorization_token', 'token');
  });

  it('loginAction: should set authorization status "NO_AUTH" when server respond with 4XX on login route', async () => {
    const store = mockStore();
    mockAPI.onPost(APIRoute.Login).reply(400, []);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(loginAction({password: 'password', email: 'email@email.com'}));

    expect(store.getActions()).toEqual([
      setAuthorizationStatus(AuthorizationStatus.NoAuth),
    ]);
  });

  it('logOutAction: should dispatch logOutAction and drop token when server respond with any status code', async () => {
    const store = mockStore();
    mockAPI.onDelete(APIRoute.LogOut).reply(200, []);
    Storage.prototype.removeItem = jest.fn();

    expect(store.getActions()).toEqual([]);

    await store.dispatch(logOutAction());

    expect(store.getActions()).toEqual([
      logOut(),
    ]);
    expect(Storage.prototype.removeItem).toBeCalledTimes(1);
    expect(Storage.prototype.removeItem).toBeCalledWith('authorization_token');
  });

  it('loadPropertyCommentsAction: should set property comments when server respond with 200', async () => {
    const store = mockStore();
    const offerId = 102;
    mockAPI.onGet(`${APIRoute.Comments}/${offerId}`).reply(200, []);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(loadPropertyCommentsAction(offerId));

    expect(store.getActions()).toEqual([
      setPropertyComments([]),
    ]);
  });

  it('addPropertyCommentsAction: should update property comments when server respond with 200', async () => {
    const store = mockStore();
    const offerId = 102;
    mockAPI.onPost(`${APIRoute.Comments}/${offerId}`).reply(200, []);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(addPropertyCommentsAction(offerId, {comment: 'sad', rating: 5}));

    expect(store.getActions()).toEqual([
      setPropertyComments([]),
    ]);
  });

  it(`addPropertyCommentsAction: should redirect to ${AppRoute.SignIn} when server respond with 401`, async () => {
    const store = mockStore();
    const offerId = 102;
    mockAPI.onPost(`${APIRoute.Comments}/${offerId}`).reply(401, []);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(addPropertyCommentsAction(offerId, {comment: 'sad', rating: 5}));

    expect(store.getActions()).toEqual([
      redirectToRoute(AppRoute.SignIn),
    ]);
    expect(onFakeUnauthorized).toBeCalled();
  });

  it('toggleFavoriteStatus: should update offers when server respond with 200', async () => {
    const store = mockStore();
    const offerId = 102;
    const isFavorite = 1;
    const fakeOffer = generateFakeOfferApiRes();
    const fakeAdaptedOffer = APIAdapter.offersToClient(fakeOffer);

    mockAPI.onPost(`${APIRoute.Favorite}/${offerId}/${isFavorite}`).reply(200, fakeOffer);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(toggleFavoriteStatusAction(offerId, Boolean(isFavorite)));

    expect(store.getActions()).toEqual([
      updateOffer(fakeAdaptedOffer),
    ]);
  });

  it(`toggleFavoriteStatusAction: should redirect to ${AppRoute.SignIn} when server respond with 401`, async () => {
    const store = mockStore();
    const offerId = 102;
    const isFavorite = 1;

    mockAPI.onPost(`${APIRoute.Favorite}/${offerId}/${isFavorite}`).reply(401);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(toggleFavoriteStatusAction(offerId, Boolean(isFavorite)));

    expect(store.getActions()).toEqual([
      redirectToRoute(AppRoute.SignIn),
    ]);
    expect(onFakeUnauthorized).toBeCalled();
  });

  it('loadNearByAction: should set near by offers when server respond with 200', async () => {
    const store = mockStore();
    const offerId = 102;

    mockAPI.onGet(`${APIRoute.Hotels}/${offerId}/nearby`).reply(200, []);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(loadNearByAction(offerId));

    expect(store.getActions()).toEqual([
      setNearByOffers([]),
    ]);
  });

  it('loadOfferDetailsAction: should set offer details when server respond with 200', async () => {
    const store = mockStore();
    const offerId = 102;
    const fakeOffer = generateFakeOfferApiRes();
    const fakeAdaptedOffer = APIAdapter.offersToClient(fakeOffer);

    mockAPI.onGet(`${APIRoute.Hotels}/${offerId}`).reply(200, fakeOffer);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(loadOfferDetailsAction(offerId));

    expect(store.getActions()).toEqual([
      setOfferDetails(fakeAdaptedOffer),
    ]);
  });

  it(`loadOfferDetailsAction: should redirect to ${AppRoute.NotFound} when server respond with 404`, async () => {
    const store = mockStore();
    const offerId = 102;

    mockAPI.onGet(`${APIRoute.Hotels}/${offerId}`).reply(404);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(loadOfferDetailsAction(offerId));

    expect(store.getActions()).toEqual([
      redirectToRoute(AppRoute.NotFound),
    ]);
  });

  it('fetchFavoriteOffersAction: should set favorite offers when server respond with 200', async () => {
    const store = mockStore();

    mockAPI.onGet(APIRoute.Favorite).reply(200, []);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(fetchFavoriteOffersAction());

    expect(store.getActions()).toEqual([
      setFavoriteOffers([]),
    ]);
  });

  it(`fetchFavoriteOffersAction: should redirect to ${AppRoute.NotFound} when server respond with 401`, async () => {
    const store = mockStore();

    mockAPI.onGet(APIRoute.Favorite).reply(401);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(fetchFavoriteOffersAction());

    expect(store.getActions()).toEqual([
      redirectToRoute(AppRoute.SignIn),
    ]);
  });

});
