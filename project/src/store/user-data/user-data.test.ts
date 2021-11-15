import { internet, datatype } from 'faker';
import { AuthorizationStatus } from '../../utils/const';
import { logOut, setAuthorizationStatus, setUserData } from '../action';
import { userData } from './user-data';

describe('Reducer: userData', () => {
  it('without additional parameters should return initial state', () => {
    expect(userData(void 0, { type: ('UNKNOWN_ACTION') }))
      .toEqual({authorizationStatus: AuthorizationStatus.Unknown, userData: undefined});
  });

  it('should set authorizationStatus', () => {
    const state = {
      authorizationStatus: AuthorizationStatus.Unknown,
      userData: undefined,
    };
    expect(userData(state, setAuthorizationStatus(AuthorizationStatus.Auth)))
      .toEqual({authorizationStatus: AuthorizationStatus.Auth, userData: undefined});
  });

  it('should set userData', () => {
    const state = {
      authorizationStatus: AuthorizationStatus.Unknown,
      userData: undefined,
    };
    const fakeUserData = {
      avatarUrl: internet.avatar(),
      id: datatype.number(),
      isPro: datatype.boolean(),
      name: internet.userName(),
      email: internet.email(),
      token: datatype.uuid(),
    };

    expect(userData(state, setUserData(fakeUserData)))
      .toEqual({authorizationStatus: AuthorizationStatus.Unknown, userData: fakeUserData});
  });

  it(`should reset userData and set authorizationStatus "${AuthorizationStatus.NoAuth}"`, () => {
    const fakeUserData = {
      avatarUrl: internet.avatar(),
      id: datatype.number(),
      isPro: datatype.boolean(),
      name: internet.userName(),
      email: internet.email(),
      token: datatype.uuid(),
    };
    const state = {
      authorizationStatus: AuthorizationStatus.Auth,
      userData: fakeUserData,
    };

    expect(userData(state, logOut()))
      .toEqual({authorizationStatus: AuthorizationStatus.NoAuth, userData: undefined});
  });
});
