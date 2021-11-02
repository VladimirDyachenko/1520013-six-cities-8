import { Offer } from '../types/offer';
import { ActionType } from '../types/store/actions';
import { AuthorizationStatus } from '../utils/const';

export const setCity = (cityName: string) => ({
  type: ActionType.SetCity,
  payload: cityName,
} as const);

export const setOffers = (offers: Offer[]) => ({
  type: ActionType.SetOffers,
  payload: offers,
} as const);

export const loadOffers = (offers: Offer[]) => ({
  type: ActionType.LoadOffers,
  payload: {
    offers,
  },
} as const);

export const setAuthorizationStatus = (status: AuthorizationStatus) => ({
  type: ActionType.SetAuthorizationStatus,
  payload: status,
} as const);
