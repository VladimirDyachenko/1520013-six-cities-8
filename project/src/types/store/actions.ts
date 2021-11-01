import { ThunkAction, ThunkDispatch } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { setCity, setOffers, loadOffers } from '../../store/action';
import { State } from './state';

export enum ActionType {
  SetCity = 'city/setCity',
  SetOffers = 'offers/setOffers',
  LoadOffers = 'data/load',
}

export type Actions =
  | ReturnType<typeof setCity>
  | ReturnType<typeof setOffers>
  | ReturnType<typeof loadOffers>;

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Actions>;

export type ThunkAppDispatch = ThunkDispatch<State, AxiosInstance, Actions>;
