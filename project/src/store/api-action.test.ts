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
  toggleFavoriteStatus
} from './api-action';
import { APIRoute, AuthorizationStatus } from '../utils/const';
import { State } from '../types/store/state';
import {
  loadOffers,
  logOut,
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
  const api = createAPI(onFakeUnauthorized());
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];
  const mockStore = configureMockStore<State, Action, ThunkDispatch<State, typeof api, Action>>(middlewares);

  it('should set offer data when server respond with 200', async () => {
    const store = mockStore();
    mockAPI.onGet(APIRoute.Hotels).reply(200, []);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(fetchOffersAction());

    expect(store.getActions()).toEqual([
      loadOffers([]),
    ]);
  });

  it('should set authorization status "AUTH" and user data when server respond with 200', async () => {
    const store = mockStore();
    mockAPI.onGet(APIRoute.Login).reply(200, []);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(checkAuthAction());

    expect(store.getActions()).toEqual([
      setUserData({} as PrivateAuthInfo),
      setAuthorizationStatus(AuthorizationStatus.Auth),
    ]);
  });

  it('should set authorization status "AUTH" and user data when server respond with 200 on login route', async () => {
    const store = mockStore();
    mockAPI.onPost(APIRoute.Login).reply(200, []);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(loginAction({password: 'password', email: 'email@email.com'}));

    expect(store.getActions()).toEqual([
      setAuthorizationStatus(AuthorizationStatus.Auth),
      setUserData({} as PrivateAuthInfo),
    ]);
  });

  it('should set authorization status "NO_AUTH" when server respond with 4XX on login route', async () => {
    const store = mockStore();
    mockAPI.onPost(APIRoute.Login).reply(400, []);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(loginAction({password: 'password', email: 'email@email.com'}));

    expect(store.getActions()).toEqual([
      setAuthorizationStatus(AuthorizationStatus.NoAuth),
    ]);
  });

  it('should dispatch logOutAction when server respond with any status code', async () => {
    const store = mockStore();
    mockAPI.onDelete(APIRoute.LogOut).reply(200, []);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(logOutAction());

    expect(store.getActions()).toEqual([
      logOut(),
    ]);
  });

  it('should set property comments when server respond with 200', async () => {
    const store = mockStore();
    const offerId = 102;
    mockAPI.onGet(`${APIRoute.Comments}/${offerId}`).reply(200, []);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(loadPropertyCommentsAction(offerId));

    expect(store.getActions()).toEqual([
      setPropertyComments([]),
    ]);
  });

  it('should update property comments when server respond with 200', async () => {
    const store = mockStore();
    const offerId = 102;
    mockAPI.onPost(`${APIRoute.Comments}/${offerId}`).reply(200, []);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(addPropertyCommentsAction(offerId, {comment: 'sad', rating: 5}));

    expect(store.getActions()).toEqual([
      setPropertyComments([]),
    ]);
  });

  //TODO Узнать как тестировать редирект в случае 401. reply(401, []) не выполняет условие axios.isAxiosError(error)
  // it(`should redirect to ${AppRoute.SignIn} when server respond with 401`, async () => {
  //   const store = mockStore();
  //   const offerId = 102;
  //   mockAPI.onPost(`${APIRoute.Comments}/${offerId}`).reply(401, []);

  //   expect(store.getActions()).toEqual([]);

  //   await store.dispatch(addPropertyCommentsAction(offerId, {comment: 'sad', rating: 5}));

  //   expect(store.getActions()).toEqual([
  //     redirectToRoute(AppRoute.SignIn),
  //   ]);
  // });

  it('should update offers when server respond with 200', async () => {
    const store = mockStore();
    const offerId = 102;
    const isFavorite = 1;
    const fakeOffer = generateFakeOfferApiRes();
    const fakeAdaptedOffer = APIAdapter.offersToClient(fakeOffer);

    mockAPI.onPost(`${APIRoute.Favorite}/${offerId}/${isFavorite}`).reply(200, fakeOffer);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(toggleFavoriteStatus(offerId, Boolean(isFavorite)));

    expect(store.getActions()).toEqual([
      updateOffer(fakeAdaptedOffer),
    ]);
  });

  it('should set near by offers when server respond with 200', async () => {
    const store = mockStore();
    const offerId = 102;

    mockAPI.onGet(`${APIRoute.Hotels}/${offerId}/nearby`).reply(200, []);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(loadNearByAction(offerId));

    expect(store.getActions()).toEqual([
      setNearByOffers([]),
    ]);
  });

  it('should set offer details when server respond with 200', async () => {
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

  it('should set favorite offers when server respond with 200', async () => {
    const store = mockStore();

    mockAPI.onGet(APIRoute.Favorite).reply(200, []);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(fetchFavoriteOffersAction());

    expect(store.getActions()).toEqual([
      setFavoriteOffers([]),
    ]);
  });

});
