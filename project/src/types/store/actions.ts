import { ThunkAction, ThunkDispatch } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { setCity, setOffers, loadOffers, setAuthorizationStatus, setUserData, logOut } from '../../store/action';
import { State } from './state';

export enum ActionType {
  SetCity = 'city/setCity',
  SetOffers = 'offers/setOffers',
  LoadOffers = 'data/load',
  SetAuthorizationStatus = 'user/setAuthStatus',
  SetUserData = 'user/setUserData',
  LogOut = 'user/logOut',
}

export type Actions =
  | ReturnType<typeof setCity>
  | ReturnType<typeof setOffers>
  | ReturnType<typeof loadOffers>
  | ReturnType<typeof setAuthorizationStatus>
  | ReturnType<typeof setUserData>
  | ReturnType<typeof logOut>;

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Actions>;

export type ThunkAppDispatch = ThunkDispatch<State, AxiosInstance, Actions>;
