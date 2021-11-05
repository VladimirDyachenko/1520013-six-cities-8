import { AuthorizationStatus } from '../../utils/const';
import { PrivateAuthInfo } from '../auth-info';
import { Comment } from '../comment';
import { Offer } from '../offer';

export type State = {
  cityName: string;
  offers: Offer[];
  isDataLoaded: boolean;
  authorizationStatus: AuthorizationStatus;
  userData?: PrivateAuthInfo;
  propertyComments: Comment[];
}
