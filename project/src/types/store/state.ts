import { AuthorizationStatus } from '../../utils/const';
import { PrivateAuthInfo } from '../auth-info';
import { Offer } from '../offer';

export type State = {
  cityName: string;
  offers: Offer[];
  isDataLoaded: boolean;
  authorizationStatus: AuthorizationStatus;
  userData?: PrivateAuthInfo;
}
