import { PrivateAuthInfo } from '../types/auth-info';
import { Comment } from '../types/comment';
import { Offer } from '../types/offer';
import { ActionType } from '../types/store/actions';
import { AppRoute, AuthorizationStatus } from '../utils/const';

export const setCity = (cityName: string) => ({
  type: ActionType.SetCity,
  payload: cityName,
} as const);

export const setOffers = (offers: Offer[]) => ({
  type: ActionType.SetOffers,
  payload: offers,
} as const);

export const updateOffer = (offer: Offer) => ({
  type: ActionType.UpdateOffer,
  payload: offer,
} as const);

export const setOfferDetails = (offer: Offer | undefined) => ({
  type: ActionType.SetOfferDetails,
  payload: offer,
} as const);

export const setNearByOffers = (offer: Offer[]) => ({
  type: ActionType.SetNearBy,
  payload: offer,
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

export const setUserData = (data: PrivateAuthInfo) => ({
  type: ActionType.SetUserData,
  payload: data,
} as const);

export const logOut = () => ({
  type: ActionType.LogOut,
} as const);

export const setPropertyComments = (comments: Comment[]) => ({
  type: ActionType.SetPropertyComments,
  payload: comments,
} as const);

export const redirectToRoute = (url: AppRoute) => ({
  type: ActionType.RedirectToRoute,
  payload: url,
} as const);

export const setFavoriteOffers = (offers: Offer[]) => ({
  type: ActionType.SetFavoriteOffers,
  payload: {
    offers,
  },
} as const);
