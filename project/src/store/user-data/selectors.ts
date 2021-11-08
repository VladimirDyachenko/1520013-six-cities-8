import { PrivateAuthInfo } from '../../types/auth-info';
import { State } from '../../types/store/state';
import { AuthorizationStatus } from '../../utils/const';
import { NameSpace } from '../root-reducer';

export const getUserData = (state: State): PrivateAuthInfo | undefined => state[NameSpace.user].userData;

export const getAuthorizationStatus = (state: State): AuthorizationStatus => state[NameSpace.user].authorizationStatus;

export const getIsAuthorized = (state: State): boolean => state[NameSpace.user].authorizationStatus === AuthorizationStatus.Auth;
