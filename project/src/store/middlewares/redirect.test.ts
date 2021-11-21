import { configureMockStore } from '@jedmao/redux-mock-store';
import { AnyAction } from 'redux';
import { redirect } from './redirect';
import { redirectToRoute } from '../action';
import { AppRoute } from '../../utils/const';
import { State } from '../../types/store/state';

const fakeHistory = {
  location: {pathname: ''},
  push(path: string) {
    this.location.pathname = path;
  },
};

jest.mock('../../browser-history', () => fakeHistory);

const middlewares = [redirect];
const mockStore = configureMockStore<State, AnyAction>(middlewares);
const store = mockStore();

describe('Middleware: redirect', () => {
  beforeEach(() => {
    fakeHistory.push('');
  });

  it(`should redirect to ${AppRoute.Room} `, () => {
    store.dispatch(redirectToRoute(AppRoute.Room));
    expect(fakeHistory.location.pathname).toBe(AppRoute.Room);
    expect(store.getActions()).toEqual([
      redirectToRoute(AppRoute.Room),
    ]);
  });

  it(`should not redirect to ${AppRoute.Room} because different action`, () => {
    store.dispatch({type: 'BAD_ACTION', payload: AppRoute.Room});
    expect(fakeHistory.location.pathname).not.toBe(AppRoute.Room);
  });
});
