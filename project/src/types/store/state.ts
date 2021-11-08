import { RootState } from '../../store/root-reducer';
import { AuthorizationStatus } from '../../utils/const';
import { PrivateAuthInfo } from '../auth-info';
import { Comment } from '../comment';
import { Offer } from '../offer';

export type State = RootState

export type UserData = {
  authorizationStatus: AuthorizationStatus,
  userData: PrivateAuthInfo | undefined,
};

export type OffersData = {
  offers: Offer[];
  isDataLoaded: boolean,
};

export type OffersList = {
  cityName: string;
};

export type PropertyComments = {
  propertyComments: Comment[];
};
