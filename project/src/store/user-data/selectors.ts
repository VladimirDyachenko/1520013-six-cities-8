import { PrivateAuthInfo } from '../../types/auth-info';
import { State } from '../../types/store/state';
import { AuthorizationStatus } from '../../utils/const';
import { NameSpace } from '../root-reducer';

export const getUserData = (state: State): PrivateAuthInfo | undefined => state[NameSpace.User].userData;

export const getAuthorizationStatus = (state: State): AuthorizationStatus => state[NameSpace.User].authorizationStatus;

export const getIsAuthorized = (state: State): boolean => state[NameSpace.User].authorizationStatus === AuthorizationStatus.Auth;
