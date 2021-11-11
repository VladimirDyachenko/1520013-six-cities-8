import { ThunkAction, ThunkDispatch } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { State } from './state';
import {
  setCity,
  setOffers,
  loadOffers,
  setAuthorizationStatus,
  setUserData,
  logOut,
  setPropertyComments,
  updateOffer,
  setOfferDetails,
  setNearByOffers
} from '../../store/action';

export enum ActionType {
  SetCity = 'city/setCity',
  SetOffers = 'offers/setOffers',
  UpdateOffer = 'offers/updateOne',
  SetNearBy = 'offers/setNearBy',
  SetOfferDetails = 'offers/setOfferDetails',
  LoadOffers = 'data/load',
  SetAuthorizationStatus = 'user/setAuthStatus',
  SetUserData = 'user/setUserData',
  LogOut = 'user/logOut',
  SetPropertyComments = 'property/comments',
}

export type Actions =
  | ReturnType<typeof setCity>
  | ReturnType<typeof setOffers>
  | ReturnType<typeof loadOffers>
  | ReturnType<typeof setAuthorizationStatus>
  | ReturnType<typeof setUserData>
  | ReturnType<typeof logOut>
  | ReturnType<typeof setPropertyComments>
  | ReturnType<typeof updateOffer>
  | ReturnType<typeof setOfferDetails>
  | ReturnType<typeof setNearByOffers>;

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Actions>;

export type ThunkAppDispatch = ThunkDispatch<State, AxiosInstance, Actions>;
